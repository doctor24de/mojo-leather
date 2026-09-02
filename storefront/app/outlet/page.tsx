import Faq from "../components/Faq"
import ProductGrid from "../components/ProductGrid"

export default function Outlet(){return <main className="outlet-page"><header><p className="eyebrow">Furia Outlet</p><h1>Последни бройки.<br/><em>Без втори шанс.</em></h1><p>Тук остават мострите, последните размери и моделите, които няма да заредим отново. Всяко яке е прегледано от нас и състоянието му е описано ясно.</p></header><section className="outlet-products"><div><p className="eyebrow">Налични сега</p><h2>Единични находки</h2></div><ProductGrid outlet/></section><Faq title="Преди да вземете последната бройка"/></main>}
