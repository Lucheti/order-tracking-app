import { BlitzPage, Routes, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { OrderTable } from "../../orders/components/table/orderTable"
import { EntityPage } from "../../core/components/entityPage/EntityPage"

const OrdersPage: BlitzPage = () => {
  const { push } = useRouter()

  return (
    <EntityPage name={"Order"} route={Routes.NewOrderPage()}>
      <OrderTable />
    </EntityPage>
  )
}

OrdersPage.authenticate = true
OrdersPage.getLayout = (page) => <Layout>{page}</Layout>

export default OrdersPage
