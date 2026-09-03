import type { Metadata } from "next"
import { cache } from "react"
import ProductDetail from "../../components/ProductDetail"
import { formatPrice } from "../../data"
import { getMedusaProduct } from "../../lib/medusa"

const getProduct=cache((slug:string)=>getMedusaProduct(slug))

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params
  const product=await getProduct(slug).catch(()=>null)
  if(!product)return{title:"Продукт | Furia Leather"}
  const title=`${product.name} | Furia Leather`
  const description=`${product.description} Цена ${formatPrice(product.price)}. Доставка с Еконт, преглед и тест.`
  const url=`https://furialeather.bg/product/${product.slug}`
  return{title,description,alternates:{canonical:url},openGraph:{title,description,url,type:"website",images:[{url:product.image,alt:product.name}]},twitter:{card:"summary_large_image",title,description,images:[product.image]}}
}

export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const product=await getProduct(slug).catch(()=>null);return <ProductDetail slug={slug} initialProduct={product}/>}
