import mongoose, { Schema, Document, model, models, Model } from 'mongoose';

// Interface for the Testimonial document
export interface ITestimonial extends Document {
  name: string;
  message: string;
  rating: number;
  profileImage?: string;
  isApproved: boolean;
  createdAt: Date;
}

// Mongoose schema for the Testimonial
const testimonialSchema: Schema<ITestimonial> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  },
  profileImage: {
    type: String,
    default: '',
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model, handling the case where the model might already be compiled
const Testimonial: Model<ITestimonial> = models.Testimonial || model<ITestimonial>('Testimonial', testimonialSchema);

export default Testimonial;
