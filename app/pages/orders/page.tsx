import { auth } from '@/auth'
import prisma from '@/prisma/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const getOrders = async (
  userId: string,
  skip: number = 0,
  take: number = 5
) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderItems: true,
      },
      skip,
      take,
      orderBy: {
        userFriendlyId: 'desc',
      },
    })

    if (!orders) {
      redirect('/pages/error')
    }

    return orders
  } catch (error) {
    console.error('Internal Error:', error)
    redirect('/pages/error')
  }
}

type SearchParams = { page: string }

type OrderListProps = {
  searchParams: SearchParams
}

const OrdersList = async ({ searchParams }: OrderListProps) => {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/pages/login')
  }

  const userId = session.user.id
  const page = parseInt(searchParams.page || '0', 10)
  const orders = await getOrders(userId, page * 5, 5)

  return (
    <section className="flex items-start justify-center w-full min-h-screen min-w-[320px] pb-20 bg-twLightGrey">
      <article className="flexCol md:rounded-3xl md:border-2 md:border-twPink p-8 md:mt-8">
        <h1 className="p-2 text-center text-3xl text-twBlack">Orders</h1>

        <ul className="mt-5 text-xl text-center text-twBlack">
          {orders.map((order) => (
            <li key={order.id} className="mb-4 flex justify-between">
              <span className="font-bold">
                Order ID: {order.userFriendlyId}
              </span>
              <span>Total Price: {order.totalPrice.toFixed(2)}</span>
              <span>
                Created At: {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-4">
          {page > 0 && (
            <Link
              href={`/pages/orders?page=${page - 1}`}
              className="bg-twBlack text-white p-2 rounded"
            >
              Previous
            </Link>
          )}

          {orders.length === 5 && (
            <Link
              href={`/pages/orders?page=${page + 1}`}
              className="bg-twBlack text-white p-2 rounded"
            >
              Next
            </Link>
          )}
        </div>
      </article>
    </section>
  )
}

export default OrdersList
