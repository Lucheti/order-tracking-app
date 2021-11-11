import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createInvoice from "app/invoices/mutations/createInvoice"
import { InvoiceForm } from "app/invoices/components/InvoiceForm"
import classes from "./invoicePage.module.scss"

const NewInvoicePage: BlitzPage = () => {
  const router = useRouter()
  const [createInvoiceMutation] = useMutation(createInvoice)

  return (
    <div className={classes.newInvoicePage}>
      <h1>Create New Invoice</h1>

      <InvoiceForm
        submitText="Create Invoice"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            const invoice = await createInvoiceMutation(values)
            router.push(Routes.ShowInvoicePage({ invoiceId: invoice.id }))
          } catch (error: any) {
            console.error(error)
          }
        }}
      />

      <p>
        <Link href={Routes.InvoicesPage()}>
          <a>Invoices</a>
        </Link>
      </p>
    </div>
  )
}

NewInvoicePage.authenticate = true
NewInvoicePage.getLayout = (page) => <Layout title={"Create New Invoice"}>{page}</Layout>

export default NewInvoicePage
