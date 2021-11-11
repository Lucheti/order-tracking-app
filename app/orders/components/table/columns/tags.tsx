import React, { useCallback } from "react"
import { Order } from "db"
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons"
import { Button, Divider, Space, Tag, Tooltip } from "antd"
import classes from "./tags.module.scss"
import { Link, Routes, useRouter } from "blitz"

export const Tags = ({ order }: { order: Order }) => {
  const pickingConfig = order.picking
    ? { color: "green", text: "Picked" }
    : { color: "yellow", text: "No picking", icon: <ClockCircleOutlined /> }

  return (
    <Space>
      <Tag icon={pickingConfig?.icon} color={pickingConfig.color}>
        {pickingConfig.text}
      </Tag>
      <InvoiceTag order={order} />
    </Space>
  )
}

const InvoiceTag = ({ order }: { order: Order }) => {
  const router = useRouter()
  const goToCreateInvoice = useCallback(
    () => router.push(Routes.NewInvoice({ orderId: order.id })),
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
      <Tooltip title={"asdfadasfadfas"}>
        <Tag icon={<CheckCircleOutlined />} color={"green"}>
          Invoiced
        </Tag>
      </Tooltip>
    )

  const NoInvoiceTooltipContent = () => (
    <div className={classes.tooltip}>
      <Divider className={classes.pendingDivider} orientation={"left"}>
        {" "}
        Pending{" "}
      </Divider>
      <p> This order has not been invoiced yet </p>
      <Button type={"primary"} onClick={goToCreateInvoice}>
        Create Invoice
      </Button>
    </div>
  )

  return (
    <Tooltip title={() => <NoInvoiceTooltipContent />}>
      <Tag icon={<ClockCircleOutlined />} color={"yellow"}>
        No invoice
      </Tag>
    </Tooltip>
  )
}
