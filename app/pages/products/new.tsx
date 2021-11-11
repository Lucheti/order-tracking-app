import { BlitzPage, Routes, useMutation, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import createProduct, { CreateProduct } from "app/products/mutations/createProduct"
import { ProductForm } from "app/products/components/ProductForm"
import classes from "./productPage.module.scss"
import { message } from "antd"

const NewProductPage: BlitzPage = () => {
  const router = useRouter()
  const [createProductMutation] = useMutation(createProduct)

  return (
    <div className={classes.newProductPage}>
      <div className={classes.header}>
        <h2>New Product</h2>
      </div>

      <ProductForm
        submitText="Create Product"
        schema={CreateProduct}
        onSubmit={async (values) => {
          try {
            const product = await createProductMutation(values)
            router.push(Routes.ShowProductPage({ productId: product.id }))
          } catch (error: any) {
            console.error(error)
            message.error(error.toString())
          }
        }}
      />
    </div>
  )
}

NewProductPage.authenticate = true
NewProductPage.getLayout = (page) => <Layout title={"Create New Product"}>{page}</Layout>

export default NewProductPage
