import { BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { EntityPage } from "../../core/components/entityPage/EntityPage"

const UsersPage: BlitzPage = () => {
  return (
    <EntityPage name={"User"} route={Routes.NewUserPage()}>
      Users
    </EntityPage>
  )
}

UsersPage.authenticate = true
UsersPage.getLayout = (page) => <Layout>{page}</Layout>

export default UsersPage
