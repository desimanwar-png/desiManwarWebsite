import mongoose, { Schema, Document, model, models, Model } from 'mongoose';

// Interface for the Certificate document
export interface ICertificate extends Document {
  name: string;
  issuedBy: string;
  image: string;
  createdAt: Date;
}

// Mongoose schema for the Certificate
const certificateSchema: Schema<ICertificate> = new Schema({
  name: {
    type: String,
    required: true,
  },
  issuedBy: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// To prevent model recompilation error
if (models['Certificate']) {
    delete models['Certificate'];
}

// Export the model, handling the case where the model might already be compiled
const Certificate: Model<ICertificate> = models.Certificate || model<ICertificate>('Certificate', certificateSchema);

export default Certificate;
