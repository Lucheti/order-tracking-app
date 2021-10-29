import { Suspense } from "react"
import { BlitzPage, Head, Link, Routes, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { ProductTable } from "../../products/components/table/productTable"
import classes from "./productPage.module.scss"
import { Button } from "antd"

const ProductsPage: BlitzPage = () => {
  const { push } = useRouter()
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <div className={classes.productPage}>
        <div className={classes.header}>
          <h2> Products </h2>

          <Button
            type={"primary"}
            onClick={() => push(Routes.NewProductPage(), undefined, { shallow: true })}
          >
            New Product
          </Button>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <ProductTable />
        </Suspense>
      </div>
    </>
  )
}

ProductsPage.authenticate = true
ProductsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ProductsPage
