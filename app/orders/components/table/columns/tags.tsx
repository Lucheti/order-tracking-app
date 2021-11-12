import React, { useCallback } from "react"
import { Order } from "db"
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons"
import { Button, Divider, Space, Tag, Tooltip } from "antd"
import classes from "./tags.module.scss"
import { Link, Routes, useRouter } from "blitz"

export const Tags = ({ order }: { order: Order }) => {
  return (
    <Space>
      <PickingTag order={order} />
      <InvoiceTag order={order} />
    </Space>
  )
}

const PickingTag = ({ order }: { order: Order }) => {
  const router = useRouter()
  const goToPicking = useCallback(
    () => router.push(Routes.PickingPage({ orderId: order.id })),
    [router]
  )

  if (order.picking) {
    return (
      <Tag icon={<CheckCircleOutlined />} color="green">
        Picked
      </Tag>
    )
  }

  return (
    <Tag
      icon={<ClockCircleOutlined />}
      color="yellow"
      onClick={goToPicking}
      style={{ cursor: "pointer" }}
    >
      No picking
    </Tag>
  )
}

const InvoiceTag = ({ order }: { order: Order }) => {
  const router = useRouter()
  const goToCreateInvoice = useCallback(
    () => router.push(Routes.NewInvoice({ orderId: order.id })),
    [router]
  )
  const goToInvoice = useCallback(
    () => router.push(Routes.ShowInvoicePage({ invoiceId: (order as any).invoice.id })),
    [router]
  )

  // const InvoiceTooltipContent = () => (
  //   <div className={classes.tooltip}>
  //     <Divider className={classes.doneDivider} orientation={"left"}> Pending </Divider>
  //     <p>
  //       This order has been invoiced!
  //       check the invoice <Link href={Routes.ShowInvoicePage({ invoiceId: order?.invoice?.id })}>here</Link>
  //     </p>
  //   </div>
  // )

  if (order.invoiced)
    return (
      <Tag
        icon={<CheckCircleOutlined />}
        color={"green"}
        onClick={goToInvoice}
        style={{ cursor: "pointer" }}
      >
        Invoiced
      </Tag>
    )

  return (
    <Tag
      icon={<ClockCircleOutlined />}
      color={"yellow"}
      onClick={goToCreateInvoice}
      style={{ cursor: "pointer" }}
    >
      No invoice
    </Tag>
  )
}
