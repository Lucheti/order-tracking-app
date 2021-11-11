import { Link, Routes, usePaginatedQuery, useRouter } from "blitz"
import getProducts from "../../queries/getProducts"
import { columns } from "./productTableConfig"
import { Pagination, Table } from "antd"

const ITEMS_PER_PAGE = 20

export const ProductTable = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ products, hasMore, count }, { isLoading }] = usePaginatedQuery(getProducts, {
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
        dataSource={products}
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
