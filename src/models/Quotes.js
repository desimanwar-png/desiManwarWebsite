import mongoose from 'mongoose'

const quoteSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  companyName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  productsInterested: {
    type: String,
  },
  quantityRequired: {
    type: String,
  },
  destinationCountry: {
    type: String,
  },
  paymentTerms: {
    type: String,
  },
  deliveryTimeline: {
    type: String,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Quote || mongoose.model('Quote', quoteSchema)
