import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrder from "app/orders/queries/getOrder"
import deleteOrder from "app/orders/mutations/deleteOrder"

export const Order = () => {
  const router = useRouter()
  const orderId = useParam("orderId", "string")
  const [deleteOrderMutation] = useMutation(deleteOrder)
  const [order] = useQuery(getOrder, { id: orderId })

  return (
    <>
      <Head>
        <title>Order {order.id}</title>
      </Head>

      <div>
        <h1>Order {order.id}</h1>
        <pre>{JSON.stringify(order, null, 2)}</pre>

        <Link href={Routes.EditOrderPage({ orderId: order.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteOrderMutation({ id: order.id })
              router.push(Routes.OrdersPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowOrderPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.OrdersPage()}>
          <a>Orders</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Order />
      </Suspense>
    </div>
  )
}

ShowOrderPage.authenticate = true
ShowOrderPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowOrderPage
