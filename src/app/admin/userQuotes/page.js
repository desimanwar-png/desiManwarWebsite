'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getQuotes } from './actions'
import { useEffect, useState } from 'react'
import QuoteDetailsModal from './QuoteDetailModal'

function UserQuotes() {
  const [quotes, setQuotes] = useState([])
  const [selectedQuote, setSelectedQuote] = useState(null)

  useEffect(() => {
    async function fetchQuotes() {
      const res = await getQuotes()
      if (res.status === 'success') {
        setQuotes(res.quotes)
      } else {
        console.error(res.message)
      }
    }

    fetchQuotes()
  }, [])

  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">User Quotes</div>
        <div>---</div>
      </div>
      <div>
        <Table>
          <TableCaption>Create or Modify Products</TableCaption>
          <TableHeader className="border-2">
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contacted At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow
                key={quote._id}
                onClick={() => setSelectedQuote(quote)}
                className="cursor-pointer hover:bg-secondary-dark/10"
              >
                <TableHead>{quote.fullName}</TableHead>
                <TableHead>{quote.email}</TableHead>
                <TableHead>
                  {new Date(quote.createdAt).toLocaleString()}
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedQuote && (
        <QuoteDetailsModal
          quote={selectedQuote}
          onClose={() => setSelectedQuote(null)}
        />
      )}
    </div>
  )
}

export default UserQuotes
