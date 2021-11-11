import { ColumnsType } from "antd/lib/table/interface"
import { Order } from "db"
import React from "react"
import { ClientColumn } from "./columns/client"
import { Tags } from "./columns/tags"
import { Actions } from "./columns/actions"

export const columns: ColumnsType<Order> = [
  {
    title: "Id",
    key: "id",
    render: (_, __, index) => <p>{index + 1}</p>,
  },
  {
    title: "Address",
    key: "address",
    render: (_, order) => <p>{order.direction}</p>,
  },
  {
    title: "Total",
    key: "total",
    render: (_, order) => <p style={{ textAlign: "right" }}>${order.total}</p>,
  },
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
    render: (_, order, index) => <Tags order={order} />,
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => <Actions order={record} />,
  },
]
