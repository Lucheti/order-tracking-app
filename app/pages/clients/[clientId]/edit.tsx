import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getClient from "app/clients/queries/getClient"
import updateClient from "app/clients/mutations/updateClient"
import { ClientForm } from "app/clients/components/ClientForm"
import { message } from "antd"

export const EditClient = () => {
  const router = useRouter()
  const clientId = useParam("clientId", "string")
  const [client, { setQueryData }] = useQuery(
    getClient,
    { id: clientId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateClientMutation] = useMutation(updateClient)

  return (
    <>
      <Head>
        <title>
          Edit Client {client.name} {client.surname}
        </title>
      </Head>

      <div>
        <h1>Edit Client {client.id}</h1>

        <ClientForm
          submitText="Update Client"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateClient}
          initialValues={{
            ...client,
            birthdate: new Date(client?.birthdate || "")
              .toISOString()
              .slice(0, new Date(client?.birthdate || "").toISOString().indexOf("T")),
          }}
          onSubmit={async (values) => {
            try {
              const updated = await updateClientMutation({
                id: client.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowClientPage({ clientId: updated.id }))
            } catch (error: any) {
              console.error(error)
              message.error(error.toString())
            }
          }}
        />
      </div>
    </>
  )
}

const EditClientPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditClient />
      </Suspense>
    </div>
  )
}

EditClientPage.authenticate = true
EditClientPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditClientPage
