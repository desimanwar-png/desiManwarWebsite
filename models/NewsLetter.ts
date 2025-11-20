import mongoose, { Schema, Document, model, models, Model } from 'mongoose';

// Interface for the Newsletter document
export interface INewsletter extends Document {
  email: string;
}

// Mongoose schema for the Newsletter
const newsletterSchema: Schema<INewsletter> = new Schema({
  email: {
    type: String,
    required: true,
  },
});

// Export the model, handling the case where the model might already be compiled
const Newsletter: Model<INewsletter> = models.Newsletter || model<INewsletter>('Newsletter', newsletterSchema);

export default Newsletter;
