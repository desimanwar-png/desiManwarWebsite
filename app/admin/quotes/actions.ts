'use server'

import { revalidatePath } from 'next/cache'
import dbConnect from '@/lib/dbConnect'
import Quote, { IQuote } from '@/models/Quotes'

export async function getAllQuotes(): Promise<{
  success: boolean
  quotes?: any[]
  message?: string
}> {
  try {
    await dbConnect()
    const quotes = await Quote.find({}).sort({ createdAt: -1 }).lean()
    return {
      success: true,
      quotes: JSON.parse(JSON.stringify(quotes)),
    }
  } catch (error) {
    console.error('Get all quotes error:', error)
    return {
      success: false,
      message: 'Failed to fetch quotes',
    }
  }
}

export async function getQuoteById(quoteId: string): Promise<{
  success: boolean
  quote?: any
  message?: string
}> {
  try {
    await dbConnect()
    const quote = await Quote.findById(quoteId).lean()
    if (!quote) {
      return { success: false, message: 'Quote not found' }
    }
    return {
      success: true,
      quote: JSON.parse(JSON.stringify(quote)),
    }
  } catch (error) {
    console.error('Get quote by id error:', error)
    return { success: false, message: 'Failed to fetch quote' }
  }
}

export async function createQuote(
  data: Partial<IQuote>
): Promise<{
  success: boolean
  message: string
  quote?: any
}> {
  try {
    await dbConnect()
    const newQuote = await Quote.create(data)
    revalidatePath('/admin/quotes')
    return {
      success: true,
      message: 'Quote created successfully',
      quote: JSON.parse(JSON.stringify(newQuote)),
    }
  } catch (error: any) {
    console.error('Create quote error:', error)
    return {
      success: false,
      message: error.message || 'An error occurred while creating the quote',
    }
  }
}

export async function updateQuote(
  quoteId: string,
  data: Partial<IQuote>
): Promise<{
  success: boolean
  message: string
  quote?: any
}> {
  try {
    await dbConnect()
    delete data._id
    delete data.createdAt

    const updatedQuote = await Quote.findByIdAndUpdate(
      quoteId,
      { $set: data },
      { new: true, runValidators: true }
    ).lean()

    if (!updatedQuote) {
      return {
        success: false,
        message: 'Failed to update quote',
      }
    }
    revalidatePath('/admin/quotes')
    return {
      success: true,
      message: 'Quote updated successfully',
      quote: JSON.parse(JSON.stringify(updatedQuote)),
    }
  } catch (error: any) {
    console.error('Update quote error:', error)
    return {
      success: false,
      message: error.message || 'An error occurred while updating the quote',
    }
  }
}

export async function deleteQuote(quoteId: string): Promise<{
  success: boolean
  message: string
}> {
  try {
    await dbConnect()
    const deletedQuote = await Quote.findByIdAndDelete(quoteId)
    if (!deletedQuote) {
      return {
        success: false,
        message: 'Quote not found',
      }
    }
    revalidatePath('/admin/quotes')
    return {
      success: true,
      message: 'Quote deleted successfully',
    }
  } catch (error: any) {
    console.error('Delete quote error:', error)
    return {
      success: false,
      message: error.message || 'An error occurred while deleting the quote',
    }
  }
}
