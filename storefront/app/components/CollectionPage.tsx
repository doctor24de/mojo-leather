import Faq from "./Faq"
import ProductGrid from "./ProductGrid"

type CollectionProps = {
  category: "Жени" | "Мъже"
  title: string
  italicTitle: string
  lead: string
  hero: string
  full: string
  detail: string
  heroDimensions: [number, number]
}

export default function CollectionPage({category,title,italicTitle,lead,hero,full,detail,heroDimensions}:CollectionProps){
 const[w,h]=heroDimensions
 return <main className="collection-page"><section className="collection-hero"><div className="collection-hero-copy"><p className="eyebrow">Furia Leather · Колекция 2026</p><h1>{title}<br/><em>{italicTitle}</em></h1><p>{lead}</p><a href="#products" className="collection-cta">Разгледай моделите <span aria-hidden="true">↓</span></a></div><div className="collection-hero-image"><img src={hero} alt={`${category} — кожени якета Furia Leather`} width={w} height={h} fetchPriority="high" decoding="async"/></div></section><section className="collection-note"><p className="eyebrow">Създадени за носене</p><p>Естествената кожа не остава една и съща. Тя омеква, следва движението и с времето става лично ваша.</p><dl><div><dt>01</dt><dd>Естествена кожа</dd></div><div><dt>02</dt><dd>Малки серии</dd></div><div><dt>03</dt><dd>Преглед и тест</dd></div></dl></section><section className="collection-products" id="products"><header><div><p className="eyebrow">{category}</p><h2>Всички модели</h2></div><p>Изберете яке, отворете продукта и проверете наличните размери.</p></header><ProductGrid category={category}/></section><section className="collection-story"><div className="collection-story-image"><img src={full} alt={`${category} модел с кожено яке`} loading="lazy" decoding="async"/></div><div className="collection-story-copy"><p className="eyebrow">Кройката има значение</p><h2>Силует, който работи с вас.</h2><p>Всяка линия е подбрана така, че якето да изглежда добре още от първото обличане и да става по-удобно с времето.</p><ul><li>Кожа, която диша и се адаптира</li><li>Подплата за ежедневно удобство</li><li>Функционални джобове и здрави метални елементи</li></ul><a href="#products" className="text-link">Виж моделите</a></div><div className="collection-detail-image"><img src={detail} alt="Детайл от естествена кожа" loading="lazy" decoding="async"/></div></section><Faq/></main>
}
