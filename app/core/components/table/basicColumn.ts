import { Order } from "../../../../db"
import { ColumnGroupType, ColumnType } from "antd/lib/table/interface"

export const basicColumn = <Key extends Capitalize<keyof Order>>(
  key: Key,
  title: string = key
): ColumnGroupType<Order> | ColumnType<Order> => ({
  title,
  dataIndex: title.toLowerCase(),
  key: title.toLowerCase(),
})
