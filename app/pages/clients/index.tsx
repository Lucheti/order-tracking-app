import { Suspense } from "react"
import { BlitzPage, Head, Link, Routes, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { ClientTable } from "../../clients/components/table/clientTable"
import classes from "./clientPage.module.scss"
import { Button } from "antd"

const ClientsPage: BlitzPage = () => {
  const { push } = useRouter()

  return (
    <>
      <Head>
        <title>Clients</title>
      </Head>

      <div className={classes.clientPage}>
        <div className={classes.header}>
          <h2> Clients </h2>

          <Button
            type={"primary"}
            onClick={() => push(Routes.NewClientPage(), undefined, { shallow: true })}
          >
            New Client
          </Button>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <ClientTable />
        </Suspense>
      </div>
    </>
  )
}

ClientsPage.authenticate = true
ClientsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ClientsPage
