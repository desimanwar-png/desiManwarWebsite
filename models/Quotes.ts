import mongoose, { Schema, Document, model, models, Model } from 'mongoose';

// Interface for the Quote document
export interface IQuote extends Document {
  fullName?: string;
  companyName?: string;
  email?: string;
  phoneNumber?: string;
  productsInterested?: string;
  quantityRequired?: string;
  destinationCountry?: string;
  paymentTerms?: string;
  shippingTerms?: string;
  deliveryTimeline?: string;
  message?: string;
  createdAt: Date;
}

// Mongoose schema for the Quote
const quoteSchema: Schema<IQuote> = new Schema({
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
  shippingTerms: {
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
});

// To prevent model recompilation error
if (models['Quote']) {
    delete models['Quote'];
}

// Export the model, handling the case where the model might already be compiled
const Quote: Model<IQuote> = models.Quote || model<IQuote>('Quote', quoteSchema);

export default Quote;
