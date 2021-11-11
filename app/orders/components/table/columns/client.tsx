import { Order } from "../../../../../db"
import { Link, Routes, useQuery } from "blitz"
import getClient from "../../../../clients/queries/getClient"
import React from "react"

export const ClientColumn = ({ order }: { order: Order }) => {
  const [client] = useQuery(
    getClient,
    { id: order.clientId },
    {
      staleTime: Infinity,
    }
  )
  return (
    <Link href={Routes.ShowClientPage({ clientId: client.id })}>
      <a>
        {client?.name} {client?.surname}
      </a>
    </Link>
  )
}
