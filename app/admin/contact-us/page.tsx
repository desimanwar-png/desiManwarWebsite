'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
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
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2, Loader2, Mail } from 'lucide-react'
import {
  getAllContactSubmissions,
  createContactSubmission,
  updateContactSubmission,
  deleteContactSubmission,
} from './actions'

interface Submission {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
}

const initialFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export default function ContactUsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [submissionToDelete, setSubmissionToDelete] =
    useState<Submission | null>(null)
  const [formData, setFormData] = useState<any>(initialFormData)

  const fetchSubmissions = async () => {
    setIsLoading(true)
    try {
      const result = await getAllContactSubmissions()
      if (result.success && result.submissions) {
        setSubmissions(result.submissions)
      } else {
        toast.error('Failed to load submissions', {
          description: result.message,
        })
      }
    } catch (error) {
      toast.error('Failed to load submissions', {
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const handleOpenSheet = (submission: Submission | null = null) => {
    if (submission) {
      setIsEditMode(true)
      setFormData(submission)
    } else {
      setIsEditMode(false)
      setFormData(initialFormData)
    }
    setIsSheetOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    const action = isEditMode
      ? updateContactSubmission
      : createContactSubmission
    const toastId = `${isEditMode ? 'update' : 'create'}-submission`
    const successMsg = `Submission ${
      isEditMode ? 'updated' : 'created'
    } successfully`

    try {
      toast.loading(
        `${isEditMode ? 'Updating' : 'Creating'} submission...`,
        {
          id: toastId,
        }
      )
      let result;
      if (isEditMode) {
        result = await updateContactSubmission(formData._id, formData);
      } else {
        result = await createContactSubmission(formData);
      }
      if (result.success) {
        toast.success(successMsg, { id: toastId })
        setIsSheetOpen(false)
        await fetchSubmissions()
      } else {
        toast.error(
          `Failed to ${isEditMode ? 'update' : 'create'} submission`,
          {
            id: toastId,
            description: result.message,
          }
        )
      }
    } catch (error) {
      toast.error(
        `Failed to ${isEditMode ? 'update' : 'create'} submission`,
        {
          id: toastId,
          description: 'An unexpected error occurred',
        }
      )
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDeleteClick = (submission: Submission) => {
    setSubmissionToDelete(submission)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!submissionToDelete) return
    setIsProcessing(true)
    try {
      toast.loading('Deleting submission...', { id: 'delete-submission' })
      const result = await deleteContactSubmission(submissionToDelete._id)
      if (result.success) {
        toast.success('Submission deleted successfully', {
          id: 'delete-submission',
        })
        await fetchSubmissions()
      } else {
        toast.error('Failed to delete submission', {
          id: 'delete-submission',
          description: result.message,
        })
      }
    } catch (error) {
      toast.error('Failed to delete submission', {
        id: 'delete-submission',
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsProcessing(false)
      setDeleteDialogOpen(false)
      setSubmissionToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-muted-foreground">
            Manage messages from the contact form.
          </p>
        </div>
        <Button onClick={() => handleOpenSheet()} className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Add Entry
        </Button>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-lg w-full overflow-y-auto p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle>
              {isEditMode ? 'Submission Details' : 'Add New Entry'}
            </SheetTitle>
            <SheetDescription>
              {isEditMode
                ? `Details for message from ${formData.name}.`
                : "Manually add a new contact form entry."}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="px-6 py-4 space-y-4 flex-1">
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
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
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
                  : 'Create Entry'}
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow
                  key={submission._id}
                  onClick={() => handleOpenSheet(submission)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="font-medium">{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.subject}</TableCell>
                  <TableCell>
                    {new Date(submission.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteClick(submission)
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
            <AlertDialogTitle>Delete Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the message from{' '}
              <strong>{submissionToDelete?.name}</strong>? This cannot be
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