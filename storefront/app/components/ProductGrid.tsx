"use client"

import { useEffect, useState } from "react"
import { formatPrice, type Product } from "../data"
import { getMedusaProducts, medusaConfigured } from "../lib/medusa"

export default function ProductGrid({ category }: { category?: "Жени" | "Мъже" }) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!medusaConfigured) return
    getMedusaProducts()
      .then((result) => {
        const filtered = category ? result.filter((product) => product.category === category) : result
        setProducts(filtered)
      })
      .catch(() => setProducts([]))
  }, [category])

  if (!products.length) return <p className="empty-products">Все още няма публикувани продукти в тази категория.</p>

  return <div className="product-grid">{products.map(product => <article className="product-card" key={product.slug}><a className="product-image" href={`/product/${product.slug}`}><img src={product.image} alt={`Кожено яке ${product.name}`}/>{product.badge&&<span className="badge">{product.badge}</span>}<span className="quick-add">Разгледай</span></a><a className="product-info" href={`/product/${product.slug}`}><div><h3>{product.name}</h3><p>{product.category} · {product.color}</p></div><strong>{formatPrice(product.price)}</strong></a></article>)}</div>
}
