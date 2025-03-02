'use client'

import Image from 'next/image'
import infoIcon from '@/public/info.png'
import Link from 'next/link'
import { useCartContext } from '@/app/context/CartContext'

type FoodMenuItemProps = {
  id: string
  name: string
  price: number
  imageUrl: string
  slug: { current: string }
}

export const FoodMenuItem = ({
  id,
  name,
  price,
  imageUrl,
  slug,
}: FoodMenuItemProps) => {
  const { addToCart } = useCartContext()

  const onSelectMenuItem = () => {
    addToCart({ id, name, quantity: 1, price, imageUrl })
  }

  return (
    <article className="flex h-[130px] w-full md:max-w-[900px] items-center rounded-l-xl rounded-r-xl bg-twWhite">
      <div className="flex h-full w-8/12 flex-col justify-between p-3 pl-4">
        <p className="sm:text-base md:text-lg text-black leading-extra-tight">
          {name}
        </p>
        <p className="sm:text-base md:text-lg text-black leading-tight">
          {price.toLocaleString('en-GB', {
            style: 'currency',
            currency: 'GBP',
          })}
        </p>
        <div className="flex grow items-end">
          <button
            type="button"
            className="bg-twPink text-secondaryWhite px-2 py-1 cursor-pointer bottom-0 rounded text-white text-base active:bg-twPink/75"
            onClick={onSelectMenuItem}
          >
            Select
          </button>
        </div>
      </div>

      <div className="relative h-full sm:w-8/12 md:w-4/12 lg:w-4/12 max-w-[300px]">
        <Link
          className="absolute right-3 bottom-3 z-10 cursor-pointer rounded-lg bg-twPink p-1 text-center text-sm text-white"
          href={`/pages/foodmenu/${slug.current}`}
        >
          <Image src={infoIcon} width={25} height={25} alt="" />
        </Link>
        <Image
          src={imageUrl}
          alt={name}
          className="rounded-r-lg object-cover"
          fill
        />
      </div>
    </article>
  )
}
