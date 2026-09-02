import ProductGrid from "./components/ProductGrid"
import Faq from "./components/Faq"

export default function Home() {
  return <main className="simple-home">
    <section className="simple-hero" aria-label="Колекции">
      <a href="/women" className="simple-hero-panel"><picture><source srcSet="/furia/editorial/women/hero-women.webp" type="image/webp"/><img src="/furia/editorial/women/hero-women.jpg" alt="Дамски кожени якета" width="1122" height="1402" fetchPriority="high" decoding="async"/></picture><div><h1>Жени</h1><span>Разгледай колекцията</span></div></a>
      <a href="/men" className="simple-hero-panel"><picture><source srcSet="/furia/editorial/men/hero-men.webp" type="image/webp"/><img src="/furia/editorial/men/hero-men.jpg" alt="Мъжки кожени якета" width="1122" height="1402" fetchPriority="high" decoding="async"/></picture><div><h1>Мъже</h1><span>Разгледай колекцията</span></div></a>
    </section>
    <section className="home-products" id="shop"><header className="home-products-head"><div><p className="eyebrow">Ново във Furia</p><h2>Току-що пристигнаха</h2></div><p>Не качваме нов модел всяка седмица. Показваме само якета, които бихме носили и след десет години.</p><nav aria-label="Продуктови категории"><a href="/women">За жени</a><a href="/men">За мъже</a></nav></header><ProductGrid pageSize={8} hideLoadMore/></section>
    <section className="outlet-callout"><div><p className="eyebrow">Последният размер. Последното яке.</p><h2>Единични бройки</h2><p>Мостри, последни размери и модели, които няма да повторим. Същата кожа и изработка, но на по-добра цена.</p><a href="/outlet">Виж Outlet</a></div></section>
    <section className="home-values"><article><span>01</span><h3>Подбираме ги на живо</h3><p>Пипаме кожата, гледаме шевовете и пробваме кройката, преди моделът да стигне до сайта.</p></article><article><span>02</span><h3>Не зареждаме безкрайно</h3><p>Работим с малки количества. Когато една серия свърши, често наистина е свършила.</p></article><article><span>03</span><h3>Пробвате преди да платите</h3><p>Всяко яке пътува с преглед и тест, защото снимката никога не заменя пробата.</p></article><article><span>04</span><h3>Ако не е вашето — връщате го</h3><p>Имате 30 дни. Без сложни обяснения и без да ви убеждаваме да задържите нещо неподходящо.</p></article></section>
    <Faq title="Нещата, които бихте ни попитали в магазина"/>
  </main>
}
