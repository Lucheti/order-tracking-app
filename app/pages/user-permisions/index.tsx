import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { EntityPage } from "../../core/components/entityPage/EntityPage"
import { PermissionsTable } from "../../user-permisions/components/table/permissionsTable"
import { useEnsurePermissions } from "../../auth/hooks/useEnsurePermisions"

const UserPermisionsPage: BlitzPage = () => {
  return (
    <>
      <EntityPage name={"Permission"} route={Routes.UserPermisionsPage()} create={false}>
        <PermissionsTable />
      </EntityPage>
    </>
  )
}

UserPermisionsPage.authenticate = true
UserPermisionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default UserPermisionsPage
