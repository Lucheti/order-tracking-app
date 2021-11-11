import { usePaginatedQuery, useRouter } from "blitz"
import { columns } from "./permissionsTableConfig"
import { Table } from "antd"
import getUserPermisions from "../../queries/getUserPermisions"

const ITEMS_PER_PAGE = 20

export const PermissionsTable = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ userPermisions }, { isLoading }] = usePaginatedQuery(getUserPermisions, {
    orderBy: { role: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <Table
        columns={columns}
        dataSource={userPermisions}
        pagination={{
          pageSize: ITEMS_PER_PAGE,
          total: 1,
          current: page + 1,
          onChange: (newPage) => (newPage > page ? goToNextPage() : goToPreviousPage()),
          position: ["bottomLeft"],
        }}
        loading={isLoading}
      />
    </div>
  )
}
