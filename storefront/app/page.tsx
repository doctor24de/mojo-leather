import ProductGrid from "./components/ProductGrid"

const Arrow = () => <span className="arrow" aria-hidden="true"/>

export default function Home() {
  return <main id="top">
    <section className="furia-hero">
      <div className="furia-hero-copy">
        <p className="atelier-kicker"><span>София</span><span>Малки серии</span><span>От 2005</span></p>
        <h1>Не шием<br/>за сезона.<br/><em>Шием за теб.</em></h1>
        <p className="lede">Кожени якета с жива текстура, скроени бавно и направени да носят следите на истинския живот.</p>
        <div className="hero-links"><a href="/women">Дамски якета <Arrow/></a><a href="/men">Мъжки якета <Arrow/></a></div>
        <p className="maker-note">Всяка кожа е различна. Точно това е смисълът.</p>
      </div>
      <div className="furia-hero-image"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=92" alt="Кожено яке в градска среда"/><span className="image-caption">Furia No. 01 / Естествена кожа</span></div>
    </section>

    <section className="origin section" id="story">
      <div className="origin-mark" aria-hidden="true">F</div>
      <div className="origin-copy"><p className="index">01 / Нашият почерк</p><h2>Ръце,<br/><em>не конвейер.</em></h2><p>Furia Leather започва с една проста идея: доброто кожено яке не трябва да изглежда ново завинаги. То трябва да омеква, да потъмнява на точните места и да събира твоята история.</p><p>Работим в малки серии, подбираме кожите една по една и довършваме всеки модел с човешко око — не по шаблон за масовия пазар.</p><a className="text-link" href="#craft">Влез в ателието <Arrow/></a></div>
      <aside className="atelier-card"><span>Бележка от ателието</span><blockquote>„Съвършената кожа не е тази без следи. А тази, която остарява красиво.“</blockquote><small>— Екипът на Furia</small></aside>
    </section>

    <section className="collection section" id="shop"><p className="index">02 / Последно от ателието</p><div className="section-head"><h2>Носи го.<br/><em>Направи го свое.</em></h2><div className="tabs"><a href="#shop">Всички</a><a href="/women">Жени</a><a href="/men">Мъже</a></div></div><ProductGrid/><a className="all-products" href="/women">Разгледай колекцията <Arrow/></a></section>

    <section className="category-split"><article><img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1400&q=90" alt="Жена с черно кожено яке"/><div><p>Дамска линия</p><h2>Мека кожа.<br/>Силен характер.</h2><a href="/women">Разгледай <Arrow/></a></div></article><article><img src="https://images.unsplash.com/photo-1583854197414-7bea234c2159?auto=format&fit=crop&w=1400&q=90" alt="Мъж с черно кожено яке"/><div><p>Мъжка линия</p><h2>Без поза.<br/>Без компромис.</h2><a href="/men">Разгледай <Arrow/></a></div></article></section>

    <section className="craft section" id="craft"><div className="craft-image"><img src="https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&w=1400&q=90" alt="Детайл от кожено яке"/><span>Детайл / Furia Leather</span></div><div className="craft-copy"><p className="index">03 / Как го правим</p><h2>Характерът е<br/><em>в ръцете.</em></h2><p>Материалът води кройката. Работим с естествена кожа, която не е маскирана с тежки покрития, за да запази своята дълбочина и да става по-красива с носене.</p><dl><div><dt>01</dt><dd>Кожи, подбрани една по една</dd></div><div><dt>02</dt><dd>Кройки, пробвани върху истински тела</dd></div><div><dt>03</dt><dd>Поправка, грижа и дълъг живот</dd></div></dl><a className="text-link" href="/blog">Истории от ателието <Arrow/></a></div></section>

    <section className="furia-promise"><p>Не произвеждаме повече.</p><h2>Правим <em>по-добре.</em></h2><div><span>20+ години опит</span><span>20 000+ носени истории</span><span>Малки производствени серии</span></div></section>
    <section className="services"><div><b>01</b><h3>Безплатна доставка</h3><p>За поръчки над €250</p></div><div><b>02</b><h3>30 дни за решение</h3><p>Пробвай у дома спокойно</p></div><div><b>03</b><h3>Грижа след покупката</h3><p>Съвети и помощ от екипа</p></div><div><b>04</b><h3>Истински човек отсреща</h3><p>Пиши ни за размер или модел</p></div></section>
    <section className="newsletter"><p className="index">Писма от ателието</p><h2>Само когато има<br/><em>какво да покажем.</em></h2><p>Нови малки серии, хората зад тях и практични съвети за кожата.</p><form><input type="email" placeholder="Твоят имейл адрес" aria-label="Имейл адрес"/><button>Запиши ме</button></form></section>
  </main>
}
