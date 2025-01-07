import { type SanityDocument } from 'next-sanity'
import { sanityClient } from '@/app/sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { FoodMenuItem } from '@/app/components/foodMenu/foodMenuItem'

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
    <section className="container mx-auto min-h-screen max-w-3xl min-w-[320px] mb-20">
      <div className="flex flex-col gap-y-2 sm:mx-2 md:mx-8 mt-2">
        <h1 className="text-3xl font-bold translate-y-1 translate-x-1">
          Starters
        </h1>
        {starters.map((menuItem) => {
          const imageUrl = urlFor(menuItem.image)?.width(550).height(310).url()
          menuItem.imageUrl = imageUrl

          return (
            <FoodMenuItem
              key={menuItem._id}
              name={menuItem.name}
              price={menuItem.price}
              imageUrl={imageUrl}
              slug={menuItem.slug}
            />
          )
        })}
      </div>

      <div className="flex flex-col gap-y-2 sm:mx-2 md:mx-8 mt-4">
        <h1 className="text-3xl font-bold translate-y-1">Mains</h1>
        {mains.map((menuItem) => {
          const imageUrl = urlFor(menuItem.image)?.width(550).height(310).url()
          menuItem.imageUrl = imageUrl

          return (
            <FoodMenuItem
              key={menuItem._id}
              name={menuItem.name}
              price={menuItem.price}
              imageUrl={imageUrl}
              slug={menuItem.slug}
            />
          )
        })}
      </div>

      <div className="flex flex-col gap-y-2 sm:mx-2 md:mx-8 mt-4">
        <h1 className="text-3xl font-bold translate-y-1">Sides</h1>
        {sides.map((menuItem) => {
          const imageUrl = urlFor(menuItem.image)?.width(550).height(310).url()
          menuItem.imageUrl = imageUrl

          return (
            <FoodMenuItem
              key={menuItem._id}
              name={menuItem.name}
              price={menuItem.price}
              imageUrl={imageUrl}
              slug={menuItem.slug}
            />
          )
        })}
      </div>

      <div className="flex flex-col gap-y-2 sm:mx-2 md:mx-8 mt-4">
        <h1 className="text-3xl font-bold translate-y-1">Drinks</h1>
        {drinks.map((menuItem) => {
          const imageUrl = urlFor(menuItem.image)?.width(550).height(310).url()
          menuItem.imageUrl = imageUrl

          return (
            <FoodMenuItem
              key={menuItem._id}
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
