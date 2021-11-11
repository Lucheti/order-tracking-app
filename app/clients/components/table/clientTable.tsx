import { usePaginatedQuery, useRouter } from "blitz"
import { Table } from "antd"
import { columns } from "./clientTableConfig"
import getClients from "../../queries/getClients"
import { useEnsurePermissions } from "../../../auth/hooks/useEnsurePermisions"

const ITEMS_PER_PAGE = 20

export const ClientTable = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ clients, count }, { isLoading }] = usePaginatedQuery(getClients, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <Table
        columns={columns}
        dataSource={clients}
        pagination={{
          pageSize: ITEMS_PER_PAGE,
          total: count,
          current: page + 1,
          onChange: (newPage) => (newPage > page ? goToNextPage() : goToPreviousPage()),
          position: ["bottomLeft"],
        }}
        loading={isLoading}
      />
    </div>
  )
}
