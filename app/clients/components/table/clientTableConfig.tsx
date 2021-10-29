import { ColumnGroupType, ColumnsType, ColumnType } from "antd/lib/table/interface"
import { Client } from "db"
import { Space } from "antd"
import { Link, Routes, useMutation, useRouter } from "blitz"
import React from "react"
import deleteOrder from "../../../orders/mutations/deleteOrder"
import deleteClient from "../../mutations/deleteClient"

const basicColumn = <Key extends keyof Client>(
  key: Key,
  title: string = key
): ColumnGroupType<Client> | ColumnType<Client> => ({
  title,
  dataIndex: title.toLowerCase(),
  key: title.toLowerCase(),
})

const Actions = ({ client }: { client: Client }) => {
  const router = useRouter()
  const [deleteClientMutation] = useMutation(deleteClient)

  return (
    <Space size="middle">
      <Link href={Routes.ShowClientPage({ clientId: client.id })}>
        <a>View</a>
      </Link>
      <Link href={Routes.EditClientPage({ clientId: client.id })}>
        <a>Edit</a>
      </Link>
      <a
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteClientMutation({ id: client.id })
            router.push(Routes.ClientsPage())
          }
        }}
      >
        Delete
      </a>
    </Space>
  )
}

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
    render: (_, record) => <Actions client={record} />,
  },
]
