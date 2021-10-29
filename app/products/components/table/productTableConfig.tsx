import { ColumnGroupType, ColumnsType, ColumnType } from "antd/lib/table/interface"
import { Order, Product } from "db"
import { Space } from "antd"
import { Link, Routes, useMutation, useRouter } from "blitz"
import React from "react"
import deleteOrder from "../../../orders/mutations/deleteOrder"
import deleteProduct from "../../mutations/deleteProduct"

const createCol = (title: string): ColumnGroupType<Product> | ColumnType<Product> => ({
  title,
  dataIndex: title.toLowerCase(),
  key: title.toLowerCase(),
})

const Actions = ({ product }: { product: Product }) => {
  const router = useRouter()
  const [deleteProductMutation] = useMutation(deleteProduct)

  return (
    <Space size="middle">
      <Link href={Routes.ShowProductPage({ productId: product.id })}>
        <a>View</a>
      </Link>
      <Link href={Routes.EditProductPage({ productId: product.id })}>
        <a>Edit</a>
      </Link>
      <a
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteProductMutation({ id: product.id })
            router.push(Routes.ProductsPage())
          }
        }}
      >
        Delete
      </a>
    </Space>
  )
}

export const columns: ColumnsType<Product> = [
  {
    title: "Id",
    key: "id",
    render: (_, __, index) => <p>{index + 1}</p>,
  },
  createCol("Brand"),
  createCol("Model"),
  createCol("Stock"),
  createCol("Location"),
  {
    title: "Actions",
    key: "actions",
    render: (_, product) => <Actions product={product} />,
  },
]
