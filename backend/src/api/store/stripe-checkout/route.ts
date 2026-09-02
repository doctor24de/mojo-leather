import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import Stripe from "stripe"

type CheckoutBody = { order_id?: string }

export async function POST(req: MedusaRequest<CheckoutBody>, res: MedusaResponse) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) throw new Error("Stripe is not configured")
  if (!req.body.order_id) throw new Error("Missing Medusa order ID")

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { data } = await query.graph({ entity: "order", filters: { id: req.body.order_id }, fields: ["id", "display_id", "email", "total", "currency_code"] })
  const order = data[0]
  if (!order) throw new Error("Medusa order was not found")

  const storefrontUrl = (process.env.STOREFRONT_URL || "https://mojo.doktor24.xyz").replace(/\/$/, "")
  const backendUrl = (process.env.MEDUSA_BACKEND_URL || "https://mojo-api.doktor24.xyz").replace(/\/$/, "")
  const stripe = new Stripe(secretKey)
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: order.email || undefined,
    line_items: [{ quantity: 1, price_data: { currency: String(order.currency_code || "eur").toLowerCase(), unit_amount: Math.round(Number(order.total) * 100), product_data: { name: `Furia Leather · Поръчка №${order.display_id}` } } }],
    metadata: { medusa_order_id: order.id, medusa_display_id: String(order.display_id) },
    payment_intent_data: { metadata: { medusa_order_id: order.id, medusa_display_id: String(order.display_id) } },
    success_url: `${backendUrl}/store/stripe-checkout/complete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${storefrontUrl}/?payment=cancelled`,
  })
  res.status(200).json({ url: session.url })
}
