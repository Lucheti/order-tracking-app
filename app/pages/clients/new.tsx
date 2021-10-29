import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createClient from "app/clients/mutations/createClient"
import { ClientForm, FORM_ERROR } from "app/clients/components/ClientForm"
import classes from "./clientPage.module.scss"

const NewClientPage: BlitzPage = () => {
  const router = useRouter()
  const [createClientMutation] = useMutation(createClient)

  return (
    <div className={classes.newClientPage}>
      <div className={classes.header}>
        <h2>New Client</h2>
      </div>

      <ClientForm
        submitText="Create Client"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateClient}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const client = await createClientMutation(values)
            router.push(Routes.ShowClientPage({ clientId: client.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ClientsPage()}>
          <a>Clients</a>
        </Link>
      </p>
    </div>
  )
}

NewClientPage.authenticate = true
NewClientPage.getLayout = (page) => <Layout title={"Create New Client"}>{page}</Layout>

export default NewClientPage
