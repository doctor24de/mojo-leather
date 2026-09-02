"use client"

import { useEffect, useState } from "react"
import { formatPrice, type Product } from "../data"
import { getMedusaProduct, medusaConfigured } from "../lib/medusa"
import { useCommerce } from "./CommerceProvider"

const reviews = [
  ["Кожата е изключително мека, а кройката стои прекрасно. Якето изглежда още по-добре на живо.", "Мария К. · София"],
  ["Размерът беше точен, доставката — бърза. Личи си вниманието към всеки детайл.", "Елена П. · Пловдив"],
  ["Истинска класика, която мога да нося всеки ден. Определено бих поръчала отново.", "Никол Д. · Варна"],
]

export default function ProductDetail({ slug }: { slug: string }) {
  const { addItem, cartBusy } = useCommerce()
  const [product, setProduct] = useState<(Product & { variants?: Array<{id:string;title:string;options:Array<{value:string}>}> }) | null>(null)
  const [loading, setLoading] = useState(medusaConfigured)
  const [sizeChartOpen, setSizeChartOpen] = useState(false)
  const [selectedVariantId, setSelectedVariantId] = useState("")
  const [message, setMessage] = useState("")
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    if (!medusaConfigured) return
    getMedusaProduct(slug).then((result) => setProduct(result)).catch(() => setProduct(null)).finally(() => setLoading(false))
  }, [slug])
  useEffect(()=>{try{setFavorite((JSON.parse(localStorage.getItem("furia-favorites")||"[]") as string[]).includes(slug))}catch{}},[slug])

  if (loading && !product) return <main className="product-loading">Зареждаме продукта…</main>
  if (!product) return <main className="product-loading"><h1>Продуктът не е намерен.</h1><a className="text-link" href="/women">Обратно към колекцията</a></main>

  const material = product.material || "100% естествена кожа"
  const craftsmanship = product.craftsmanship || "Вискозна подплата. Произведено в малка серия."
  const variants = product.variants || []
  const addSelected = async () => {
    if (!selectedVariantId) { setMessage("Моля, избери размер."); return }
    setMessage("")
    try { await addItem(selectedVariantId); setMessage("Продуктът е добавен в количката.") }
    catch (error) { setMessage(error instanceof Error ? error.message : "Не успяхме да добавим продукта.") }
  }
  const toggleFavorite=()=>{let saved:string[]=[];try{saved=JSON.parse(localStorage.getItem("furia-favorites")||"[]")}catch{}const next=saved.includes(slug)?saved.filter(item=>item!==slug):[...saved,slug];localStorage.setItem("furia-favorites",JSON.stringify(next));setFavorite(next.includes(slug))}

  return <>
    <main className="product-page">
      <div className="product-gallery"><img src={product.image} alt={`Кожено яке ${product.name}`}/></div>
      <div className="product-detail">
        <div className="product-detail-head"><div><p className="eyebrow">Нова колекция · {product.category}</p><h1>{product.name}</h1><strong className="product-price">{formatPrice(product.price)}</strong></div><button className={`product-favorite ${favorite?"active":""}`} onClick={toggleFavorite} aria-label={favorite?"Премахни от любими":"Добави в любими"}>♡</button></div>
        <p className="product-description">{product.description}</p>
        <div className="product-color"><span>Цвят</span><p><i aria-hidden="true"/> {product.color}</p></div>
        <div className="sizes">
          <div className="size-heading"><span>Избери размер</span><button type="button" onClick={() => setSizeChartOpen(true)}>Вижте таблицата с размери</button></div>
          <div>{variants.map(variant=>{const size=variant.options?.[0]?.value||variant.title;return <button className={selectedVariantId===variant.id?"selected":""} aria-pressed={selectedVariantId===variant.id} onClick={()=>{setSelectedVariantId(variant.id);setMessage("")}} key={variant.id}>{size}</button>})}</div>
        </div>
        <div className="product-buy"><button className="add-to-cart" disabled={cartBusy} onClick={addSelected}>{cartBusy?"Добавяме…":"Добави в количката"}</button><strong>{formatPrice(product.price)}</strong></div>
        {message&&<p className="product-message" role="status">{message}</p>}
        <details open><summary>Материал и изработка</summary><p>{material}. {craftsmanship}</p></details>
        <details><summary>Доставка и връщане</summary><p>Безплатна доставка над €250 и 30 дни за връщане.</p></details>
      </div>
    </main>
    <section className="product-reviews" aria-labelledby="reviews-title">
      <p className="eyebrow">Мнения от нашите клиенти</p>
      <h2 id="reviews-title">Носени с удоволствие.</h2>
      <div className="review-grid">{reviews.map(([quote, author]) => <blockquote key={author}><div>★★★★★</div><p>„{quote}“</p><footer>{author}</footer></blockquote>)}</div>
    </section>
    {sizeChartOpen && <div className="size-modal" role="dialog" aria-modal="true" aria-labelledby="size-chart-title" onClick={() => setSizeChartOpen(false)}>
      <div className="size-modal-card" onClick={(event) => event.stopPropagation()}>
        <button className="size-modal-close" type="button" aria-label="Затвори" onClick={() => setSizeChartOpen(false)}>×</button>
        <p className="eyebrow">Furia Leather</p><h2 id="size-chart-title">Таблица с размери</h2>
        <p>Измерете обиколката върху тънка дреха. Ако сте между два размера, изберете по-големия.</p>
        <div className="size-table-wrap"><table><thead><tr><th>Размер</th><th>Гръдна обиколка</th><th>Талия</th><th>Ханш</th></tr></thead><tbody>
          <tr><td>XS</td><td>80–84 cm</td><td>62–66 cm</td><td>88–92 cm</td></tr>
          <tr><td>S</td><td>84–88 cm</td><td>66–70 cm</td><td>92–96 cm</td></tr>
          <tr><td>M</td><td>88–94 cm</td><td>70–76 cm</td><td>96–102 cm</td></tr>
          <tr><td>L</td><td>94–100 cm</td><td>76–82 cm</td><td>102–108 cm</td></tr>
          <tr><td>XL</td><td>100–108 cm</td><td>82–90 cm</td><td>108–116 cm</td></tr>
        </tbody></table></div>
      </div>
    </div>}
  </>
}
