import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrder from "app/orders/queries/getOrder"
import updateOrder from "app/orders/mutations/updateOrder"
import { OrderForm, FORM_ERROR } from "app/orders/components/OrderForm"
import { Property } from "csstype"
import Order = Property.Order

export const EditOrder = () => {
  const router = useRouter()
  const orderId = useParam("orderId", "string")
  const [order, { setQueryData }] = useQuery(
    getOrder,
    { id: orderId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateOrderMutation] = useMutation(updateOrder)

  return (
    <>
      <Head>
        <title>Edit Order {order.id}</title>
      </Head>

      <div>
        <h1>Edit Order {order.id}</h1>
        <pre>{JSON.stringify(order, null, 2)}</pre>

        <OrderForm
          submitText="Update Order"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateOrder}
          initialValues={order}
          onSubmit={async (values) => {
            try {
              const updated = await updateOrderMutation({
                id: order.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowOrderPage({ orderId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditOrderPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditOrder />
      </Suspense>

      <p>
        <Link href={Routes.OrdersPage()}>
          <a>Orders</a>
        </Link>
      </p>
    </div>
  )
}

EditOrderPage.authenticate = true
EditOrderPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditOrderPage
