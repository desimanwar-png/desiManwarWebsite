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
import { Plus, Trash2, Loader2, Mail, Download } from 'lucide-react'
import * as XLSX from 'xlsx'
import {
  getAllSubscribers,
  createSubscriber,
  deleteSubscriber,
} from './actions'

interface Subscriber {
  _id: string
  email: string
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [subscriberToDelete, setSubscriberToDelete] =
    useState<Subscriber | null>(null)
  const [newEmail, setNewEmail] = useState('')

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(subscribers)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Subscribers')
    XLSX.writeFile(workbook, 'newsletter_subscribers.xlsx')
  }

  const fetchSubscribers = async () => {
    setIsLoading(true)
    try {
      const result = await getAllSubscribers()
      if (result.success && result.subscribers) {
        setSubscribers(result.subscribers)
      } else {
        toast.error('Failed to load subscribers', {
          description: result.message,
        })
      }
    } catch (error) {
      toast.error('Failed to load subscribers', {
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    try {
      toast.loading('Adding subscriber...', { id: 'create-subscriber' })
      const result = await createSubscriber(newEmail)
      if (result.success) {
        toast.success('Subscriber added successfully', {
          id: 'create-subscriber',
        })
        setIsSheetOpen(false)
        setNewEmail('')
        await fetchSubscribers()
      } else {
        toast.error('Failed to add subscriber', {
          id: 'create-subscriber',
          description: result.message,
        })
      }
    } catch (error) {
      toast.error('Failed to add subscriber', {
        id: 'create-subscriber',
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDeleteClick = (subscriber: Subscriber) => {
    setSubscriberToDelete(subscriber)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!subscriberToDelete) return
    setIsProcessing(true)
    try {
      toast.loading('Deleting subscriber...', { id: 'delete-subscriber' })
      const result = await deleteSubscriber(subscriberToDelete._id)
      if (result.success) {
        toast.success('Subscriber deleted successfully', {
          id: 'delete-subscriber',
        })
        await fetchSubscribers()
      } else {
        toast.error('Failed to delete subscriber', {
          id: 'delete-subscriber',
          description: result.message,
        })
      }
    } catch (error) {
      toast.error('Failed to delete subscriber', {
        id: 'delete-subscriber',
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsProcessing(false)
      setDeleteDialogOpen(false)
      setSubscriberToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Newsletter</h1>
          <p className="text-muted-foreground">
            Manage your newsletter subscribers.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={handleDownloadExcel}
            variant="outline"
            className="cursor-pointer"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Excel
          </Button>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button className="cursor-pointer">
                <Plus className="mr-2 h-4 w-4" />
                Add Subscriber
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md w-full p-0">
              <SheetHeader className="p-6 border-b">
                <SheetTitle>Add New Subscriber</SheetTitle>
                <SheetDescription>
                  Manually add a new email to your newsletter list.
                </SheetDescription>
              </SheetHeader>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsSheetOpen(false)}
                    disabled={isProcessing}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="cursor-pointer"
                  >
                    {isProcessing ? 'Adding...' : 'Add Subscriber'}
                  </Button>
                </div>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((subscriber) => (
                <TableRow key={subscriber._id}>
                  <TableCell className="font-medium">
                    {subscriber.email}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(subscriber)}
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
            <AlertDialogTitle>Delete Subscriber</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{' '}
              <strong>{subscriberToDelete?.email}</strong>? This cannot be
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