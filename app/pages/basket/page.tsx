import Basket from '@/app/components/basket/Basket'

const BasketPage = () => {
  return (
    <section className="flex items-start justify-center w-full min-h-screen min-w-[320px] pb-20 bg-twLightGrey">
      <Basket basketTitle="Checkout" onConfirmOrderRoute="/" />
    </section>
  )
}

export default BasketPage
