import { type SanityDocument } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { sanityClient } from '@/app/sanity/client'
import Image from 'next/image'
import Link from 'next/link'

const MENU_ITEM_QUERY = `*[_type == "menuItems" && slug.current == $slug][0]`

const builder = imageUrlBuilder(sanityClient)
const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

const options = { next: { revalidate: 30 } }

type MenuItemParams = { params: Promise<{ slug: string }> }

const MenuItem = async ({ params }: MenuItemParams) => {
  const slug = await params

  const menuItem = await sanityClient.fetch<SanityDocument>(
    MENU_ITEM_QUERY,
    slug,
    options
  )

  const menuItemImageUrl = urlFor(menuItem.image)?.width(550).height(310).url()

  return (
    <section className="w-full min-h-screen flex flex-col items-center bg-twLightGrey">
      <article className="w-full max-w-3xl flexCol mt-8 sm:px-4">
        {menuItemImageUrl && (
          <Image
            src={menuItemImageUrl}
            alt={menuItem.name}
            className="aspect-video rounded-xl"
            width="550"
            height="310"
          />
        )}

        <div className="max-w-[550px] mt-2">
          <h1 className="text-4xl font-bold text-center text-twBlack">
            {menuItem.name}
          </h1>
          <p className="text-center text-twBlack">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>

        <Link
          className="h-[40px] w-[300px] text-white bg-twPink my-5 flexCol rounded-lg active:bg-black/75"
          href="/pages/foodmenu"
        >
          Back to Food Menu
        </Link>
      </article>
    </section>
  )
}

export default MenuItem
