import { Metadata } from 'next'
import { getProductById } from '@/lib/supabase-products'

export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  // Fetch product from Supabase
  const product = await getProductById(params.id, 'fr')

  if (!product) {
    return {
      title: 'Produit non trouvé | EZCENTIALS',
      description: 'Le produit que vous recherchez n\'existe pas.',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ezcentials.vercel.app'
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0] 
    : `${baseUrl}/placeholder.svg?height=1200&width=1200`

  return {
    title: `${product.name} | EZCENTIALS`,
    description: product.description,
    keywords: [product.category, product.subcategory || '', product.name, 'mode luxe', 'premium'].filter(Boolean),
    openGraph: {
      type: 'product',
      title: product.name,
      description: product.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
      siteName: 'EZCENTIALS',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/product/${product.id}`,
    },
    other: {
      'product:price:amount': product.price.toString(),
      'product:price:currency': 'EUR',
      'product:availability': product.stock > 0 ? 'in stock' : 'out of stock',
      'product:condition': 'new',
    },
  }
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
