import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { capturePaymentWorkflow } from "@medusajs/core-flows"
import Stripe from "stripe"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const storefrontUrl = (process.env.STOREFRONT_URL || "https://mojo.doktor24.xyz").replace(/\/$/, "")
  const secretKey = process.env.STRIPE_SECRET_KEY
  const sessionId = String(req.query.session_id || "")
  if (!secretKey || !sessionId) return res.redirect(`${storefrontUrl}/payment-success?status=failed`)

  const stripe = new Stripe(secretKey)
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  const orderId = session.metadata?.medusa_order_id
  if (session.payment_status !== "paid" || !orderId) return res.redirect(`${storefrontUrl}/payment-success?status=failed`)

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { data } = await query.graph({
    entity: "order",
    filters: { id: orderId },
    fields: ["id", "display_id", "metadata", "payment_collections.payments.id", "payment_collections.payments.captures.id"],
  })
  const order = data[0]
  if (!order) return res.redirect(`${storefrontUrl}/payment-success?status=failed`)

  for (const collection of order.payment_collections || []) {
    if (!collection) continue
    for (const payment of collection.payments || []) {
      if (!payment) continue
      if (!payment.captures?.length) await capturePaymentWorkflow(req.scope).run({ input: { payment_id: payment.id } })
    }
  }

  const orderService = req.scope.resolve(Modules.ORDER)
  await orderService.updateOrders(order.id, {
    metadata: { ...(order.metadata || {}), payment_method: "Stripe · карта", stripe_payment_status: "Платено", stripe_session_id: session.id },
  })
  res.redirect(`${storefrontUrl}/payment-success?status=paid&order=${encodeURIComponent(String(order.display_id))}`)
}
