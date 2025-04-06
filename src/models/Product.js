import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specification: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  pricePerKg: {
    amount: {
      type: String,
      default: '',
    },
    currency: {
      type: String,
      default: 'USD',
    },
  },
  visibility: {
    priceVisibility: { type: Boolean, default: false },
    specificationVisibility: { type: Boolean, default: true },
    descriptionVisibility: { type: Boolean, default: true },
    productVisibility: { type: Boolean, default: true },
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  isFSSAICertified: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    default: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Product ||
  mongoose.model('Product', productSchema)
