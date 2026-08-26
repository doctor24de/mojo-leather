export type Product = { slug:string; name:string; category:"Жени"|"Мъже"; color:string; price:number; badge?:string; image:string; description:string; material?:string; craftsmanship?:string }

export const products: Product[] = [
 {slug:"aviator-no-07",name:"Авиатор No. 07",category:"Мъже",color:"Еспресо",price:395,badge:"Ново",image:"https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1200&q=90",description:"Класически авиаторски силует от мека агнешка кожа, създаден за движение и характер."},
 {slug:"biker-rue",name:"Байкър Rue",category:"Жени",color:"Полунощ",price:365,badge:"Бестселър",image:"https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&w=1200&q=90",description:"Изчистено байкър яке с мека конструкция, фини метални детайли и уверен силует."},
 {slug:"racer-mercer",name:"Рейсър Mercer",category:"Мъже",color:"Черно",price:345,image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=90",description:"Минималистично рейсър яке с висока яка и прецизна кройка от пълнозърнеста кожа."},
 {slug:"blazer-elara",name:"Блейзър Elara",category:"Жени",color:"Бордо",price:420,badge:"Лимитирано",image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=90",description:"Модерен кожен блейзър с издължена линия и наситен цвят, произведен в малка серия."},
]
export const formatPrice = (price:number) => `€${price}`
