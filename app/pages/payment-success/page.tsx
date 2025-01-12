import Image from 'next/image'
import deliveryIcon from '@/app/assets/icons/delivery_pink.png'
import curryClubLogo from '@/app/assets/curry_club_logo_pink.png'
import { auth } from '@/app/api/auth/auth'

type SearchParams = Promise<{ amount: string }>

type PaymentSuccessProps = {
  searchParams: SearchParams
}

const PaymentSuccess = async ({ searchParams }: PaymentSuccessProps) => {
  const { amount } = await searchParams
  const paymentAmount = parseFloat(amount).toLocaleString('en-GB', {
    style: 'currency',
    currency: 'GBP',
  })
  const session = await auth()

  return (
    <section className="flex items-start justify-center w-full min-h-screen min-w-[320px] pb-20 bg-twLightGrey">
      <article className="flexCol md:rounded-3xl md:border-2 md:border-twPink p-8 md:mt-8">
        <Image src={deliveryIcon} width={150} height={125} alt="" />
        <h1 className="p-2 text-center text-3xl">ORDER CONFIRMED</h1>
        <p className="mt-5 text-xl text-center">
          The payment of <span className="font-bold">{paymentAmount} </span>has
          been successful
        </p>

        <p className="mt-5 text-xl">Your order number is:</p>
        {/* {confirmedOrderId ? (
          <p className="mb-10 bg-primaryPink p-3 text-base text-secondaryWhite md:text-xl">
            {confirmedOrderId}
          </p>
        ) : null} */}

        <p className="m-5 text-center text-xl">
          An email confirmation has been sent to {session?.user?.email}
        </p>

        <div className="relative min-h-[3.5rem] min-w-[15rem] md:min-h-[5rem] md:min-w-[20rem] lg:ml-6 ">
          <Image
            src={curryClubLogo}
            fill
            style={{ objectFit: 'contain' }}
            alt="Indian Platter"
            sizes="(max-width: 600px) 200px, 300px"
          />
        </div>
      </article>
    </section>
  )
}

export default PaymentSuccess
