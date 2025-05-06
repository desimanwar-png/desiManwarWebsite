'use client'

import { toast } from '@/hooks/use-toast'
import React from 'react'
import { deleteQuote } from './actions'

function QuoteDetailsModal({ quote, onClose }) {
  const handleDelete = async () => {
    const con = confirm('Are you sure you want to delete this quote?')
    if (!con) return

    const result = await deleteQuote(quote._id)

    if (result.status === 'success') {
      toast({
        title: 'Success',
        description: result.message,
      })
      onClose()
    } else {
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      })
    }
  }

  if (!quote) return null

  return (
    <div className="fixed inset-0 bg-secondary-dark/60 flex items-center justify-center z-50">
      <div className="bg-primary-base text-secondary-dark dark:text-primary-base dark:bg-secondary-dark border-2 border-accent-base max-w-2xl w-full p-6 rounded-xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Quote Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="bg-muted p-3 rounded-md">
            <div className="text-muted-foreground font-semibold">Full Name</div>
            <div>{quote.fullName || 'Empty'}</div>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <div className="text-muted-foreground font-semibold">
              Company Name
            </div>
            <div>{quote.companyName || 'Empty'}</div>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <div className="text-muted-foreground font-semibold">Email</div>
            <div>{quote.email || 'Empty'}</div>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <div className="text-muted-foreground font-semibold">Phone</div>
            <div>{quote.phoneNumber || 'Empty'}</div>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <div className="text-muted-foreground font-semibold">
              Products Interested
            </div>
            <div>{quote.productsInterested || 'Empty'}</div>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <div className="text-muted-foreground font-semibold">
              Quantity Required
            </div>
            <div>{quote.quantityRequired || 'Empty'}</div>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <div className="text-muted-foreground font-semibold">
              Destination Country
            </div>
            <div>{quote.destinationCountry || 'Empty'}</div>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <div className="text-muted-foreground font-semibold">
              Payment Terms
            </div>
            <div>{quote.paymentTerms || 'Empty'}</div>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <div className="text-muted-foreground font-semibold">
              Shipping Terms
            </div>
            <div>{quote.shippingTerms || 'Empty'}</div>
          </div>
          <div className="bg-muted p-3 rounded-md">
            <div className="text-muted-foreground font-semibold">
              Delivery Timeline
            </div>
            <div>{quote.deliveryTimeline || 'Empty'}</div>
          </div>
          <div className="bg-muted p-3 rounded-md sm:col-span-2">
            <div className="text-muted-foreground font-semibold">Message</div>
            <div>{quote.message || 'Empty'}</div>
          </div>
          <div className="bg-muted p-3 rounded-md sm:col-span-2">
            <div className="text-muted-foreground font-semibold">
              Submitted At
            </div>
            <div>
              {quote.createdAt
                ? new Date(quote.createdAt).toLocaleString()
                : 'Empty'}
            </div>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={handleDelete}
            className="text-sm bg-red-500 text-secondary-dark font-medium px-4 py-2 rounded hover:bg-red-600/90 mx-4"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="text-sm bg-accent-base text-secondary-dark font-medium px-4 py-2 rounded hover:bg-accent-base/80"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuoteDetailsModal
