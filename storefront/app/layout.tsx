import type{Metadata}from"next";import"./globals.css";import"./mobile-fix.css";import StoreShell from"./components/StoreShell"
export const metadata:Metadata={title:"Furia Leather — Кожени якета в малки серии",description:"Кожени якета за жени и мъже, създадени в малки серии и направени да остаряват красиво.",icons:{icon:"/favicon-furia.svg"}}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="bg"><body><StoreShell>{children}</StoreShell></body></html>}
