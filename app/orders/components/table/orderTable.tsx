import { usePaginatedQuery, useRouter } from "blitz"
import getOrders from "app/orders/queries/getOrders"
import { Table } from "antd"
import { columns } from "./orderTableConfig"

const ITEMS_PER_PAGE = 20

export const OrderTable = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [data, { isLoading }] = usePaginatedQuery(
    getOrders,
    {
      orderBy: { id: "asc" },
      skip: ITEMS_PER_PAGE * page,
      take: ITEMS_PER_PAGE,
    },
    {
      suspense: false,
    }
  )

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data?.orders}
        pagination={{
          pageSize: ITEMS_PER_PAGE,
          total: data?.count,
          current: page + 1,
          onChange: (newPage) => (newPage > page ? goToNextPage() : goToPreviousPage()),
          position: ["bottomLeft"],
        }}
        loading={isLoading}
      />
    </div>
  )
}
