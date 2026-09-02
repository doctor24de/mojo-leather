import { defineWidgetConfig } from "@medusajs/admin-sdk"
import type { AdminOrder, DetailWidgetProps } from "@medusajs/framework/types"
import { Container, Heading, Text } from "@medusajs/ui"

const OrderPaymentMethodWidget = ({
  data: order,
}: DetailWidgetProps<AdminOrder>) => {
  const metadata = (order.metadata ?? {}) as Record<string, unknown>
  const paymentMethod = String(metadata.payment_method ?? "")
  const stripeStatus = String(metadata.stripe_payment_status ?? "")
  const normalizedMethod = paymentMethod.toLocaleLowerCase("bg")
  const normalizedStatus = stripeStatus.toLocaleLowerCase("bg")

  const isCashOnDelivery = normalizedMethod.includes("наложен")
  const isCard =
    normalizedMethod.includes("карта") || normalizedMethod.includes("stripe")
  const isPaid = normalizedStatus.includes("платено")

  let title = "Не е зададен"
  let status = "Проверете метаданните на поръчката."
  let note = "Методът на плащане липсва за тази поръчка."
  let color = "#737373"

  if (isCashOnDelivery) {
    title = "Наложен платеж"
    status = "Плащане при получаване"
    note =
      "Поръчката може да бъде изпратена. Отбележете плащането като получено едва след потвърждение от куриера."
    color = "#b45309"
  } else if (isCard && isPaid) {
    title = "Плащане с карта · Stripe"
    status = "Платено онлайн"
    note = "Плащането е потвърдено от Stripe и поръчката е готова за обработка."
    color = "#15803d"
  } else if (isCard) {
    title = "Плащане с карта · Stripe"
    status = "Очаква плащане"
    note =
      "Не изпращайте поръчката, докато плащането не бъде потвърдено като платено."
    color = "#b91c1c"
  }

  return (
    <Container className="divide-y p-0">
      <div className="px-6 py-4">
        <Heading level="h2">Начин на плащане</Heading>
      </div>
      <div className="px-6 py-5">
        <div className="flex items-start gap-x-3">
          <span
            aria-hidden="true"
            className="mt-1.5 block h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: color }}
          />
          <div>
            <Text size="small" weight="plus">
              {title}
            </Text>
            <Text size="small" className="text-ui-fg-subtle">
              {status}
            </Text>
          </div>
        </div>
        <Text size="small" className="mt-4 text-ui-fg-subtle">
          {note}
        </Text>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.side",
})

export default OrderPaymentMethodWidget
