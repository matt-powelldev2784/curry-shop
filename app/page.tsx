import Link from 'next/link'
import curryRiceImage from '@/app/assets/foodImages/curry_rice_bg.jpg'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="relative w-screen min-w-[280px]">
      <div className="absolute w-screen h-full z-0 ">
        <Image
          src={curryRiceImage}
          fill
          style={{ objectFit: 'cover' }}
          alt="Curry and Rice on a table"
          quality={80}
        />
      </div>

      <article className="relative min-h-[550px] md:min-h[650px] lg:min-h-[800px] h-screen lg:w-1/2 flex flex-col items-center lg:items-start justify-center lg:ml-16">
        <div className="w-5/6 text-center lg:text-left ">
          <h1 className="text-3xl md:text-4xl font-black text-twWhite mb-3 md:mb-5 ">
            London&apos;s Luxurious Curry Club
          </h1>
          <p className="text-lg md:text-xl leading-tight md:leading-normal text-justify text-twWhite">
            Indulge in authentic, exquisite flavours at our luxurious Curry Club
            takeaway in London. Our expert chefs use only the freshest
            ingredients and traditional cooking methods to create a menu of
            classic and adventurous dishes that will transport you straight to
            India. Place your order now and experience the ultimate luxury
            takeaway.
          </p>
        </div>

        <Link
          className="bg-twPink text-xl rounded-lg p-4 mt-10 text-twWhite active:bg-twPink/75"
          href={'/pages/foodmenu'}
        >
          View Food Menu
        </Link>
      </article>
    </main>
  )
}
