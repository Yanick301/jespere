import { notFound } from 'next/navigation'
import ProductDetailClient from '@/components/product-detail-client'
import { getProductById, getRelatedProducts } from '@/lib/supabase-products'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(Number(params.id))
  
  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id)

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />
}
