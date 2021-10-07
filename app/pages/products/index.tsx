import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProducts from "app/products/queries/getProducts"

const ITEMS_PER_PAGE = 100

export const ProductsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ products, hasMore }] = usePaginatedQuery(getProducts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={Routes.ShowProductPage({ productId: product.id })}>
              <a>{product.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ProductsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewProductPage()}>
            <a>Create Product</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ProductsList />
        </Suspense>
      </div>
    </>
  )
}

ProductsPage.authenticate = true
ProductsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ProductsPage
