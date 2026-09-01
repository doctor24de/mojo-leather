"use client"
import {createContext,useCallback,useContext,useEffect,useMemo,useState,type ReactNode} from "react"
import {addCartLine,createCart,deleteCartLine,loginCustomer,registerCustomer,retrieveCart,retrieveCustomer,retrieveCustomerOrders,updateCartLine,type Cart,type Customer,type CustomerOrder} from "../lib/medusa"

type CommerceContextValue={cart:Cart|null;cartCount:number;cartBusy:boolean;customer:Customer|null;orders:CustomerOrder[];authBusy:boolean;addItem:(variantId:string)=>Promise<void>;updateItem:(lineId:string,quantity:number)=>Promise<void>;removeItem:(lineId:string)=>Promise<void>;login:(email:string,password:string)=>Promise<void>;register:(input:{email:string;password:string;first_name:string;last_name:string})=>Promise<void>;logout:()=>void;setAuthToken:(token:string)=>Promise<void>;openCart:()=>void;cartOpen:boolean;setCartOpen:(open:boolean)=>void}
const CommerceContext=createContext<CommerceContextValue|null>(null)
const CART_KEY="furia_cart_id",TOKEN_KEY="furia_customer_token"

export function CommerceProvider({children}:{children:ReactNode}){
 const[cart,setCart]=useState<Cart|null>(null),[cartBusy,setCartBusy]=useState(false),[cartOpen,setCartOpen]=useState(false)
 const[customer,setCustomer]=useState<Customer|null>(null),[orders,setOrders]=useState<CustomerOrder[]>([]),[authBusy,setAuthBusy]=useState(true)
 useEffect(()=>{const id=localStorage.getItem(CART_KEY);if(id)retrieveCart(id).then(setCart).catch(()=>localStorage.removeItem(CART_KEY));const token=localStorage.getItem(TOKEN_KEY);if(token)Promise.all([retrieveCustomer(token),retrieveCustomerOrders(token)]).then(([c,o])=>{setCustomer(c);setOrders(o)}).catch(()=>localStorage.removeItem(TOKEN_KEY)).finally(()=>setAuthBusy(false));else setAuthBusy(false)},[])
 const ensureCart=useCallback(async()=>{if(cart)return cart;const next=await createCart();localStorage.setItem(CART_KEY,next.id);setCart(next);return next},[cart])
 const addItem=useCallback(async(variantId:string)=>{setCartBusy(true);try{const current=await ensureCart();const next=await addCartLine(current.id,variantId);setCart(next);setCartOpen(true)}finally{setCartBusy(false)}},[ensureCart])
 const removeItem=useCallback(async(lineId:string)=>{if(!cart)return;setCartBusy(true);try{setCart(await deleteCartLine(cart.id,lineId))}finally{setCartBusy(false)}},[cart])
 const updateItem=useCallback(async(lineId:string,quantity:number)=>{if(!cart)return;if(quantity<1){await removeItem(lineId);return}setCartBusy(true);try{setCart(await updateCartLine(cart.id,lineId,quantity))}finally{setCartBusy(false)}},[cart,removeItem])
 const setAuthToken=useCallback(async(token:string)=>{localStorage.setItem(TOKEN_KEY,token);const[c,o]=await Promise.all([retrieveCustomer(token),retrieveCustomerOrders(token)]);setCustomer(c);setOrders(o)},[])
 const login=useCallback(async(email:string,password:string)=>setAuthToken(await loginCustomer(email,password)),[setAuthToken])
 const register=useCallback(async(input:{email:string;password:string;first_name:string;last_name:string})=>setAuthToken(await registerCustomer(input)),[setAuthToken])
 const logout=useCallback(()=>{localStorage.removeItem(TOKEN_KEY);setCustomer(null);setOrders([])},[])
 const value=useMemo(()=>({cart,cartCount:(cart?.items||[]).reduce((n,i)=>n+i.quantity,0),cartBusy,customer,orders,authBusy,addItem,updateItem,removeItem,login,register,logout,setAuthToken,openCart:()=>setCartOpen(true),cartOpen,setCartOpen}),[cart,cartBusy,customer,orders,authBusy,addItem,updateItem,removeItem,login,register,logout,setAuthToken,cartOpen])
 return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>
}
export function useCommerce(){const value=useContext(CommerceContext);if(!value)throw new Error("useCommerce must be used inside CommerceProvider");return value}
