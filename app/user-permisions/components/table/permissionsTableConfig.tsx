import { ColumnGroupType, ColumnsType, ColumnType } from "antd/lib/table/interface"
import { UserPermision } from "db"
import React from "react"
import { Checkbox, message } from "antd"
import { invalidateQuery, useMutation, useQuery } from "blitz"
import updateUserPermision from "../../mutations/updateUserPermision"
import getUserPermision from "../../queries/getUserPermision"

const createCol = (title: string): ColumnGroupType<UserPermision> | ColumnType<UserPermision> => ({
  title,
  dataIndex: title.toLowerCase(),
  key: title.toLowerCase(),
})

type PermissionsToUpdate = "client" | "product" | "orders" | "users"

const PermissionsCheckbox = ({
  permissions,
  accessor,
}: {
  permissions: UserPermision
  accessor: PermissionsToUpdate
}) => {
  // query user permissions
  const [userPermision] = useQuery(getUserPermision, { id: permissions.id })
  const [updatePermission] = useMutation(updateUserPermision)

  const onChange = async (checked: boolean) => {
    try {
      const updatedPermission = await updatePermission({
        id: permissions.id,
        [accessor]: checked,
      })
      message.success(
        `${accessor} permission for role ${permissions.role} updated to ${updatedPermission[accessor]}`
      )
      invalidateQuery(getUserPermision)
    } catch (_) {
      message.warning("Check your internet connection")
    }
  }

  return (
    <div>
      <Checkbox checked={userPermision[accessor]} onChange={(e) => onChange(e.target.checked)} />
    </div>
  )
}

export const columns: ColumnsType<UserPermision> = [
  createCol("Role"),
  {
    title: "Clients",
    key: "client",
    render: (_, permissions) => (
      <PermissionsCheckbox permissions={permissions} accessor={"client"} key={permissions.id} />
    ),
  },
  {
    title: "Products",
    key: "product",
    render: (_, permissions) => (
      <PermissionsCheckbox permissions={permissions} accessor={"product"} key={permissions.id} />
    ),
  },
  {
    title: "Orders",
    key: "order",
    render: (_, permissions) => (
      <PermissionsCheckbox permissions={permissions} accessor={"orders"} key={permissions.id} />
    ),
  },
  {
    title: "Permissions",
    key: "permission",
    render: (_, permissions) => (
      <PermissionsCheckbox permissions={permissions} accessor={"users"} key={permissions.id} />
    ),
  },
]
