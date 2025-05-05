'use server'

import Quotes from '@/models/Quotes'

export async function createQuote(formData) {
  const data = {
    fullName: formData.get('fullName'),
    companyName: formData.get('companyName'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    productsInterested: formData.get('productsInterested'),
    quantityRequired: formData.get('quantityRequired'),
    destinationCountry: formData.get('destinationCountry'),
    paymentTerms: formData.get('paymentTerms'),
    deliveryTimeline: formData.get('deliveryTimeline'),
    message: formData.get('message'),
  }

  try {
    const quote = new Quotes(data)
    await quote.save()

    return {
      status: 'success',
      message: 'Quote created successfully',
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to create quote. Please try again.',
    }
  }
}

export async function getQuotes() {
  try {
    const quotes = await Quotes.find().lean()
    const quotesJSON = JSON.parse(JSON.stringify(quotes))

    return {
      status: 'success',
      quotes: quotesJSON,
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to fetch quotes. Please try again.',
    }
  }
}

export async function deleteQuote(id) {
  try {
    await Quotes.findByIdAndDelete(id)

    return {
      status: 'success',
      message: 'Quote deleted successfully',
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to delete quote. Please try again.',
    }
  }
}
