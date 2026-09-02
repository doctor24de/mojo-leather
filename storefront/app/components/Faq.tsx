type FaqItem = { question: string; answer: string }

const commonQuestions: FaqItem[] = [
  { question: "Как да избера правилния размер?", answer: "Измерете гръдната обиколка върху тънка дреха и сравнете с таблицата на продуктовата страница. Ако сте между два размера, препоръчваме по-големия." },
  { question: "Кожата отпуска ли се при носене?", answer: "Да. Естествената кожа постепенно се адаптира към тялото и омеква, без да губи формата си. Това е част от характера на всяко яке." },
  { question: "Мога ли да прегледам якето при доставка?", answer: "Да. Изпращаме с опция за преглед и тест. Така можете да проверите модела и размера преди окончателното приемане." },
  { question: "Как се поддържа коженото яке?", answer: "Пазете го от продължителна влага и директна топлина. Съхранявайте го на широка закачалка и използвайте само продукти, предназначени за естествена кожа." },
  { question: "Какво е времето за доставка и връщане?", answer: "Обичайната доставка е между 1 и 3 работни дни. Имате 30 дни за връщане, ако якето е неносено и е запазено в първоначалния си вид." },
]

export default function Faq({ title = "Често задавани въпроси", questions = commonQuestions }: { title?: string; questions?: FaqItem[] }) {
  return <section className="faq-section" aria-labelledby="faq-title"><div className="faq-intro"><p className="eyebrow">Преди да поръчате</p><h2 id="faq-title">{title}</h2><p>Най-важното за размера, естествената кожа и доставката.</p></div><div className="faq-list">{questions.map((item,index)=><details key={item.question} open={index===0}><summary><span>{item.question}</span><i aria-hidden="true"/></summary><p>{item.answer}</p></details>)}</div></section>
}
