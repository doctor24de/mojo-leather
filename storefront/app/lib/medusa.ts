import type { Product } from "../data"

export type MedusaProduct = Product & {
  id: string
  variantId?: string
  currencyCode?: string
}

type ApiProduct = {
  id: string
  title: string
  handle: string
  thumbnail?: string | null
  description?: string | null
  metadata?: Record<string, unknown> | null
  categories?: Array<{ name?: string; handle?: string }>
  collection?: { title?: string; handle?: string } | null
  variants?: Array<{
    id: string
    calculated_price?: {
      calculated_amount?: number
      currency_code?: string
    } | null
    prices?: Array<{ amount: number; currency_code: string }>
  }>
}

const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.replace(/\/$/, "")
const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

export const medusaConfigured = Boolean(backendUrl && publishableKey)

const headers = () => ({
  "Content-Type": "application/json",
  "x-publishable-api-key": publishableKey || "",
})

function categoryOf(product: ApiProduct): "Жени" | "Мъже" {
  const values = [
    product.title,
    product.handle,
    product.metadata?.gender,
    product.metadata?.category,
    product.collection?.title,
    ...(product.categories || []).flatMap((category) => [category.name, category.handle]),
  ].filter(Boolean).join(" ").toLocaleLowerCase("bg")

  return /women|woman|жени|дам/.test(values) ? "Жени" : "Мъже"
}

function mapProduct(product: ApiProduct): MedusaProduct {
  const variant = product.variants?.[0]
  const calculated = variant?.calculated_price
  const fallbackPrice = variant?.prices?.[0]
  const amount = calculated?.calculated_amount ?? fallbackPrice?.amount ?? 0
  const currencyCode = calculated?.currency_code ?? fallbackPrice?.currency_code ?? "eur"

  return {
    id: product.id,
    slug: product.handle,
    name: product.title,
    category: categoryOf(product),
    color: String(product.metadata?.color || product.metadata?.colour || "Естествена кожа"),
    price: amount,
    badge: product.metadata?.badge ? String(product.metadata.badge) : undefined,
    image: product.thumbnail || "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=90",
    description: product.description || "Премиум кожено яке, създадено да носи характер с всяка следваща история.",
    variantId: variant?.id,
    currencyCode,
  }
}

export async function getMedusaProducts(): Promise<MedusaProduct[]> {
  if (!medusaConfigured) return []
  const response = await fetch(`${backendUrl}/store/products?limit=100`, {
    headers: headers(),
  })
  if (!response.ok) throw new Error(`Medusa products request failed: ${response.status}`)
  const data = await response.json() as { products?: ApiProduct[] }
  return (data.products || []).map(mapProduct)
}

export async function getMedusaProduct(handle: string): Promise<MedusaProduct | null> {
  if (!medusaConfigured) return null
  const response = await fetch(`${backendUrl}/store/products?handle=${encodeURIComponent(handle)}`, {
    headers: headers(),
  })
  if (!response.ok) throw new Error(`Medusa product request failed: ${response.status}`)
  const data = await response.json() as { products?: ApiProduct[] }
  return data.products?.[0] ? mapProduct(data.products[0]) : null
}
