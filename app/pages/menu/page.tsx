import Link from 'next/link'
import { type SanityDocument } from 'next-sanity'
import { sanityClient } from '@/app/sanity/client'

const MENU_ITEMS_QUERY = `*[_type == "menuItems"]{ _id, name, description, price,menuItemType, image, slug }`

const options = { next: { revalidate: 30 } }

export const Menu = async () => {
  const menuItems = await sanityClient.fetch<SanityDocument[]>(
    MENU_ITEMS_QUERY,
    {},
    options
  )

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Menu Items</h1>
      <ul className="flex flex-col gap-y-4">
        {menuItems.map((menuItem) => (
          <li className="hover:underline" key={menuItem._id}>
            <Link href={`/pages/menu/${menuItem.slug.current}`}>
              <h2 className="text-xl font-semibold">{menuItem.name}</h2>
              <p>
                {menuItem.price.toLocaleString('en-GB', {
                  style: 'currency',
                  currency: 'GBP',
                })}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Menu
