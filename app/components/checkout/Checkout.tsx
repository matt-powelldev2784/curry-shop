'use client'

import React, { useEffect, useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { convertToSubCurrency } from '@/app/lib/convertToSubCurrency'
import cardIcon from '../../assets/icons/payment_pink.png'
import Image from 'next/image'

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [amount])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    if (!stripe || !elements) {
      return
    }

    const { error: submitError } = await elements.submit()

    if (submitError) {
      setErrorMessage(submitError.message)
      setLoading(false)
      return
    }

    const domain = process.env.NEXT_PUBLIC_DOMAIN

    console.log('domain', domain)

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${domain}/pages/payment-success?amount=${amount}`,
      },
    })

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message)
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false)
  }

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flexCol md:rounded-3xl md:border-2 md:border-twPink p-8 md:mt-8"
    >
      <div className="flex flex-col items-center justify-center p-4">
        <Image src={cardIcon} width={75} height={75} alt="Card icon" />
        <h1 className="p-2 text-3xl text-black">{'Payment'}</h1>
      </div>

      <div className="mb-4 w-full max-w-[280px] text-justify text-sm text-twPink">
        This is a dummy payment page. Please use card number 4242 4242 4242 4242
        with any future expiry date and any CVC number.
      </div>

      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="h-[40px] w-[300px] text-white bg-twBlack my-5"
      >
        {!loading ? `Pay $${amount}` : 'Processing...'}
      </button>
    </form>
  )
}

export default CheckoutPage
