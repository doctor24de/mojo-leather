export type Product = { slug:string; name:string; category:"Жени"|"Мъже"; color:string; price:number; badge?:string; image:string; description:string; material?:string; craftsmanship?:string }

export const formatPrice = (price:number) => `€${price}`
