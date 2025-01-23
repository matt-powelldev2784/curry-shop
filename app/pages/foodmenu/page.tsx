import { type SanityDocument } from 'next-sanity'
import { sanityClient } from '@/app/sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { FoodMenuItem } from '@/app/components/foodMenu/foodMenuItem'
import Basket from '@/app/components/basket/Basket'
import MobileBasketFooter from '@/app/components/basket/MobileBasketFooter'

const MENU_ITEMS_QUERY = `*[_type == "menuItems"]{ _id, name, description, price,menuItemType, image, slug }`

const options = { next: { revalidate: 30 } }

const builder = imageUrlBuilder(sanityClient)
const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

const FoodMenuPage = async () => {
  const menuItems = await sanityClient.fetch<SanityDocument[]>(
    MENU_ITEMS_QUERY,
    {},
    options
  )

  const filterMenuItemsByType = (type: string) => {
    return menuItems.filter((menuItem) => menuItem.menuItemType === type)
  }
  const starters = filterMenuItemsByType('starters')
  const mains = filterMenuItemsByType('mains')
  const sides = filterMenuItemsByType('sides')
  const drinks = filterMenuItemsByType('drinks')

  return (
    <section className="flex items-start gap-24 w-full min-w-[320px] pb-20 bg-twLightGrey ">
      <div className="flexCol w-full min-w-[320px] lg:w-7/12 lg:ml-14 pb-20 bg-twLightGrey">
        <div className="flexCol w-full gap-y-2 sm:px-3 md:mx-8 mt-2">
          <h1 className="text-3xl font-bold translate-y-1 translate-x-1 text-black">
            Starters
          </h1>
          {starters.map((menuItem) => {
            const imageUrl = urlFor(menuItem.image)
              ?.width(550)
              .height(310)
              .url()
            menuItem.imageUrl = imageUrl

            return (
              <FoodMenuItem
                key={menuItem._id}
                id={menuItem._id}
                name={menuItem.name}
                price={menuItem.price}
                imageUrl={imageUrl}
                slug={menuItem.slug}
              />
            )
          })}
        </div>

        <div className="flexCol w-full gap-y-2 sm:px-3 md:mx-8 mt-2">
          <h1 className="text-3xl font-bold translate-y-1 text-black">Mains</h1>
          {mains.map((menuItem) => {
            const imageUrl = urlFor(menuItem.image)
              ?.width(550)
              .height(310)
              .url()
            menuItem.imageUrl = imageUrl

            return (
              <FoodMenuItem
                key={menuItem._id}
                id={menuItem._id}
                name={menuItem.name}
                price={menuItem.price}
                imageUrl={imageUrl}
                slug={menuItem.slug}
              />
            )
          })}
        </div>

        <div className="flexCol w-full gap-y-2 sm:px-3 md:mx-8 mt-2">
          <h1 className="text-3xl font-bold translate-y-1 text-black">Sides</h1>
          {sides.map((menuItem) => {
            const imageUrl = urlFor(menuItem.image)
              ?.width(550)
              .height(310)
              .url()
            menuItem.imageUrl = imageUrl

            return (
              <FoodMenuItem
                key={menuItem._id}
                id={menuItem._id}
                name={menuItem.name}
                price={menuItem.price}
                imageUrl={imageUrl}
                slug={menuItem.slug}
              />
            )
          })}
        </div>

        <div className="flexCol w-full gap-y-2 sm:px-3 md:mx-8 mt-2">
          <h1 className="text-3xl font-bold translate-y-1 text-black">
            Drinks
          </h1>
          {drinks.map((menuItem) => {
            const imageUrl = urlFor(menuItem.image)
              ?.width(550)
              .height(310)
              .url()
            menuItem.imageUrl = imageUrl

            return (
              <FoodMenuItem
                key={menuItem._id}
                id={menuItem._id}
                name={menuItem.name}
                price={menuItem.price}
                imageUrl={imageUrl}
                slug={menuItem.slug}
              />
            )
          })}
        </div>
      </div>

      {/* Basket is rendered for large screens only using css */}
      <div className="flex flex-col items-start lg:w-5/12 mt-6 mr-20 sm:hidden md:hidden lg:block">
        <Basket />
      </div>

      {/* Basket footer is rendered for small screens only using css */}
      <MobileBasketFooter />
    </section>
  )
}

export default FoodMenuPage
