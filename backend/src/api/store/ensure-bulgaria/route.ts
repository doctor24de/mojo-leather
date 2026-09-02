import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ensureBulgariaCommerce } from "../../../loaders/ensure-bulgaria-commerce"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  await ensureBulgariaCommerce(req.scope)
  res.status(200).json({ country_code: "bg", ready: true })
}
