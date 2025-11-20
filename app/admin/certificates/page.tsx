'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Plus, Trash2, Loader2, Edit, Award } from 'lucide-react'
import {
  handleImageUpload,
  validateImageSize,
  validateImageType,
} from '@/lib/imageUtils'
import {
  getAllCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from './actions'

interface Certificate {
  _id: string
  name: string
  issuedBy: string
  image: string
}

const initialFormData = {
  name: '',
  issuedBy: '',
  image: '',
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [certificateToDelete, setCertificateToDelete] =
    useState<Certificate | null>(null)
  const [formData, setFormData] = useState<any>(initialFormData)

  const fetchCertificates = async () => {
    setIsLoading(true)
    try {
      const result = await getAllCertificates()
      if (result.success && result.certificates) {
        setCertificates(result.certificates)
      } else {
        toast.error('Failed to load certificates', {
          description: result.message,
        })
      }
    } catch (error) {
      toast.error('Failed to load certificates', {
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCertificates()
  }, [])

  const handleOpenSheet = (certificate: Certificate | null = null) => {
    if (certificate) {
      setIsEditMode(true)
      setFormData(certificate)
    } else {
      setIsEditMode(false)
      setFormData(initialFormData)
    }
    setIsSheetOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.image) {
      toast.error('Name and Image are required.')
      return
    }

    setIsProcessing(true)
    const action = isEditMode ? updateCertificate : createCertificate
    const toastId = `${isEditMode ? 'update' : 'create'}-certificate`
    const successMsg = `Certificate ${
      isEditMode ? 'updated' : 'created'
    } successfully`

    try {
      toast.loading(`${isEditMode ? 'Updating' : 'Creating'} certificate...`, {
        id: toastId,
      })
      const result = isEditMode
        ? await action(formData._id, formData)
        : await action(formData)
      if (result.success) {
        toast.success(successMsg, { id: toastId })
        setIsSheetOpen(false)
        await fetchCertificates()
      } else {
        toast.error(`Failed to ${isEditMode ? 'update' : 'create'} certificate`, {
          id: toastId,
          description: result.message,
        })
      }
    } catch (error) {
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} certificate`, {
        id: toastId,
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDeleteClick = (certificate: Certificate) => {
    setCertificateToDelete(certificate)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!certificateToDelete) return
    setIsProcessing(true)
    try {
      toast.loading('Deleting certificate...', { id: 'delete-certificate' })
      const result = await deleteCertificate(certificateToDelete._id)
      if (result.success) {
        toast.success('Certificate deleted successfully', {
          id: 'delete-certificate',
        })
        await fetchCertificates()
      } else {
        toast.error('Failed to delete certificate', {
          id: 'delete-certificate',
          description: result.message,
        })
      }
    } catch (error) {
      toast.error('Failed to delete certificate', {
        id: 'delete-certificate',
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsProcessing(false)
      setDeleteDialogOpen(false)
      setCertificateToDelete(null)
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (!validateImageType(file) || !validateImageSize(file, 2)) {
        toast.error('Invalid image file', {
          description: 'Please select an image under 2MB.',
        })
        return
      }
      setIsUploadingImage(true)
      toast.loading('Uploading image...', { id: 'image-upload' })
      try {
        const base64Image = await handleImageUpload(file)
        setFormData({ ...formData, image: base64Image })
        toast.success('Image uploaded successfully', { id: 'image-upload' })
      } catch (error) {
        toast.error('Failed to upload image', { id: 'image-upload' })
      } finally {
        setIsUploadingImage(false)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
          <p className="text-muted-foreground">
            Manage your company's certificates.
          </p>
        </div>
        <Button onClick={() => handleOpenSheet()} className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Add Certificate
        </Button>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-lg w-full p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle>
              {isEditMode ? 'Edit Certificate' : 'Add New Certificate'}
            </SheetTitle>
            <SheetDescription>
              {isEditMode
                ? "Update the certificate details."
                : "Upload a new certificate."}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="px-6 py-4 space-y-6 flex-1">
              <div className="space-y-2">
                <Label>Certificate Image</Label>
                <div className="p-4 border-2 border-dashed rounded-md">
                  {formData.image ? (
                    <div className="relative aspect-video">
                      <Image
                        src={formData.image}
                        alt={formData.name || 'Certificate'}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-10">
                      Please upload an image.
                    </div>
                  )}
                </div>
                <Input
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                  disabled={isUploadingImage}
                />
                <Label
                  htmlFor="image"
                  className="cursor-pointer text-sm text-primary hover:underline"
                >
                  {isUploadingImage
                    ? 'Uploading...'
                    : formData.image
                    ? 'Change Image'
                    : 'Upload Image'}
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Certificate Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issuedBy">Issued By</Label>
                <Input
                  id="issuedBy"
                  value={formData.issuedBy}
                  onChange={(e) =>
                    setFormData({ ...formData, issuedBy: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSheetOpen(false)}
                disabled={isProcessing}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isProcessing} className="cursor-pointer">
                {isProcessing
                  ? 'Saving...'
                  : isEditMode
                  ? 'Save Changes'
                  : 'Create Certificate'}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {certificates.map((cert) => (
            <Card key={cert._id}>
              <CardHeader>
                <CardTitle className="truncate">{cert.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-[4/3] w-full bg-muted rounded-md overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Issued by: {cert.issuedBy || 'N/A'}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenSheet(cert)}
                  className="cursor-pointer"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteClick(cert)}
                  className="text-destructive hover:text-destructive cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Certificate</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the certificate{' '}
              <strong>{certificateToDelete?.name}</strong>? This cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing} className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isProcessing}
              className="bg-destructive hover:bg-destructive/90 cursor-pointer"
            >
              {isProcessing ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}