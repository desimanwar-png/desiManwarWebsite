'use server'

import { revalidatePath } from 'next/cache'
import dbConnect from '@/lib/dbConnect'
import Product, { IProduct } from '@/models/Product'

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}


export async function getAllProducts(): Promise<{
  success: boolean
  products?: any[]
  message?: string
}> {
  try {
    await dbConnect()

    const products = await Product.find({})
      .sort({ priority: 1, createdAt: -1 })
      .lean()

    return {
      success: true,
      products: products.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        category: product.category,
        priority: product.priority,
        productVisibility: product.visibility.productVisibility,
        image: product.image,
        createdAt: product.createdAt?.toLocaleDateString(),
      })),
    }
  } catch (error) {
    console.error('Get all products error:', error)
    return {
      success: false,
      message: 'Failed to fetch products',
    }
  }
}

export async function createProduct(data: {
  name: string
  description: string
  category: string
  priority: number
}): Promise<{
  success: boolean
  message: string
  product?: any
}> {
  try {
    if (!data.name || !data.category) {
      return {
        success: false,
        message: 'Name and category are required',
      }
    }

    await dbConnect()

    const slug = slugify(data.name)
    const existingProduct = await Product.findOne({ slug })
    if (existingProduct) {
      return {
        success: false,
        message: 'A product with this name already exists.',
      }
    }

    const newProduct = await Product.create({
      ...data,
      slug,
    })

    revalidatePath('/admin/products')

    return {
      success: true,
      message: 'Product created successfully',
      product: JSON.parse(JSON.stringify(newProduct)),
    }
  } catch (error) {
    console.error('Create product error:', error)
    return {
      success: false,
      message: 'An error occurred while creating the product',
    }
  }
}

export async function updateProduct(
  productId: string,
  data: Partial<IProduct>
): Promise<{
  success: boolean
  message: string
  product?: any
}> {
  try {
    await dbConnect()

    const product = await Product.findById(productId)
    if (!product) {
      return {
        success: false,
        message: 'Product not found',
      }
    }

    // Handle slug regeneration if name changes
    if (data.name && data.name !== product.name) {
      const newSlug = slugify(data.name)
      const existingProduct = await Product.findOne({ slug: newSlug })
      if (existingProduct && existingProduct._id.toString() !== productId) {
        return {
          success: false,
          message: 'A product with this name already exists.',
        }
      }
      data.slug = newSlug
    }

    // Sanitize data by removing immutable fields
    delete data._id
    delete data.createdAt
    delete data.__v

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: data },
      { new: true, runValidators: true }
    ).lean()

    if (!updatedProduct) {
      return {
        success: false,
        message: 'Failed to update product',
      }
    }

    revalidatePath('/admin/products')
    revalidatePath(`/products/${updatedProduct.slug}`)

    return {
      success: true,
      message: 'Product updated successfully',
      product: JSON.parse(JSON.stringify(updatedProduct)),
    }
  } catch (error: any) {
    console.error('Update product error:', error)
    return {
      success: false,
      message: error.message || 'An error occurred while updating the product',
    }
  }
}

export async function deleteProduct(productId: string): Promise<{
  success: boolean
  message: string
}> {
  try {
    if (!productId) {
      return {
        success: false,
        message: 'Product ID is required',
      }
    }

    await dbConnect()

    const deletedProduct = await Product.findByIdAndDelete(productId)

    if (!deletedProduct) {
      return {
        success: false,
        message: 'Product not found',
      }
    }

    revalidatePath('/admin/products')

    return {
      success: true,
      message: 'Product deleted successfully',
    }
  } catch (error) {
    console.error('Delete product error:', error)
    return {
      success: false,
      message: 'An error occurred while deleting the product',
    }
  }
}

export async function getProductById(productId: string): Promise<{
  success: boolean
  product?: any
  message?: string
}> {
  try {
    await dbConnect()

    const product = await Product.findById(productId).lean()

    if (!product) {
      return {
        success: false,
        message: 'Product not found',
      }
    }

    return {
      success: true,
      product: JSON.parse(JSON.stringify(product)),
    }
  } catch (error) {
    console.error(`Get product by id error: ${error}`)
    return {
      success: false,
      message: 'Failed to fetch product',
    }
  }
}
