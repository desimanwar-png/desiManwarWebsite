'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Star, Plus, Trash2, Loader2, Edit, MessageSquare } from 'lucide-react'
import {
  handleImageUpload,
  validateImageSize,
  validateImageType,
} from '@/lib/imageUtils'
import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTestimonialById,
} from './actions'

interface Testimonial {
  _id: string
  name: string
  message: string
  rating: number
  profileImage?: string
  isApproved: boolean
  createdAt: string
}

const initialFormData = {
  name: '',
  message: '',
  rating: 5,
  profileImage: '',
  isApproved: false,
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [testimonialToDelete, setTestimonialToDelete] =
    useState<Testimonial | null>(null)
  const [formData, setFormData] = useState<any>(initialFormData)

  const fetchTestimonials = async () => {
    setIsLoading(true)
    try {
      const result = await getAllTestimonials()
      if (result.success && result.testimonials) {
        setTestimonials(result.testimonials)
      } else {
        toast.error('Failed to load testimonials', {
          description: result.message,
        })
      }
    } catch (error) {
      toast.error('Failed to load testimonials', {
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const handleOpenSheet = (testimonial: Testimonial | null = null) => {
    if (testimonial) {
      setIsEditMode(true)
      setFormData(testimonial)
    } else {
      setIsEditMode(false)
      setFormData(initialFormData)
    }
    setIsSheetOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    const action = isEditMode ? updateTestimonial : createTestimonial
    const toastId = `${isEditMode ? 'update' : 'create'}-testimonial`
    const successMsg = `Testimonial ${
      isEditMode ? 'updated' : 'created'
    } successfully`

    try {
      toast.loading(`${isEditMode ? 'Updating' : 'Creating'} testimonial...`, {
        id: toastId,
      })
      let result;
      if (isEditMode) {
        result = await updateTestimonial(formData._id, formData);
      } else {
        result = await createTestimonial(formData);
      }
      if (result.success) {
        toast.success(successMsg, { id: toastId })
        setIsSheetOpen(false)
        await fetchTestimonials()
      } else {
        toast.error(`Failed to ${isEditMode ? 'update' : 'create'} testimonial`, {
          id: toastId,
          description: result.message,
        })
      }
    } catch (error) {
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} testimonial`, {
        id: toastId,
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDeleteClick = (testimonial: Testimonial) => {
    setTestimonialToDelete(testimonial)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!testimonialToDelete) return
    setIsProcessing(true)
    try {
      toast.loading('Deleting testimonial...', { id: 'delete-testimonial' })
      const result = await deleteTestimonial(testimonialToDelete._id)
      if (result.success) {
        toast.success('Testimonial deleted successfully', {
          id: 'delete-testimonial',
        })
        await fetchTestimonials()
      } else {
        toast.error('Failed to delete testimonial', {
          id: 'delete-testimonial',
          description: result.message,
        })
      }
    } catch (error) {
      toast.error('Failed to delete testimonial', {
        id: 'delete-testimonial',
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsProcessing(false)
      setDeleteDialogOpen(false)
      setTestimonialToDelete(null)
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
        setFormData({ ...formData, profileImage: base64Image })
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
          <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground">
            Manage customer feedback and testimonials.
          </p>
        </div>
        <Button onClick={() => handleOpenSheet()} className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-2xl w-full overflow-y-auto p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle>
              {isEditMode ? 'Edit Testimonial' : 'Add New Testimonial'}
            </SheetTitle>
            <SheetDescription>
              {isEditMode
                ? "Update the details of this testimonial."
                : "Add a new testimonial to display on your site."}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="px-6 py-4 space-y-6 flex-1">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
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
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                />
              </div>
              <div className="flex gap-6">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`cursor-pointer ${
                          formData.rating >= star
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                        onClick={() => setFormData({ ...formData, rating: star })}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2 flex items-center gap-2 pt-5">
                  <Switch
                    id="isApproved"
                    checked={formData.isApproved}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isApproved: checked })
                    }
                  />
                  <Label htmlFor="isApproved">Approved</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Profile Image</Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 relative rounded-full overflow-hidden border">
                    <Image
                      src={formData.profileImage || '/images/dummyImage.jpg'}
                      alt={formData.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Input
                    id="profileImage"
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                    disabled={isUploadingImage}
                  />
                  <Label htmlFor="profileImage" className="cursor-pointer text-sm text-primary hover:underline">
                    {isUploadingImage ? 'Uploading...' : 'Change Image'}
                  </Label>
                </div>
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
                  : 'Create Testimonial'}
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
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow
                  key={testimonial._id}
                  onClick={() => handleOpenSheet(testimonial)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell>
                    <div className="w-12 h-12 relative rounded-full overflow-hidden">
                      <Image
                        src={testimonial.profileImage || '/images/dummyImage.jpg'}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{testimonial.name}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        testimonial.isApproved ? 'default' : 'secondary'
                      }
                    >
                      {testimonial.isApproved ? 'Approved' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(testimonial.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation() // Prevent row click from triggering
                        handleDeleteClick(testimonial)
                      }}
                      className="text-destructive hover:text-destructive cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the testimonial from{' '}
              <strong>{testimonialToDelete?.name}</strong>? This cannot be
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