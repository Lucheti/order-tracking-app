import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getClient from "app/clients/queries/getClient"
import deleteClient from "app/clients/mutations/deleteClient"

export const Client = () => {
  const router = useRouter()
  const clientId = useParam("clientId", "string")
  const [deleteClientMutation] = useMutation(deleteClient)
  const [client] = useQuery(getClient, { id: clientId })

  return (
    <>
      <Head>
        <title>Client {client.id}</title>
      </Head>

      <div>
        <h1>Client {client.id}</h1>
        <pre>{JSON.stringify(client, null, 2)}</pre>

        <Link href={Routes.EditClientPage({ clientId: client.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteClientMutation({ id: client.id })
              router.push(Routes.ClientsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowClientPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ClientsPage()}>
          <a>Clients</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Client />
      </Suspense>
    </div>
  )
}

ShowClientPage.authenticate = true
ShowClientPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowClientPage
