import { BlitzPage, Routes, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { ProductTable } from "../../products/components/table/productTable"
import { EntityPage } from "../../core/components/entityPage/EntityPage"

const ProductsPage: BlitzPage = () => {
  return (
    <EntityPage name={"Product"} route={Routes.NewProductPage()}>
      <ProductTable />
    </EntityPage>
  )
}

ProductsPage.authenticate = true
ProductsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ProductsPage
