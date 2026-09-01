import ProductGrid from "./components/ProductGrid"
import EditorialImage from "./components/EditorialImage"

export default function Home() {
  return <main className="simple-home">
    <section className="simple-hero" aria-label="Колекции">
      <a href="/women" className="simple-hero-panel"><EditorialImage src="/furia/editorial/women/hero-women.jpg" alt="Дамски кожени якета"/><div><h1>Жени</h1><span>Разгледай колекцията</span></div></a>
      <a href="/men" className="simple-hero-panel"><EditorialImage src="/furia/editorial/men/hero-men.jpg" alt="Мъжки кожени якета"/><div><h1>Мъже</h1><span>Разгледай колекцията</span></div></a>
    </section>
    <section className="simple-products" id="shop"><div className="simple-title"><h2>Нови модели</h2><a href="/women">Виж всички</a></div><ProductGrid/></section>
    <section className="simple-editorial">
      <a href="/women"><EditorialImage src="/furia/editorial/women/women-wide.jpg" alt="Дамска колекция"/><div><h2>Дамска колекция</h2><span>Купи сега</span></div></a>
      <a href="/men"><EditorialImage src="/furia/editorial/men/men-wide.jpg" alt="Мъжка колекция"/><div><h2>Мъжка колекция</h2><span>Купи сега</span></div></a>
    </section>
  </main>
}
