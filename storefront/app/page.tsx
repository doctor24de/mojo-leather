import ProductGrid from "./components/ProductGrid"
import Faq from "./components/Faq"

export default function Home() {
  return <main className="simple-home">
    <section className="simple-hero" aria-label="Колекции">
      <a href="/women" className="simple-hero-panel"><picture><source srcSet="/furia/editorial/women/hero-women.webp" type="image/webp"/><img src="/furia/editorial/women/hero-women.jpg" alt="Дамски кожени якета" width="1122" height="1402" fetchPriority="high" decoding="async"/></picture><div><h1>Жени</h1><span>Разгледай колекцията</span></div></a>
      <a href="/men" className="simple-hero-panel"><picture><source srcSet="/furia/editorial/men/hero-men.webp" type="image/webp"/><img src="/furia/editorial/men/hero-men.jpg" alt="Мъжки кожени якета" width="1122" height="1402" fetchPriority="high" decoding="async"/></picture><div><h1>Мъже</h1><span>Разгледай колекцията</span></div></a>
    </section>
    <section className="home-products" id="shop"><header className="home-products-head"><div><p className="eyebrow">Току-що пристигнали</p><h2>Нови модели</h2></div><p>Два силуета, с които започваме. Подбрани заради кожата, кройката и начина, по който ще изглеждат след години носене.</p><nav aria-label="Продуктови категории"><a href="/women">За жени</a><a href="/men">За мъже</a></nav></header><ProductGrid pageSize={8} hideLoadMore/></section>
    <section className="simple-editorial">
      <a href="/women"><picture><source srcSet="/furia/editorial/women/women-wide.webp" type="image/webp"/><img src="/furia/editorial/women/women-wide.jpg" alt="Дамска колекция" width="1536" height="1024" loading="lazy" decoding="async"/></picture><div><h2>Дамска колекция</h2><span>Купи сега</span></div></a>
      <a href="/men"><picture><source srcSet="/furia/editorial/men/men-wide.webp" type="image/webp"/><img src="/furia/editorial/men/men-wide.jpg" alt="Мъжка колекция" width="1536" height="1024" loading="lazy" decoding="async"/></picture><div><h2>Мъжка колекция</h2><span>Купи сега</span></div></a>
    </section>
    <section className="home-values"><article><span>01</span><h3>Естествена кожа</h3><p>Материал, който омеква и придобива характер с всяко носене.</p></article><article><span>02</span><h3>Малки серии</h3><p>Подбираме модели с ясна кройка, вместо безкрайни сезонни колекции.</p></article><article><span>03</span><h3>Преглед и тест</h3><p>Проверете якето и размера още при получаването.</p></article><article><span>04</span><h3>30 дни за връщане</h3><p>Спокойно време да решите дали това е вашето яке.</p></article></section>
    <Faq title="Всичко важно, преди да изберете"/>
  </main>
}
