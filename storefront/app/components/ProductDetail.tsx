"use client"

import { useEffect, useState } from "react"
import { formatPrice, products as sampleProducts, type Product } from "../data"
import { getMedusaProduct, medusaConfigured } from "../lib/medusa"

export default function ProductDetail({ slug }: { slug: string }) {
  const fallback = sampleProducts.find((product) => product.slug === slug)
  const [product, setProduct] = useState<Product | null>(fallback || null)
  const [loading, setLoading] = useState(medusaConfigured)

  useEffect(() => {
    if (!medusaConfigured) return
    getMedusaProduct(slug).then((result) => setProduct(result || fallback || null)).catch(() => setProduct(fallback || null)).finally(() => setLoading(false))
  }, [slug])

  if (loading && !product) return <main className="product-loading">Зареждаме продукта…</main>
  if (!product) return <main className="product-loading"><h1>Продуктът не е намерен.</h1><a className="text-link" href="/women">Обратно към колекцията</a></main>

  return <main className="product-page"><div className="product-gallery"><img src={product.image} alt={`Кожено яке ${product.name}`}/></div><div className="product-detail"><p className="eyebrow">{product.category} · {product.color}</p><h1>{product.name}</h1><strong className="product-price">{formatPrice(product.price)}</strong><p className="product-description">{product.description}</p><div className="sizes"><span>Избери размер</span><div>{["XS","S","M","L","XL"].map(s=><button key={s}>{s}</button>)}</div></div><button className="add-to-cart">Добави в количката</button><details open><summary>Материал и изработка</summary><p>100% естествена кожа. Вискозна подплата. Произведено в малка серия.</p></details><details><summary>Доставка и връщане</summary><p>Безплатна доставка над €250 и 30 дни за връщане.</p></details></div></main>
}
