import { auth } from '@/auth'
import prisma from '@/prisma/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ordersIcon from '@/app/assets/icons/orders_pink.png'

type GetOrder = { userId: string; skip: number; take: number }

const getOrders = async ({ userId, skip = 0, take = 5 }: GetOrder) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
        orderConfirmed: true,
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

const getTotalOrdersCount = async (userId: string) => {
  try {
    const count = await prisma.order.count({
      where: {
        userId,
        orderConfirmed: true,
      },
    })

    if (!count) {
      redirect('/pages/error')
    }

    return count
  } catch (error) {
    console.error('Internal Error:', error)
    redirect('/pages/error')
  }
}

type SearchParams = Promise<{ page: string }>

type OrderListProps = {
  searchParams: SearchParams
}

const OrdersList = async ({ searchParams }: OrderListProps) => {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/pages/login')
  }

  const userId = session.user.id
  const queryParams = await searchParams
  const page = parseInt(queryParams.page || '0', 10)
  const orders = await getOrders({ userId, skip: page * 5, take: 5 })

  const totalOrdersCount = await getTotalOrdersCount(userId)
  const isLastPageOfOrders = totalOrdersCount < (page + 1) * 5

  return (
    <section className="flex items-start justify-center w-full min-h-screen min-w-[320px] pb-20 bg-twLightGrey">
      <article className="flexCol md:rounded-3xl md:border-2 md:border-twPink sm:p-2 sm:w-full md:w-[800px] md:p-8 sm:mt-6 md:mt-8">
        <Image src={ordersIcon} width={75} height={75} alt="" />
        <h1 className="p-2 text-3xl text-black">Order History</h1>

        <ul className="mt-5 flexCol text-twBlack w-full max-w-[800px]">
          {orders.map((order) => {
            const totalPrice = Number(order.totalPrice)

            return (
              <li
                className="mb-2 flex justify-between items-center bg-twPink rounded-lg p-1 sm:w-full md:w-[700px]"
                key={order.id}
              >
                <div className="flex flex-col items-start justify-start w-full sm:ml-2 md:ml-4">
                  <p className="text-twWhite flex flex-row gap-1">
                    <span className="text-twWhite sm:hidden md:block">
                      Order date:
                    </span>

                    <span className="font-bold text-twWhite sm:font-normal md:font-bold">
                      {new Date(order.createdAt).toLocaleDateString('en-GB')}
                    </span>
                  </p>

                  <p className="text-twWhite flex flex-row gap-1">
                    <span className="text-twWhite sm:hidden md:block">
                      Total Price:
                    </span>
                    <span className="font-bold text-twWhite">
                      {totalPrice.toLocaleString('en-GB', {
                        style: 'currency',
                        currency: 'GBP',
                      })}
                    </span>
                  </p>
                </div>

                <Link
                  href={`/pages/orders/${order.id}`}
                  className="text-twWhite p-2 sm:mr-2 md:mr-4 w-48 h-full text-center bg-twBlack rounded leading-tight"
                >
                  View Order
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex justify-between mt-4 gap-2">
          {page > 0 && (
            <Link
              href={`/pages/orders?page=${page - 1}`}
              className="bg-twBlack text-white p-2 rounded"
            >
              {'<'} Newer Orders
            </Link>
          )}

          {!isLastPageOfOrders && (
            <Link
              href={`/pages/orders?page=${page + 1}`}
              className="bg-twBlack text-white p-2 rounded"
            >
              Older Orders {'>'}
            </Link>
          )}
        </div>
      </article>
    </section>
  )
}

export default OrdersList
