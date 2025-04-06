'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { toast } from '@/hooks/use-toast'
import convertToBase64 from '@/lib/convertToBase64'
import imageCompression from 'browser-image-compression'
import { addProduct } from './actions'

function ProductForm({ onProductAdded }) {
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [preview, setPreview] = useState({ myFile: '/images/dummyImage.jpg' })

  const generateSlug = (input) => {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
  }

  const handleTitleChange = (e) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    setSlug(generateSlug(newTitle)) // Auto-generate slug
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]

    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    })
    const base64 = await convertToBase64(compressedFile)
    setPreview({ myFile: base64 })
  }

  const handleSubmit = async (formData) => {
    formData.set('imageUrl', preview.myFile)
    const result = await addProduct(formData)

    if (result.status === 'error') {
      setError(result.message)
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Success',
        description: 'Product added successfully',
      })
      onProductAdded()
    }
  }

  return (
    <Sheet>
      <SheetTrigger>
        <PlusCircle />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Product</SheetTitle>
          <SheetDescription className="pt-8">
            <form
              action={async (formData) => handleSubmit(formData)}
              className="space-y-4"
            >
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Name
                </Label>
                <input
                  type="text"
                  name="name"
                  onChange={handleTitleChange}
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                  required
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Description
                </Label>
                <textarea
                  name="description"
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                  required
                ></textarea>
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Specification
                </Label>
                <input
                  type="text"
                  name="specification"
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Category
                </Label>
                <input
                  type="text"
                  name="category"
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                  required
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Sub-Category
                </Label>
                <input
                  type="text"
                  name="subCategory"
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                  required
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Price per Kg (Amount)
                </Label>
                <input
                  type="number"
                  name="pricePerKg.amount"
                  step="any"
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                  required
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Currency
                </Label>
                <input
                  type="text"
                  name="pricePerKg.currency"
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                  defaultValue="USD"
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Slug
                </Label>
                <input
                  type="text"
                  name="slug"
                  value={slug || ''}
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                  readOnly
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Priority
                </Label>
                <input
                  type="number"
                  name="priority"
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                  defaultValue="1000"
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  FSSAI Certified
                </Label>
                <input type="checkbox" name="isFSSAICertified" />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Product Image
                </Label>
                <Image
                  src={preview.myFile}
                  alt="Product Preview"
                  className="w-32 h-32 object-cover mb-2 rounded-md border"
                  width={128}
                  height={128}
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-md bg-secondary-dark p-2 text-white"
              >
                Add Product
              </Button>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default ProductForm
