import { type SanityDocument } from 'next-sanity'
import { sanityClient } from '@/app/sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { FoodMenuItem } from '@/app/components/foodMenu/foodMenuItem'
import Link from 'next/link'

const MENU_ITEMS_QUERY = `*[_type == "menuItems"]{ _id, name, description, price,menuItemType, image, slug }`

const options = { next: { revalidate: 30 } }

const builder = imageUrlBuilder(sanityClient)
const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

const Menu = async () => {
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
    <section className="flexCol w-full min-w-[320px] pb-20 bg-twLightGrey">
      <Link
        className="h-[40px] min-w-[200px] md:min-w-[300px] w-10/12 text-white bg-twPink my-5"
        href={'/pages/confirm-order'}
      >
        Confirm order
      </Link>

      <div className="flexCol w-full gap-y-2 sm:px-3 md:mx-8 mt-2">
        <h1 className="text-3xl font-bold translate-y-1 translate-x-1">
          Starters
        </h1>
        {starters.map((menuItem) => {
          const imageUrl = urlFor(menuItem.image)?.width(550).height(310).url()
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
        <h1 className="text-3xl font-bold translate-y-1">Mains</h1>
        {mains.map((menuItem) => {
          const imageUrl = urlFor(menuItem.image)?.width(550).height(310).url()
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
        <h1 className="text-3xl font-bold translate-y-1">Sides</h1>
        {sides.map((menuItem) => {
          const imageUrl = urlFor(menuItem.image)?.width(550).height(310).url()
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
        <h1 className="text-3xl font-bold translate-y-1">Drinks</h1>
        {drinks.map((menuItem) => {
          const imageUrl = urlFor(menuItem.image)?.width(550).height(310).url()
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
    </section>
  )
}

export default Menu
