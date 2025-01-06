'use client'

import Image from 'next/image'
import infoIcon from '@/public/info.png'
import Link from 'next/link'

type FoodMenuItemProps = {
  name: string
  price: number
  menuItemType: string
  imageUrl: string
  slug: { current: string }
}

export const FoodMenuItem = ({
  imageUrl,
  name,
  menuItemType,
  price,
  slug,
}: FoodMenuItemProps) => {
  console.log('slug', slug.current)

  return (
    <article className="flex sm:mx-2 md:mx-8 h-[130px] items-center rounded-l-xl rounded-r-xl border-2 border-black/25 bg-secondaryWhite">
      <div className="flex h-full w-8/12 flex-col justify-between p-3">
        <p className="sm:text-base md:text-lg">{name}</p>
        <p className="md:text-md">
          {price.toLocaleString('en-GB', {
            style: 'currency',
            currency: 'GBP',
          })}
        </p>
        <div className="flex grow items-end">
          <button
            type="button"
            className="bg-twPink text-secondaryWhite px-2 py-1 cursor-pointer bottom-0 rounded text-white text-base"
            onClick={() => {}}
          >
            Select
          </button>
        </div>
      </div>

      <div className="relative h-full sm:w-8/12 md:w-4/12 ">
        <Link
          className="absolute right-2 bottom-2 z-10 cursor-pointer rounded-lg bg-twPink p-1 text-center text-sm text-white"
          href={`/pages/menu/${slug.current}`}
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
