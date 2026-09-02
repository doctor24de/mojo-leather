type FaqItem = { question: string; answer: string }

const commonQuestions: FaqItem[] = [
  { question: "Колебая се между два размера. Кой да взема?", answer: "Пишете ни с височина, тегло и гръдна обиколка. Ще премерим самото яке и ще ви кажем честно кой размер бихме изпратили на човек с вашите мерки." },
  { question: "Якето ще изглежда ли точно като на снимката?", answer: "Да, но естествената кожа никога не е напълно еднаква. Леките разлики в текстурата и оттенъка не са дефект — те правят конкретното яке ваше." },
  { question: "Мога ли да го пробвам, преди да платя?", answer: "Изпращаме всяка поръчка с преглед и тест. Пробвате спокойно при куриера и приемате само ако размерът и моделът са вашите." },
  { question: "Как да се грижа за кожата?", answer: "Не я сушете върху радиатор и не я затваряйте във влажна торба. Широка закачалка и подходящ крем за естествена кожа веднъж или два пъти годишно са напълно достатъчни." },
  { question: "А ако просто не е моето яке?", answer: "Няма драма. Имате 30 дни да го върнете неносено и в първоначалния му вид. Ако проблемът е размерът, първо ще ви помогнем с бърза замяна." },
]

export default function Faq({ title = "Често задавани въпроси", questions = commonQuestions }: { title?: string; questions?: FaqItem[] }) {
  return <section className="faq-section" aria-labelledby="faq-title"><div className="faq-intro"><p className="eyebrow">Питайте ни директно</p><h2 id="faq-title">{title}</h2><p>Това са въпросите, които чуваме най-често. Ако вашият го няма — пишете ни. Отговаря човек, не бот.</p><a href="mailto:hello@furialeather.com" className="text-link">hello@furialeather.com</a></div><div className="faq-list">{questions.map((item,index)=><details key={item.question} open={index===0}><summary><span>{item.question}</span><i aria-hidden="true"/></summary><p>{item.answer}</p></details>)}</div></section>
}
