'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ProductForm from './ProductForm'
import { deleteProduct, getProducts } from './actions'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

function ProductsPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      const result = await getProducts()

      setProducts(result.data)
    }

    fetchProducts()
  }, [])

  const onProductAdded = async () => {
    const updatedProducts = await getProducts()
    setProducts(updatedProducts.data)
  }

  const handleProductDelete = async (productId) => {
    const confirmed = confirm('Are you sure you want to delete this product?')

    if (confirmed) {
      const response = await deleteProduct(productId)
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

  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">Products</div>
        <ProductForm onProductAdded={onProductAdded} />
      </div>
      <div>
        <Table>
          <TableCaption>Create or Modify Products</TableCaption>
          <TableHeader className="border-2">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Sub-Category</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.subCategory}</TableCell>
                  <TableCell>{product.priority}</TableCell>
                  <TableCell>
                    {product.pricePerKg.amount} {product.pricePerKg.currency}
                  </TableCell>
                  <TableCell>
                    <Image
                      src={product.image || '/images/dummyImage.jpg'}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                      width={64}
                      height={64}
                    />
                  </TableCell>
                  <TableCell>
                    <div
                      className="text-red-700 ml-2 hover:text-red-400 cursor-pointer"
                      onClick={() => handleProductDelete(product._id)}
                    >
                      <Trash2 />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="7" className="text-center">
                  No Products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ProductsPage
