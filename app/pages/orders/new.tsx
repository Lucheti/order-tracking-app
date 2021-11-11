import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createOrder, { CreateOrder } from "app/orders/mutations/createOrder"
import { OrderForm } from "app/orders/components/OrderForm"
import classes from "./orderPage.module.scss"
import { message } from "antd"

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
        initialValues={{}}
        schema={CreateOrder}
        onSubmit={async (values) => {
          try {
            const order = await createOrderMutation(values)
            router.push(Routes.ShowOrderPage({ orderId: order.id }))
          } catch (error: any) {
            console.error(error)
            message.error("Error creating order")
          }
        }}
      />
    </div>
  )
}

NewOrderPage.authenticate = true
NewOrderPage.suppressFirstRenderFlicker = true
NewOrderPage.getLayout = (page) => <Layout title={"Create New Order"}>{page}</Layout>

export default NewOrderPage
