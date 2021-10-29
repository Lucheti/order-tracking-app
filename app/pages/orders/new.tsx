import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createOrder, { CreateOrder } from "app/orders/mutations/createOrder"
import { OrderForm, FORM_ERROR } from "app/orders/components/OrderForm"
import classes from "./orderPage.module.scss"

const NewOrderPage: BlitzPage = () => {
  const router = useRouter()
  const [createOrderMutation] = useMutation(createOrder)

  return (
    <div className={classes.newOrderPage}>
      <div className={classes.header}>
        <h2>New Order</h2>
      </div>

      <OrderForm
        submitText="Create Order"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={CreateOrder}
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            const order = await createOrderMutation(values)
            router.push(Routes.ShowOrderPage({ orderId: order.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </div>
  )
}

NewOrderPage.authenticate = true
NewOrderPage.getLayout = (page) => <Layout title={"Create New Order"}>{page}</Layout>

export default NewOrderPage
