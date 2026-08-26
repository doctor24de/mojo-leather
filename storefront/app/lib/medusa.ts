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
  images?: Array<{ url?: string | null }>
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

let regionIdPromise: Promise<string | undefined> | undefined

function getRegionId() {
  if (!regionIdPromise) {
    regionIdPromise = fetch(`${backendUrl}/store/regions?limit=100`, { headers: headers() })
      .then(async (response) => {
        if (!response.ok) return undefined
        const data = await response.json() as { regions?: Array<{ id: string; currency_code?: string }> }
        return (data.regions || []).find((region) => region.currency_code?.toLowerCase() === "eur")?.id || data.regions?.[0]?.id
      })
      .catch(() => undefined)
  }
  return regionIdPromise
}

async function fetchProducts(params: Record<string, string>) {
  const regionId = await getRegionId()
  const attempts = [
    { ...params, ...(regionId ? { region_id: regionId } : {}), fields: "*variants.calculated_price,*variants.prices,*images,+metadata" },
    { ...params, fields: "*variants.prices,*images,+metadata" },
    params,
  ]

  for (const queryParams of attempts) {
    const response = await fetch(`${backendUrl}/store/products?${new URLSearchParams(queryParams)}`, { headers: headers() })
    if (response.ok) return response
  }
  throw new Error("Medusa products request failed")
}

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
    image: product.thumbnail || product.images?.[0]?.url || "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=90",
    description: product.description || "Премиум кожено яке, създадено да носи характер с всяка следваща история.",
    material: product.metadata?.material ? String(product.metadata.material) : undefined,
    craftsmanship: product.metadata?.craftsmanship ? String(product.metadata.craftsmanship) : undefined,
    variantId: variant?.id,
    currencyCode,
  }
}

export async function getMedusaProducts(): Promise<MedusaProduct[]> {
  if (!medusaConfigured) return []
  const response = await fetchProducts({ limit: "100" })
  const data = await response.json() as { products?: ApiProduct[] }
  return (data.products || []).map(mapProduct)
}

export async function getMedusaProduct(handle: string): Promise<MedusaProduct | null> {
  if (!medusaConfigured) return null
  const response = await fetchProducts({ handle })
  const data = await response.json() as { products?: ApiProduct[] }
  return data.products?.[0] ? mapProduct(data.products[0]) : null
}
