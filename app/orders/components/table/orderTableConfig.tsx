import { ColumnGroupType, ColumnsType, ColumnType } from "antd/lib/table/interface"
import { Order, Client } from "db"
import { Space, Tag } from "antd"
import { Link, Routes, useQuery } from "blitz"
import React from "react"
import getClient from "../../../clients/queries/getClient"
import { ClockCircleOutlined } from "@ant-design/icons"

const basicColumn = <Key extends Capitalize<keyof Order>>(
  key: Key,
  title: string = key
): ColumnGroupType<Order> | ColumnType<Order> => ({
  title,
  dataIndex: title.toLowerCase(),
  key: title.toLowerCase(),
})

const ClientColumn = ({ order }: { order: Order }) => {
  const [client] = useQuery(
    getClient,
    { id: order.clientId },
    {
      staleTime: Infinity,
    }
  )
  return (
    <p>
      {client?.name} {client?.surname}
    </p>
  )
}

const TagsColumn = ({ order }: { order: Order }) => {
  const pickingConfig = order.picking
    ? { color: "green", text: "Picked" }
    : { color: "yellow", text: "No picking", icon: <ClockCircleOutlined /> }
  const invoiceConfig = order.invoiced
    ? { color: "green", text: "Invoiced" }
    : { color: "yellow", text: "No invoice", icon: <ClockCircleOutlined /> }
  return (
    <Space>
      <Tag icon={pickingConfig?.icon} color={pickingConfig.color}>
        {pickingConfig.text}
      </Tag>
      <Tag icon={invoiceConfig?.icon} color={invoiceConfig.color}>
        {invoiceConfig.text}
      </Tag>
    </Space>
  )
}

export const columns: ColumnsType<Order> = [
  {
    title: "Id",
    key: "id",
    render: (_, __, index) => <p>{index + 1}</p>,
  },
  basicColumn("Direction"),
  basicColumn("Total"),
  {
    title: "Created",
    key: "createdAt",
    render: (_, order, index) => <p>{order.createdAt.toLocaleDateString()}</p>,
  },
  {
    title: "Updated",
    key: "updatedAt",
    render: (_, order, index) => <p>{order.createdAt.toLocaleDateString()}</p>,
  },
  {
    title: "Client",
    key: "client",
    render: (_, order, index) => <ClientColumn order={order} />,
  },
  {
    title: "Status",
    key: "status",
    render: (_, order, index) => <TagsColumn order={order} />,
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
