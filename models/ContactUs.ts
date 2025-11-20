import mongoose, { Schema, Document, model, models, Model } from 'mongoose';

// Interface for the ContactUs document
export interface IContactUs extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: Date;
}

// Mongoose schema for the ContactUs
const contactUsSchema: Schema<IContactUs> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Export the model, handling the case where the model might already be compiled
const ContactUs: Model<IContactUs> = models.ContactUs || model<IContactUs>('ContactUs', contactUsSchema);

export default ContactUs;
