import { BlitzPage, Link, Routes, useMutation, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import createProduct, { CreateProduct } from "app/products/mutations/createProduct"
import { FORM_ERROR, ProductForm } from "app/products/components/ProductForm"
import classes from "./productPage.module.scss"
import { CaretLeftOutlined } from "@ant-design/icons"
import { Button } from "antd"

const NewProductPage: BlitzPage = () => {
  const router = useRouter()
  const [createProductMutation] = useMutation(createProduct)
  const goBack = () => router.back()

  return (
    <div className={classes.newProductPage}>
      <div className={classes.header}>
        <CaretLeftOutlined onClick={goBack} />

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
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </div>
  )
}

NewProductPage.authenticate = true
NewProductPage.getLayout = (page) => <Layout title={"Create New Product"}>{page}</Layout>

export default NewProductPage
