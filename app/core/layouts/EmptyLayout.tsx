import React, { ReactNode, Suspense } from "react"
import { Head } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const EmptyLayout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "orders-app"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback="Loading...">{children}</Suspense>
    </>
  )
}

export default EmptyLayout
