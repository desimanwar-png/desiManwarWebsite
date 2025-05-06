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
import { getProducts, updateProduct } from './actions'
import { toast } from '@/hooks/use-toast'
import ProductEditModal from './ProductEditModal'

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

  const handleProductUpdate = async (formData) => {
    const result = await updateProduct(formData)

    if (result.status === 'success') {
      toast({
        title: 'Updated successfully',
        description: 'Product has been updated successfully.',
      })
      onProductAdded()
    } else {
      toast({ title: 'Update failed', variant: 'destructive' })
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
              <TableHead>Priority</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Image</TableHead>
              {/* <TableHead>Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <ProductEditModal
                  key={product._id}
                  product={product}
                  onUpdate={handleProductUpdate}
                  onProductAdded={onProductAdded}
                />
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
