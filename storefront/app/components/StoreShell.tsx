"use client"
import { useState, type ReactNode } from "react"

const tickerItems = ["Безплатна доставка над €250", "30 дни за връщане", "Над 20 години опит", "Над 20 000 доволни клиенти", "Естествена кожа · Малки серии"]

function TickerGroup({ hidden = false }: { hidden?: boolean }) {
  return <div className="announcement-group" aria-hidden={hidden || undefined}>{tickerItems.map(item => <span className="announcement-item" key={item}>{item}<i/></span>)}</div>
}

export default function StoreShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  return <>
    <div className="announcement"><div className="announcement-track"><TickerGroup/><TickerGroup hidden/></div></div>
    <header className="site-header">
      <button className="menu-button" aria-label="Отвори менюто" onClick={() => setMenuOpen(true)}><i/><i/></button>
      <a className="logo" href="/"><strong>FURIA</strong> <em>LEATHER</em></a>
      <nav aria-label="Основна навигация"><a href="/women">Жени</a><a href="/men">Мъже</a><a href="/#story">За нас</a><a href="/blog">Блог</a></nav>
      <div className="header-actions"><button aria-label="Търсене">Търси</button><button onClick={() => setCartOpen(true)}>Количка <sup>0</sup></button></div>
    </header>
    {children}
    <footer><div className="footer-grid"><div><a className="logo light" href="/"><strong>FURIA</strong> <em>LEATHER</em></a><p>Кожени якета в малки серии.<br/>София, България.</p></div><div><h3>Магазин</h3><a href="/women">Жени</a><a href="/men">Мъже</a><a href="/#shop">Нови модели</a></div><div><h3>Помощ</h3><a href="/blog">Доставка и връщане</a><a href="/blog">Размери</a><a href="/blog">Грижа за кожата</a></div><div><h3>Последвай ни</h3><a href="#">Instagram</a><a href="#">Pinterest</a><a href="#">TikTok</a></div></div><div className="copyright">© 2026 Furia Leather <span>BG / EUR</span></div></footer>
    <div className={`drawer-overlay ${menuOpen || cartOpen ? "open" : ""}`} onClick={() => { setMenuOpen(false); setCartOpen(false) }}/>
    <aside className={`drawer menu-drawer ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}><button className="drawer-close" onClick={() => setMenuOpen(false)} aria-label="Затвори">×</button><nav><a href="/women">Жени</a><a href="/men">Мъже</a><a href="/#story">За нас</a><a href="/blog">Блог</a></nav><p>София, България<br/>hello@furialeather.com</p></aside>
    <aside className={`drawer cart-drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen}><button className="drawer-close" onClick={() => setCartOpen(false)} aria-label="Затвори">×</button><h2>Твоята количка <sup>0</sup></h2><div className="empty-cart"><p>Количката ти очаква малко характер.</p><a className="button dark" href="/women">Разгледай якетата</a></div></aside>
  </>
}
