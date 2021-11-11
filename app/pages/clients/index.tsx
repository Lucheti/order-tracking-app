import { AuthenticationError, BlitzPage, ErrorBoundary, Routes, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { EntityPage } from "../../core/components/entityPage/EntityPage"
import { ClientTable } from "../../clients/components/table/clientTable"
import { useEnsurePermissions } from "../../auth/hooks/useEnsurePermisions"

const ClientsPage: BlitzPage = () => {
  return (
    <EntityPage name={"Client"} route={Routes.NewClientPage()}>
      <ClientTable />
    </EntityPage>
  )
}

ClientsPage.authenticate = true
ClientsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ClientsPage
