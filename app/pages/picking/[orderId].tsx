import { BlitzPage, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import Layout from "../../core/layouts/Layout"
import createInvoice from "../../invoices/mutations/createInvoice"
import getOrder from "../../orders/queries/getOrder"
import { Button, Timeline } from "antd"
import orderPicked from "../../orders/mutations/orderPicked"
const { Item } = Timeline

const PickingPage: BlitzPage = () => {
  const router = useRouter()
  const orderId = useParam("orderId", "string")
  const [order] = useQuery(getOrder, { id: orderId }, {})
  const [pickOrder] = useMutation(orderPicked, {
    onSuccess: () => router.push(Routes.OrdersPage()),
  })

  return (
    <div style={{ padding: "1rem 3rem" }}>
      <h2> Picking order </h2>

      <Timeline style={{ marginTop: "2rem" }}>
        {order.products.map(({ quantity, product }) => (
          <Item key={product.id}>
            {" "}
            Get X{quantity}{" "}
            <strong>
              {" "}
              {product.brand} {product.model}{" "}
            </strong>{" "}
            from {product.location}{" "}
          </Item>
        ))}
      </Timeline>

      <Button type={"primary"} onClick={() => pickOrder({ id: order.id })}>
        {" "}
        Finish picking order{" "}
      </Button>
    </div>
  )
}

PickingPage.authenticate = true
PickingPage.getLayout = (page) => <Layout title={"Picking order"}>{page}</Layout>
export default PickingPage
