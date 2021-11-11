import { BlitzPage, Routes, useMutation, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import createClient from "app/clients/mutations/createClient"
import { ClientForm } from "app/clients/components/ClientForm"
import classes from "./clientPage.module.scss"
import { message } from "antd"

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
        onSubmit={async (values) => {
          try {
            const client = await createClientMutation(values)
            message.success({
              content: `Created client ${client.name} ${client.surname}`,
            })
            router.push(Routes.ShowClientPage({ clientId: client.id }))
          } catch (err: any) {
            message.error(err.message, 10)
          }
        }}
      />
    </div>
  )
}

NewClientPage.authenticate = true
NewClientPage.getLayout = (page) => <Layout title={"Create New Client"}>{page}</Layout>

export default NewClientPage
