import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getClient from "app/clients/queries/getClient"
import updateClient from "app/clients/mutations/updateClient"
import { ClientForm, FORM_ERROR } from "app/clients/components/ClientForm"

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
        <title>Edit Client {client.id}</title>
      </Head>

      <div>
        <h1>Edit Client {client.id}</h1>
        <pre>{JSON.stringify(client, null, 2)}</pre>

        <ClientForm
          submitText="Update Client"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateClient}
          initialValues={client}
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
              return {
                [FORM_ERROR]: error.toString(),
              }
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

      <p>
        <Link href={Routes.ClientsPage()}>
          <a>Clients</a>
        </Link>
      </p>
    </div>
  )
}

EditClientPage.authenticate = true
EditClientPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditClientPage
