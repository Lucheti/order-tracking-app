import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getInvoice from "app/invoices/queries/getInvoice"
import updateInvoice from "app/invoices/mutations/updateInvoice"
import { InvoiceForm, FORM_ERROR } from "app/invoices/components/InvoiceForm"

export const EditInvoice = () => {
  const router = useRouter()
  const invoiceId = useParam("invoiceId", "number")
  const [invoice, { setQueryData }] = useQuery(
    getInvoice,
    { id: invoiceId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateInvoiceMutation] = useMutation(updateInvoice)

  return (
    <>
      <Head>
        <title>Edit Invoice {invoice.id}</title>
      </Head>

      <div>
        <h1>Edit Invoice {invoice.id}</h1>
        <pre>{JSON.stringify(invoice, null, 2)}</pre>

        <InvoiceForm
          submitText="Update Invoice"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateInvoice}
          initialValues={invoice}
          onSubmit={async (values) => {
            try {
              const updated = await updateInvoiceMutation({
                id: invoice.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowInvoicePage({ invoiceId: updated.id }))
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

const EditInvoicePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditInvoice />
      </Suspense>

      <p>
        <Link href={Routes.InvoicesPage()}>
          <a>Invoices</a>
        </Link>
      </p>
    </div>
  )
}

EditInvoicePage.authenticate = true
EditInvoicePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditInvoicePage
