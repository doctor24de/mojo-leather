export default function PaymentSuccess({ searchParams }: { searchParams?: { order?: string } }) {
  return <main className="legal-page"><header><p className="eyebrow">Плащането е прието</p><h1>Благодарим за поръчката.</h1><p>{searchParams?.order ? `Поръчка №${searchParams.order}` : "Вашата поръчка"} е платена успешно. Ще се свържем с вас при изпращането.</p><a className="button dark" href="/">Към началната страница</a></header></main>
}
