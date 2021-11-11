import { Head, ErrorComponent, useParam, useRouterQuery } from "blitz"

// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------
export default function Error() {
  const { code: statusCode } = useRouterQuery()
  const title = "You are not authorized to access this resource"
  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>
      <ErrorComponent statusCode={Number(statusCode)} title={title} />
    </>
  )
}
