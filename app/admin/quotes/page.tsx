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
import { Plus, Trash2, Loader2, Edit, FileText } from 'lucide-react'
import {
  getAllQuotes,
  createQuote,
  updateQuote,
  deleteQuote,
} from './actions'

interface Quote {
  _id: string
  fullName?: string
  companyName?: string
  email?: string
  phoneNumber?: string
  createdAt: string
}

const initialFormData = {
  fullName: '',
  companyName: '',
  email: '',
  phoneNumber: '',
  productsInterested: '',
  quantityRequired: '',
  destinationCountry: '',
  paymentTerms: '',
  shippingTerms: '',
  deliveryTimeline: '',
  message: '',
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [quoteToDelete, setQuoteToDelete] = useState<Quote | null>(null)
  const [formData, setFormData] = useState<any>(initialFormData)

  const fetchQuotes = async () => {
    setIsLoading(true)
    try {
      const result = await getAllQuotes()
      if (result.success && result.quotes) {
        setQuotes(result.quotes)
      } else {
        toast.error('Failed to load quotes', {
          description: result.message,
        })
      }
    } catch (error) {
      toast.error('Failed to load quotes', {
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  const handleOpenSheet = (quote: Quote | null = null) => {
    if (quote) {
      setIsEditMode(true)
      setFormData(quote)
    } else {
      setIsEditMode(false)
      setFormData(initialFormData)
    }
    setIsSheetOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    const action = isEditMode ? updateQuote : createQuote
    const toastId = `${isEditMode ? 'update' : 'create'}-quote`
    const successMsg = `Quote ${
      isEditMode ? 'updated' : 'created'
    } successfully`

    try {
      toast.loading(`${isEditMode ? 'Updating' : 'Creating'} quote...`, {
        id: toastId,
      })
      const result = isEditMode
        ? await action(formData._id, formData)
        : await action(formData)
      if (result.success) {
        toast.success(successMsg, { id: toastId })
        setIsSheetOpen(false)
        await fetchQuotes()
      } else {
        toast.error(`Failed to ${isEditMode ? 'update' : 'create'} quote`, {
          id: toastId,
          description: result.message,
        })
      }
    } catch (error) {
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} quote`, {
        id: toastId,
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDeleteClick = (quote: Quote) => {
    setQuoteToDelete(quote)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!quoteToDelete) return
    setIsProcessing(true)
    try {
      toast.loading('Deleting quote...', { id: 'delete-quote' })
      const result = await deleteQuote(quoteToDelete._id)
      if (result.success) {
        toast.success('Quote deleted successfully', {
          id: 'delete-quote',
        })
        await fetchQuotes()
      } else {
        toast.error('Failed to delete quote', {
          id: 'delete-quote',
          description: result.message,
        })
      }
    } catch (error) {
      toast.error('Failed to delete quote', {
        id: 'delete-quote',
        description: 'An unexpected error occurred',
      })
    } finally {
      setIsProcessing(false)
      setDeleteDialogOpen(false)
      setQuoteToDelete(null)
    }
  }

  const renderDetail = (label: string, value?: string) => (
    <div className="py-2">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <p className="text-base">{value || '-'}</p>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotes</h1>
          <p className="text-muted-foreground">
            Manage quote requests from customers.
          </p>
        </div>
        <Button onClick={() => handleOpenSheet()} className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Add Quote
        </Button>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-2xl w-full overflow-y-auto p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle>
              {isEditMode ? 'Quote Details' : 'Add New Quote'}
            </SheetTitle>
            <SheetDescription>
              {isEditMode
                ? `Details for quote from ${formData.fullName}.`
                : "Manually add a new quote."}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="px-6 py-4 space-y-4 flex-1">
              {Object.keys(initialFormData).map((key) => {
                const fieldLabel = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                const isTextArea = ['productsInterested', 'message'].includes(key);
                return (
                  <div className="space-y-2" key={key}>
                    <Label htmlFor={key}>{fieldLabel}</Label>
                    {isTextArea ? (
                      <Textarea
                        id={key}
                        value={formData[key] || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        rows={3}
                      />
                    ) : (
                      <Input
                        id={key}
                        value={formData[key] || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                      />
                    )}
                  </div>
                )
              })}
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
                  : 'Create Quote'}
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
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow
                  key={quote._id}
                  onClick={() => handleOpenSheet(quote)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="font-medium">{quote.fullName}</TableCell>
                  <TableCell>{quote.companyName}</TableCell>
                  <TableCell>{quote.email}</TableCell>
                  <TableCell>{quote.phoneNumber}</TableCell>
                  <TableCell>
                    {new Date(quote.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteClick(quote)
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
            <AlertDialogTitle>Delete Quote</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the quote from{' '}
              <strong>{quoteToDelete?.fullName}</strong>? This cannot be
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