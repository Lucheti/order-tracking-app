import { Suspense } from "react"
import { BlitzPage, Head, Link, Routes, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { OrderTable } from "../../orders/components/table/orderTable"
import classes from "./productPage.module.scss"
import { Button } from "antd"

const OrdersPage: BlitzPage = () => {
  const { push } = useRouter()

  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>

      <div className={classes.productPage}>
        <div className={classes.header}>
          <h2> Orders </h2>

          <Button
            type={"primary"}
            onClick={() => push(Routes.NewOrderPage(), undefined, { shallow: true })}
          >
            New Order
          </Button>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <OrderTable />
        </Suspense>
      </div>
    </>
  )
}

OrdersPage.authenticate = true
OrdersPage.getLayout = (page) => <Layout>{page}</Layout>

export default OrdersPage
