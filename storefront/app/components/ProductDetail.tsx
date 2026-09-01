"use client"

import { useEffect, useState } from "react"
import { formatPrice, products as sampleProducts, type Product } from "../data"
import { getMedusaProduct, medusaConfigured } from "../lib/medusa"

const reviews = [
  ["Кожата е изключително мека, а кройката стои прекрасно. Якето изглежда още по-добре на живо.", "Мария К. · София"],
  ["Размерът беше точен, доставката — бърза. Личи си вниманието към всеки детайл.", "Елена П. · Пловдив"],
  ["Истинска класика, която мога да нося всеки ден. Определено бих поръчала отново.", "Никол Д. · Варна"],
]

export default function ProductDetail({ slug }: { slug: string }) {
  const fallback = sampleProducts.find((product) => product.slug === slug)
  const [product, setProduct] = useState<Product | null>(fallback || null)
  const [loading, setLoading] = useState(medusaConfigured)
  const [sizeChartOpen, setSizeChartOpen] = useState(false)

  useEffect(() => {
    if (!medusaConfigured) return
    getMedusaProduct(slug).then((result) => setProduct(result || fallback || null)).catch(() => setProduct(fallback || null)).finally(() => setLoading(false))
  }, [slug])

  if (loading && !product) return <main className="product-loading">Зареждаме продукта…</main>
  if (!product) return <main className="product-loading"><h1>Продуктът не е намерен.</h1><a className="text-link" href="/women">Обратно към колекцията</a></main>

  const material = product.material || "100% естествена кожа"
  const craftsmanship = product.craftsmanship || "Вискозна подплата. Произведено в малка серия."

  return <>
    <main className="product-page">
      <div className="product-gallery"><img src={product.image} alt={`Кожено яке ${product.name}`}/></div>
      <div className="product-detail">
        <p className="eyebrow">{product.category} · {product.color}</p>
        <h1>{product.name}</h1>
        <strong className="product-price">{formatPrice(product.price)}</strong>
        <p className="product-description">{product.description}</p>
        <div className="product-color"><span>Цвят</span><p><i aria-hidden="true"/> {product.color}</p></div>
        <div className="sizes">
          <div className="size-heading"><span>Избери размер</span><button type="button" onClick={() => setSizeChartOpen(true)}>Вижте таблицата с размери</button></div>
          <div>{["XS","S","M","L","XL"].map(s=><button key={s}>{s}</button>)}</div>
        </div>
        <button className="add-to-cart">Добави в количката</button>
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
