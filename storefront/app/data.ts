export type Product = { slug:string; name:string; category:"Жени"|"Мъже"; color:string; price:number; badge?:string; image:string; description:string; material?:string; craftsmanship?:string; lining?:string; fit?:string; fastening?:string; pockets?:string; origin?:string; modelHeight?:string; modelSize?:string }

export const formatPrice = (price:number) => `€${price}`
