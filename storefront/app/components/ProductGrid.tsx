"use client"

import { useEffect, useState } from "react"
import { formatPrice, type Product } from "../data"
import { getMedusaProductsPage, medusaConfigured } from "../lib/medusa"

export default function ProductGrid({ category, outlet = false, pageSize = 24, hideLoadMore = false }: { category?: "Жени" | "Мъже"; outlet?: boolean; pageSize?: number; hideLoadMore?: boolean }) {
  const [products, setProducts] = useState<Product[]>([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [favorites,setFavorites]=useState<string[]>([])

  useEffect(()=>{try{setFavorites(JSON.parse(localStorage.getItem("furia-favorites")||"[]"))}catch{}},[])
  const toggleFavorite=(slug:string)=>{const next=favorites.includes(slug)?favorites.filter(x=>x!==slug):[...favorites,slug];setFavorites(next);localStorage.setItem("furia-favorites",JSON.stringify(next))}

  useEffect(() => {
    if (!medusaConfigured) { setLoading(false); return }
    setLoading(true)
    getMedusaProductsPage(offset, pageSize)
      .then(({products: result, count}) => {
        const filtered = result.filter((product) => (!category || product.category === category) && (!outlet || /outlet|единична|последна/i.test(product.badge||"")))
        setProducts(current => offset ? [...current, ...filtered] : filtered)
        setHasMore(offset + pageSize < count)
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [category, outlet, offset, pageSize])

  if (loading && !products.length) return <div className="product-grid product-skeletons" aria-label="Зареждаме продуктите">{Array.from({length:Math.min(pageSize,4)},(_,i)=><div key={i}><span/><i/></div>)}</div>
  if (!products.length) return <p className="empty-products">{outlet?"В момента няма останали единични бройки. Проверете отново скоро.":"Все още няма публикувани продукти в тази категория."}</p>

  return <><div className="product-grid">{products.map(product => <article className="product-card" key={product.slug}><a className="product-image" href={`/product/${product.slug}`}><img src={product.image} alt={`Кожено яке ${product.name}`} loading="lazy" decoding="async"/>{product.badge&&<span className="badge">{product.badge}</span>}<span className="quick-add">Разгледай</span></a><button className={`favorite-button ${favorites.includes(product.slug)?"active":""}`} onClick={()=>toggleFavorite(product.slug)} aria-label={favorites.includes(product.slug)?"Премахни от любими":"Добави в любими"}>♡</button><a className="product-info" href={`/product/${product.slug}`}><div><h3>{product.name}</h3><p>{product.category} · {product.color}</p></div><strong>{formatPrice(product.price)}</strong></a></article>)}</div>{!hideLoadMore&&hasMore&&<button className="load-more" disabled={loading} onClick={()=>setOffset(value=>value+pageSize)}>{loading?"Зареждаме…":"Покажи още"}</button>}</>
}
