type PaymentSearchParams = { order?: string; status?: string }

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams?: Promise<PaymentSearchParams> | PaymentSearchParams
}) {
  const params = await Promise.resolve(searchParams ?? {})
  const paid = params.status === "paid"

  return <main className="legal-page"><header><p className="eyebrow">{paid?"Плащането е потвърдено":"Плащането не е завършено"}</p><h1>{paid?"Благодарим за поръчката.":"Плащането не беше потвърдено."}</h1><p>{paid?`${params.order?`Поръчка №${params.order}`:"Вашата поръчка"} е платена успешно. Ще се свържем с вас при изпращането.`:"Картата не е таксувана. Свържете се с нас, ако имате нужда от помощ."}</p><a className="button dark" href="/">Към началната страница</a></header></main>
}
