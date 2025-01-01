import { type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { sanityClient } from '@/app/sanity/client'
import Link from 'next/link'
import Image from 'next/image'

const MENU_ITEM_QUERY = `*[_type == "menuItems" && slug.current == $slug][0]`

const builder = imageUrlBuilder(sanityClient)
const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

const options = { next: { revalidate: 30 } }

type MenuItemParams = { params: Promise<{ slug: string }> }

const MenuItem = async (props: MenuItemParams) => {
  const params = await props.params

  const menuItem = await sanityClient.fetch<SanityDocument>(
    MENU_ITEM_QUERY,
    params,
    options
  )

  const menuItemImageUrl = urlFor(menuItem.image)?.width(550).height(310).url()

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/pages/menu/" className="hover:underline">
        ← Back to menu
      </Link>
      {menuItemImageUrl && (
        <Image
          src={menuItemImageUrl}
          alt={menuItem.name}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{menuItem.title}</h1>
      <div className="prose">
        <p>{menuItem.description}</p>
      </div>
    </main>
  )
}

export default MenuItem
