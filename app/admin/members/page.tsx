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
import { Switch } from '@/components/ui/switch'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Plus,
  Trash2,
  Loader2,
  Edit,
  UserCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from 'lucide-react'
import {
  handleImageUpload,
  validateImageSize,
  validateImageType,
} from '@/lib/imageUtils'
import {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
  getMemberById,
} from './actions'

interface Member {
  _id: string
  name: string
  email: string
  phone: string
  image?: string
  joiningDate: string
  designation?: string
  fbURL?: string
  instaURL?: string
  twitterURL?: string
  linkedinURL?: string
  isActive: boolean
  priority: number
}

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  image: '',
  joiningDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
  designation: '',
  fbURL: '',
  instaURL: '',
  twitterURL: '',
  linkedinURL: '',
  isActive: true,
  priority: 1000,
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null)
  const [formData, setFormData] = useState<any>(initialFormData)

  const fetchMembers = async () => {
    setIsLoading(true)
    try {
      const result = await getAllMembers()
      if (result.success && result.members) {
        setMembers(result.members)
      } else {
        toast.error('Failed to load members', {
          description: result.message,
        })
      }
    } catch (error) {
      toast.error('Failed to load members', {
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleOpenSheet = async (member: Member | null = null) => {
    if (member) {
      setIsEditMode(true)
      // Fetch full member details for editing
      toast.loading('Loading member details...', { id: 'load-member' })
      try {
        const result = await getMemberById(member._id)
        if (result.success && result.member) {
          setFormData({
            ...result.member,
            joiningDate: new Date(result.member.joiningDate)
              .toISOString()
              .split('T')[0],
          })
          toast.success('Member details loaded', { id: 'load-member' })
        } else {
          toast.error('Failed to load member details', {
            id: 'load-member',
            description: result.message,
          })
          return
        }
      } catch (error) {
        toast.error('Failed to load member details', {
          id: 'load-member',
          description: 'An unexpected error occurred',
        })
        return
      }
    } else {
      setIsEditMode(false)
      setFormData(initialFormData)
    }
    setIsSheetOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Name, Email and Phone are required.')
      return
    }

    setIsProcessing(true)
    const action = isEditMode ? updateMember : createMember
    const toastId = `${isEditMode ? 'update' : 'create'}-member`
    const successMsg = `Member ${
      isEditMode ? 'updated' : 'created'
    } successfully`

    try {
      toast.loading(`${isEditMode ? 'Updating' : 'Creating'} member...`, {
        id: toastId,
      })

      const dataToSubmit = {
        ...formData,
        joiningDate: new Date(formData.joiningDate), // Convert to Date object
      }

      const result = isEditMode
        ? await action(formData._id, dataToSubmit)
        : await action(dataToSubmit)
      if (result.success) {
        toast.success(successMsg, { id: toastId })
        setIsSheetOpen(false)
        await fetchMembers()
      } else {
        toast.error(`Failed to ${isEditMode ? 'update' : 'create'} member`, {
          id: toastId,
          description: result.message,
        })
      }
    } catch (error) {
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} member`, {
        id: toastId,
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDeleteClick = (member: Member) => {
    setMemberToDelete(member)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!memberToDelete) return
    setIsProcessing(true)
    try {
      toast.loading('Deleting member...', { id: 'delete-member' })
      const result = await deleteMember(memberToDelete._id)
      if (result.success) {
        toast.success('Member deleted successfully', {
          id: 'delete-member',
        })
        await fetchMembers()
      } else {
        toast.error('Failed to delete member', {
          id: 'delete-member',
          description: result.message,
        })
      }
    } catch (error) {
      toast.error('Failed to delete member', {
        id: 'delete-member',
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsProcessing(false)
      setDeleteDialogOpen(false)
      setMemberToDelete(null)
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
          <h1 className="text-3xl font-bold tracking-tight">Members</h1>
          <p className="text-muted-foreground">Manage your team members.</p>
        </div>
        <Button onClick={() => handleOpenSheet()} className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-2xl w-full overflow-y-auto p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle>
              {isEditMode ? 'Edit Member' : 'Add New Member'}
            </SheetTitle>
            <SheetDescription>
              {isEditMode
                ? "Update the member's details."
                : "Add a new team member."}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="flex-1 px-6 py-4">
              <Tabs defaultValue="general">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="social">Social Media</TabsTrigger>
                  <TabsTrigger value="imageStatus">Image & Status</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="space-y-4 pt-4">
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
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) =>
                        setFormData({ ...formData, designation: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Input
                      id="priority"
                      type="number"
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({ ...formData, priority: parseInt(e.target.value) })
                      }
                    />
                  </div>
                </TabsContent>
                <TabsContent value="social" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="fbURL">Facebook URL</Label>
                    <Input
                      id="fbURL"
                      value={formData.fbURL}
                      onChange={(e) =>
                        setFormData({ ...formData, fbURL: e.target.value })
                      }
                      icon={<Facebook className="w-4 h-4 text-muted-foreground" />}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instaURL">Instagram URL</Label>
                    <Input
                      id="instaURL"
                      value={formData.instaURL}
                      onChange={(e) =>
                        setFormData({ ...formData, instaURL: e.target.value })
                      }
                      icon={<Instagram className="w-4 h-4 text-muted-foreground" />}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitterURL">Twitter URL</Label>
                    <Input
                      id="twitterURL"
                      value={formData.twitterURL}
                      onChange={(e) =>
                        setFormData({ ...formData, twitterURL: e.target.value })
                      }
                      icon={<Twitter className="w-4 h-4 text-muted-foreground" />}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedinURL">LinkedIn URL</Label>
                    <Input
                      id="linkedinURL"
                      value={formData.linkedinURL}
                      onChange={(e) =>
                        setFormData({ ...formData, linkedinURL: e.target.value })
                      }
                      icon={<Linkedin className="w-4 h-4 text-muted-foreground" />}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="imageStatus" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Profile Image</Label>
                    <div className="p-4 border-2 border-dashed rounded-md">
                      {formData.image ? (
                        <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto">
                          <Image
                            src={formData.image}
                            alt={formData.name || 'Member'}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground py-10">
                          No Image Uploaded
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
                    <Label htmlFor="joiningDate">Joining Date</Label>
                    <Input
                      id="joiningDate"
                      type="date"
                      value={formData.joiningDate}
                      onChange={(e) =>
                        setFormData({ ...formData, joiningDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-4">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isActive: checked })
                      }
                    />
                    <Label htmlFor="isActive">Active Member</Label>
                  </div>
                </TabsContent>
              </Tabs>
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
                  : 'Add Member'}
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
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow
                  key={member._id}
                  onClick={() => handleOpenSheet(member)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell>
                    <div className="w-12 h-12 relative rounded-full overflow-hidden">
                      <Image
                        src={member.image || '/images/member-image.jpg'}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{member.designation || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant={member.isActive ? 'default' : 'secondary'}>
                      {member.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.priority}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteClick(member)
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
            <AlertDialogTitle>Delete Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete member{' '}
              <strong>{memberToDelete?.name}</strong>? This cannot be undone.
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