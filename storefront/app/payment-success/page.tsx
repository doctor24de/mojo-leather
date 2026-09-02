export default function PaymentSuccess({ searchParams }: { searchParams?: { order?: string; status?: string } }) {
  const paid=searchParams?.status==="paid"
  return <main className="legal-page"><header><p className="eyebrow">{paid?"Плащането е потвърдено":"Плащането не е завършено"}</p><h1>{paid?"Благодарим за поръчката.":"Плащането не беше потвърдено."}</h1><p>{paid?`${searchParams?.order?`Поръчка №${searchParams.order}`:"Вашата поръчка"} е платена успешно и е отбелязана като платена в Medusa.`:"Картата не е таксувана. Свържете се с нас, ако имате нужда от помощ."}</p><a className="button dark" href="/">Към началната страница</a></header></main>
}
