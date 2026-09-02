import type {ReactNode} from "react"

export const legalLinks=[
 ["Доставка и плащане","/delivery-payment"],
 ["Връщане и замяна","/returns-exchanges"],
 ["Общи условия","/terms"],
 ["Поверителност","/privacy"],
] as const

export default function LegalPage({eyebrow,title,intro,children}:{eyebrow:string;title:string;intro:string;children:ReactNode}){
 return <main className="legal-page"><header><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></header><div className="legal-layout"><aside aria-label="Правна информация">{legalLinks.map(([label,url])=><a href={url} key={url}>{label}</a>)}</aside><article className="legal-copy">{children}<section className="legal-contact"><h2>Контакт с Furia Leather</h2><p><strong>„Караиванов11“ ООД</strong><br/>Русе, ул. Александровска 24<br/><a href="tel:+359885235241">0885 235 241</a><br/><a href="mailto:office@furialeather.bg">office@furialeather.bg</a></p></section></article></div></main>
}
