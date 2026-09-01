import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

type PasswordResetEvent = {
  entity_id: string
  token: string
  actor_type: string
}

export default async function passwordResetHandler({
  event: { data },
  container,
}: SubscriberArgs<PasswordResetEvent>) {
  if (data.actor_type !== "customer") return

  const notificationService = container.resolve(Modules.NOTIFICATION)
  const storefrontUrl = process.env.STOREFRONT_URL || "http://localhost:3000"
  const resetUrl = new URL("/account/reset-password", storefrontUrl)
  resetUrl.searchParams.set("token", data.token)
  resetUrl.searchParams.set("email", data.entity_id)

  await notificationService.createNotifications({
    to: data.entity_id,
    channel: "email",
    template: "password-reset",
    data: {
      reset_url: resetUrl.toString(),
    },
  })
}

export const config: SubscriberConfig = {
  event: "auth.password_reset",
}
