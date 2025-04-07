'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import imageCompression from 'browser-image-compression'
import convertToBase64 from '@/lib/convertToBase64'
import { deleteProduct } from './actions'
import { toast } from '@/hooks/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const categories = [
  'Whole Spices',
  'Ground Spices',
  'Edible Oils',
  'Millets',
  'Pulses(Dal)',
  'Rice',
]

export default function ProductEditModal({
  product,
  onUpdate,
  onProductAdded,
}) {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState({
    myFile: product.image || '/images/dummyImage.jpg',
  })
  const [formData, setFormData] = useState({
    ...product,
    specification: product.specification || [{ title: '', value: '' }],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...formData.specification]
    newSpecs[index][field] = value
    setFormData((prev) => ({ ...prev, specification: newSpecs }))
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

    setFormData((prev) => ({
      ...prev,
      image: base64,
    }))
  }

  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specification: [...prev.specification, { title: '', value: '' }],
    }))
  }

  const removeSpecification = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      specification: prev.specification.filter(
        (_, index) => index !== indexToRemove
      ),
    }))
  }

  const handleProductDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this product?')

    if (confirmed) {
      const response = await deleteProduct(product._id)
      if (response.status === 'success') {
        toast({
          title: 'Success',
          description: 'Product deleted successfully',
        })
        onProductAdded()
      } else {
        toast({
          title: 'Error',
          description: response.message,
          variant: 'destructive',
        })
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    onUpdate(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <tr
          className="cursor-pointer hover:bg-muted"
          onClick={() => setOpen(true)}
        >
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.category}</td>
          <td>{product.priority}</td>
          <td>
            {product.pricePerKg.amount} {product.pricePerKg.currency}
          </td>
          <td>
            <Image
              src={product.image || '/images/dummyImage.jpg'}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-md"
              width={64}
              height={64}
            />
          </td>
          <td></td>
        </tr>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label>Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="w-full" id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Priority</Label>
            <Input
              name="priority"
              type="number"
              value={formData.priority}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price (Amount)</Label>
              <Input
                name="pricePerKg.amount"
                type="number"
                value={formData.pricePerKg.amount}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pricePerKg: {
                      ...prev.pricePerKg,
                      amount: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div>
              <Label>Currency</Label>
              <Input
                name="pricePerKg.currency"
                value={formData.pricePerKg.currency}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pricePerKg: {
                      ...prev.pricePerKg,
                      currency: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>

          {/* Dynamic Specification */}
          <div>
            <Label>Specification</Label>
            {formData.specification.map((spec, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  value={spec.title}
                  onChange={(e) =>
                    handleSpecChange(index, 'title', e.target.value)
                  }
                  placeholder="Title"
                  className="input mb-2"
                />
                <Input
                  value={spec.value}
                  onChange={(e) =>
                    handleSpecChange(index, 'value', e.target.value)
                  }
                  placeholder="Value"
                  className="input mb-2"
                />
                <button
                  onClick={() => removeSpecification(index)}
                  className="text-red-500"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addSpecification}
              className="mt-4"
            >
              + Add Specification
            </Button>
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

          <Button type="submit" className="w-full mt-4">
            Save Changes
          </Button>
          <Button
            type="button1"
            variant="destructive"
            className="w-full mt-4"
            onClick={handleProductDelete}
          >
            Delete Item
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
