import { ColumnGroupType, ColumnsType, ColumnType } from "antd/lib/table/interface"
import { Product } from "db"
import createProduct from "../../mutations/createProduct"
import { Space } from "antd"
import { Link, Routes } from "blitz"
import React from "react"

const createCol = (title: string): ColumnGroupType<Product> | ColumnType<Product> => ({
  title,
  dataIndex: title.toLowerCase(),
  key: title.toLowerCase(),
})

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
    render: (_, product) => (
      <Space size="small">
        <Link href={Routes.EditProductPage({ productId: product.id })}>Edit</Link>
        <a>Delete</a>
      </Space>
    ),
  },
]
