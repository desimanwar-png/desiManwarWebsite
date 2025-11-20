import mongoose, { Schema, Document, model, models, Model } from 'mongoose';

// Interface for the Specification sub-document
export interface ISpecification {
    title: string;
    value: string;
}

// Interface for the Price sub-document
export interface IPrice {
    amount: string;
    currency: string;
}

// Interface for the Visibility sub-document
export interface IVisibility {
    priceVisibility: boolean;
    specificationVisibility: boolean;
    descriptionVisibility: boolean;
    productVisibility: boolean;
}

// Interface for the Product document
export interface IProduct extends Document {
  name: string;
  description: string;
  specification: ISpecification[];
  image: string;
  category: string;
  pricePerKg: IPrice;
  visibility: IVisibility;
  slug: string;
  onePagerURL?: string;
  coaReportURL?: string;
  isFSSAICertified: boolean;
  priority: number;
  createdAt: Date;
}

// Mongoose schema for the Product
const productSchema: Schema<IProduct> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specification: [
    {
      title: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
  image: {
    type: String,
    default: '',
  },
  category: {
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
  onePagerURL: {
    type: String,
    default: '',
  },
  coaReportURL: {
    type: String,
    default: '',
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
});

// Export the model, handling the case where the model might already be compiled
const Product: Model<IProduct> = models.Product || model<IProduct>('Product', productSchema);

export default Product;
