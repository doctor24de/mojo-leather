import ProductGrid from "./components/ProductGrid"

export default function Home() {
  return <main className="simple-home">
    <section className="simple-hero" aria-label="Колекции">
      <a href="/women" className="simple-hero-panel"><picture><source srcSet="/furia/editorial/women/hero-women.webp" type="image/webp"/><img src="/furia/editorial/women/hero-women.jpg" alt="Дамски кожени якета" width="1122" height="1402" fetchPriority="high" decoding="async"/></picture><div><h1>Жени</h1><span>Разгледай колекцията</span></div></a>
      <a href="/men" className="simple-hero-panel"><picture><source srcSet="/furia/editorial/men/hero-men.webp" type="image/webp"/><img src="/furia/editorial/men/hero-men.jpg" alt="Мъжки кожени якета" width="1122" height="1402" fetchPriority="high" decoding="async"/></picture><div><h1>Мъже</h1><span>Разгледай колекцията</span></div></a>
    </section>
    <section className="simple-products" id="shop"><div className="simple-title"><h2>Нови модели</h2><a href="/women">Виж всички</a></div><ProductGrid pageSize={8} hideLoadMore/></section>
    <section className="simple-editorial">
      <a href="/women"><picture><source srcSet="/furia/editorial/women/women-wide.webp" type="image/webp"/><img src="/furia/editorial/women/women-wide.jpg" alt="Дамска колекция" width="1536" height="1024" loading="lazy" decoding="async"/></picture><div><h2>Дамска колекция</h2><span>Купи сега</span></div></a>
      <a href="/men"><picture><source srcSet="/furia/editorial/men/men-wide.webp" type="image/webp"/><img src="/furia/editorial/men/men-wide.jpg" alt="Мъжка колекция" width="1536" height="1024" loading="lazy" decoding="async"/></picture><div><h2>Мъжка колекция</h2><span>Купи сега</span></div></a>
    </section>
  </main>
}
