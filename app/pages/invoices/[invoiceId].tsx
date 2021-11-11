import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getInvoice from "app/invoices/queries/getInvoice"
import deleteInvoice from "app/invoices/mutations/deleteInvoice"

export const Invoice = () => {
  const router = useRouter()
  const invoiceId = useParam("invoiceId", "number")
  const [deleteInvoiceMutation] = useMutation(deleteInvoice)
  const [invoice] = useQuery(getInvoice, { id: invoiceId })

  return (
    <>
      <Head>
        <title>Invoice {invoice.id}</title>
      </Head>

      <div>
        <h1>Invoice {invoice.id}</h1>
        <pre>{JSON.stringify(invoice, null, 2)}</pre>

        <Link href={Routes.EditInvoicePage({ invoiceId: invoice.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteInvoiceMutation({ id: invoice.id })
              router.push(Routes.InvoicesPage())
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

const ShowInvoicePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.InvoicesPage()}>
          <a>Invoices</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Invoice />
      </Suspense>
    </div>
  )
}

ShowInvoicePage.authenticate = true
ShowInvoicePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowInvoicePage
