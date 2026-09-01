import ProductGrid from "./components/ProductGrid"

export default function Home() {
  return <main className="simple-home">
    <section className="simple-hero" aria-label="Колекции">
      <a href="/women" className="simple-hero-panel"><img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1400&q=90" alt="Дамски кожени якета"/><div><h1>Жени</h1><span>Разгледай колекцията</span></div></a>
      <a href="/men" className="simple-hero-panel"><img src="https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&w=1400&q=90" alt="Мъжки кожени якета"/><div><h1>Мъже</h1><span>Разгледай колекцията</span></div></a>
    </section>
    <section className="simple-products" id="shop"><div className="simple-title"><h2>Нови модели</h2><a href="/women">Виж всички</a></div><ProductGrid/></section>
    <section className="simple-editorial">
      <a href="/women"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=90" alt="Дамска колекция"/><div><h2>Дамска колекция</h2><span>Купи сега</span></div></a>
      <a href="/men"><img src="https://images.unsplash.com/photo-1583854197414-7bea234c2159?auto=format&fit=crop&w=1600&q=90" alt="Мъжка колекция"/><div><h2>Мъжка колекция</h2><span>Купи сега</span></div></a>
    </section>
  </main>
}
