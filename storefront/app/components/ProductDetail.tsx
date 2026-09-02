"use client"

import { useEffect, useState, type FormEvent } from "react"
import { formatPrice, type Product } from "../data"
import { addCartLine, createCart, getMedusaProduct, medusaConfigured, saveQuickOrder } from "../lib/medusa"
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
  const [quickOrderOpen, setQuickOrderOpen] = useState(false)
  const [quickBusy, setQuickBusy] = useState(false)
  const [quickSuccess, setQuickSuccess] = useState("")

  useEffect(() => {
    if (!medusaConfigured) return
    getMedusaProduct(slug).then((result) => setProduct(result)).catch(() => setProduct(null)).finally(() => setLoading(false))
  }, [slug])
  useEffect(()=>{try{setFavorite((JSON.parse(localStorage.getItem("furia-favorites")||"[]") as string[]).includes(slug))}catch{}},[slug])

  if (loading && !product) return <main className="product-loading">Зареждаме продукта…</main>
  if (!product) return <main className="product-loading"><h1>Продуктът не е намерен.</h1><a className="text-link" href="/women">Обратно към колекцията</a></main>

  const material = product.material || "100% естествена кожа"
  const craftsmanship = product.craftsmanship || "Вискозна подплата. Произведено в малка серия."
  const specifications = [
    ["Материал", material], ["Подплата", product.lining], ["Цвят", product.color],
    ["Кройка", product.fit], ["Закопчаване", product.fastening], ["Джобове", product.pockets],
    ["Произход", product.origin], ["Ръст на модела", product.modelHeight], ["Размер на модела", product.modelSize],
  ].filter((item): item is [string,string] => Boolean(item[1]))
  const sizeOrder=["XXS","XS","S","M","L","XL","XXL"]
  const variants = [...(product.variants || [])].sort((a,b)=>sizeOrder.indexOf(a.options?.[0]?.value||a.title)-sizeOrder.indexOf(b.options?.[0]?.value||b.title))
  const addSelected = async () => {
    if (!selectedVariantId) { setMessage("Моля, избери размер."); return }
    setMessage("")
    try { await addItem(selectedVariantId); setMessage("Продуктът е добавен в количката.") }
    catch (error) { setMessage(error instanceof Error ? error.message : "Не успяхме да добавим продукта.") }
  }
  const toggleFavorite=()=>{let saved:string[]=[];try{saved=JSON.parse(localStorage.getItem("furia-favorites")||"[]")}catch{}const next=saved.includes(slug)?saved.filter(item=>item!==slug):[...saved,slug];localStorage.setItem("furia-favorites",JSON.stringify(next));setFavorite(next.includes(slug))}
  const submitQuickOrder=async(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();const form=new FormData(event.currentTarget);const variantId=String(form.get("variant")||selectedVariantId);if(!variantId){setQuickSuccess("Моля, изберете размер.");return}setQuickBusy(true);setQuickSuccess("");try{const cart=await createCart();await addCartLine(cart.id,variantId);await saveQuickOrder(cart.id,{email:String(form.get("email")),name:String(form.get("name")),phone:String(form.get("phone")),address:String(form.get("address")),color:product.color,size:String(form.get("size")),payment:String(form.get("payment")),notes:String(form.get("notes")||""),product:product.name});setQuickSuccess("Заявката е приета. Ще се свържем с вас за потвърждение.")}catch{setQuickSuccess("Не успяхме да изпратим заявката. Обадете ни се на 0885 235 241.")}finally{setQuickBusy(false)}}

  return <>
    <nav className="product-breadcrumb" aria-label="Път до продукта"><a href="/">Начало</a><span>/</span><a href={product.category==="Жени"?"/women":"/men"}>{product.category}</a><span>/</span><strong>{product.name}</strong></nav>
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
        <p className="stock-status"><i/> В наличност <span>· изпращане до 1 работен ден</span></p>
        <div className="product-buy"><button className="add-to-cart" disabled={cartBusy} onClick={addSelected}>{cartBusy?"Добавяме…":"Добави в количката"}</button><strong>{formatPrice(product.price)}</strong></div>
        <button className="quick-order-trigger" type="button" onClick={()=>setQuickOrderOpen(true)}>Бърза поръчка без регистрация <span>→</span></button>
        {message&&<p className="product-message" role="status">{message}</p>}
        <div className="purchase-benefits" aria-label="Предимства при поръчка"><p><span>↗</span><b>Еконт до адрес или офис</b><small>Преглед, проба и тест преди плащане</small></p><p><span>↺</span><b>30 дни за връщане</b><small>Спокойно време да решите</small></p><p><span>◇</span><b>Помощ с размера</b><small>0885 235 241</small></p></div>
        <div className="payment-panel"><span>Сигурно плащане</span><div className="payment-badges" aria-label="Методи за плащане"><b>VISA</b><b className="mastercard"><i/><i/></b><b>Apple Pay</b><b>G Pay</b><b className="econt">Econt</b></div></div>
        <details open><summary>Материал и изработка</summary><p>{material}. {craftsmanship}</p></details>
        <details><summary>Доставка и връщане</summary><p>Безплатна доставка над €250 и 30 дни за връщане.</p></details>
        <section className="product-specifications" aria-labelledby="specifications-title"><p className="eyebrow">Детайли</p><h2 id="specifications-title">Всичко за модела</h2><dl>{specifications.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
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
    {quickOrderOpen&&<div className="quick-order-modal" role="dialog" aria-modal="true" aria-labelledby="quick-order-title" onClick={()=>setQuickOrderOpen(false)}><form className="quick-order-card" onSubmit={submitQuickOrder} onClick={event=>event.stopPropagation()}><button className="quick-order-close" type="button" onClick={()=>setQuickOrderOpen(false)} aria-label="Затвори">×</button><p className="eyebrow">Без профил · потвърждение по телефон</p><h2 id="quick-order-title">Поръчка с доставка до 24 часа</h2><p className="quick-order-product">{product.name} · {formatPrice(product.price)}</p><div className="quick-order-fields"><label>Вашето име<input name="name" required autoComplete="name"/></label><label>Вашият email<input name="email" type="email" required autoComplete="email"/></label><label>Телефон за връзка<input name="phone" type="tel" required autoComplete="tel"/></label><label>Цвят<input name="color" value={product.color} readOnly/></label><label>Размер<select name="variant" required value={selectedVariantId} onChange={event=>setSelectedVariantId(event.target.value)}><option value="">Изберете размер</option>{variants.map(variant=>{const size=variant.options?.[0]?.value||variant.title;return <option value={variant.id} key={variant.id}>{size}</option>})}</select><input name="size" type="hidden" value={variants.find(v=>v.id===selectedVariantId)?.options?.[0]?.value||variants.find(v=>v.id===selectedVariantId)?.title||""}/></label><label>Начин на плащане<select name="payment" required defaultValue="Наложен платеж"><option>Наложен платеж</option><option>Плащане с карта</option><option>Банков превод</option></select></label><label className="wide">Адрес за доставка<textarea name="address" required rows={2}/></label><label className="wide">Допълнителни бележки<textarea name="notes" rows={3}/></label></div><label className="quick-consent"><input type="checkbox" required/> Приемам <a href="/terms" target="_blank">общите условия</a> и <a href="/privacy" target="_blank">политиката за поверителност</a>.</label><button className="button dark quick-submit" disabled={quickBusy}>{quickBusy?"Изпращаме…":"Изпрати заявката"}</button>{quickSuccess&&<p className="quick-order-status" role="status">{quickSuccess}</p>}</form></div>}
  </>
}
