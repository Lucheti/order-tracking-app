import { Suspense } from "react"
import {
  Head,
  Link,
  useRouter,
  useQuery,
  useMutation,
  useParam,
  BlitzPage,
  Routes,
  invalidateQuery,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrder from "app/orders/queries/getOrder"
import updateOrder from "app/orders/mutations/updateOrder"
import { OrderForm } from "app/orders/components/OrderForm"

export const EditOrder = () => {
  const router = useRouter()
  const orderId = useParam("orderId", "string")
  const [order] = useQuery(
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

        <OrderForm
          submitText="Update Order"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateOrder}
          initialValues={{
            ...order,
            products: order.products.map((product) => product.productId),
          }}
          onSubmit={async (values) => {
            try {
              const updated = await updateOrderMutation({
                id: order.id,
                ...values,
              })
              invalidateQuery(getOrder)
              router.push(Routes.ShowOrderPage({ orderId: updated.id }))
            } catch (error: any) {
              console.error(error)
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
    </div>
  )
}

EditOrderPage.authenticate = true
EditOrderPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditOrderPage
