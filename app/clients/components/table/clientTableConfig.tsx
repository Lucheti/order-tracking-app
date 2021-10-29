import { ColumnGroupType, ColumnsType, ColumnType } from "antd/lib/table/interface"
import { Client } from "db"
import { Space } from "antd"
import { Link, Routes } from "blitz"
import React from "react"

const basicColumn = <Key extends keyof Client>(
  key: Key,
  title: string = key
): ColumnGroupType<Client> | ColumnType<Client> => ({
  title,
  dataIndex: title.toLowerCase(),
  key: title.toLowerCase(),
})

export const columns: ColumnsType<Client> = [
  {
    title: "Id",
    key: "id",
    render: (_, __, index) => <p>{index + 1}</p>,
  },
  basicColumn("name", "Name"),
  basicColumn("surname", "Surname"),
  basicColumn("email", "Email"),
  basicColumn("phone", "Phone"),
  {
    title: "BusinessName",
    key: "businessName",
    dataIndex: "businessName",
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space size="middle">
        <Link href={Routes.ShowOrderPage({ orderId: record.id })}>
          <a>View</a>
        </Link>
        <Link href={Routes.EditOrderPage({ orderId: record.id })}>
          <a>Edit</a>
        </Link>
        <a>Delete</a>
      </Space>
    ),
  },
]
