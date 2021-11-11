import { Order } from "../../../../../db"
import { Link, Routes, useMutation, useRouter } from "blitz"
import deleteOrder from "../../../mutations/deleteOrder"
import { Space } from "antd"
import React from "react"

export const Actions = ({ order }: { order: Order }) => {
  const router = useRouter()
  const [deleteOrderMutation] = useMutation(deleteOrder)

  return (
    <Space size="middle">
      <Link href={Routes.ShowOrderPage({ orderId: order.id })}>
        <a>View</a>
      </Link>
      <Link href={Routes.EditOrderPage({ orderId: order.id })}>
        <a>Edit</a>
      </Link>
      <a
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteOrderMutation({ id: order.id })
            router.push(Routes.OrdersPage())
          }
        }}
      >
        Delete
      </a>
    </Space>
  )
}
