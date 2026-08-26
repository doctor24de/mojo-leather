import type{Metadata}from"next";import"./globals.css";import"./mobile-fix.css";import StoreShell from"./components/StoreShell"
export const metadata:Metadata={title:"Mojo Leather — Кожа с характер",description:"Премиум кожени якета за жени и мъже, проектирани в София.",icons:{icon:"/favicon.svg"}}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="bg"><body><StoreShell>{children}</StoreShell></body></html>}
