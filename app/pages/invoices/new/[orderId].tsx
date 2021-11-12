import { BlitzPage, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import Layout from "../../../core/layouts/Layout"
import { InvoiceForm } from "../../../invoices/components/InvoiceForm"
import classes from "../../orders/orderPage.module.scss"
import createInvoice from "../../../invoices/mutations/createInvoice"
import getOrder from "../../../orders/queries/getOrder"
import { message } from "antd"

const NewInvoice: BlitzPage = () => {
  const router = useRouter()
  const orderId = useParam("orderId", "string")
  const [createInvoiceMutation] = useMutation(createInvoice)
  const [order] = useQuery(getOrder, { id: orderId }, {})

  return (
    <div className={classes.newIn}>
      <div className={classes.header}>
        <h2>New Invoice</h2>
      </div>

      <InvoiceForm
        submitText="Create Invoice"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateInvoice}
        initialValues={{
          clientId: order.clientId,
          orderId: order.id,
        }}
        onSubmit={async (values) => {
          try {
            const invoice = await createInvoiceMutation(values)
            router.push(Routes.OrdersPage())
          } catch (error: any) {
            console.error(error)
            message.error(error.toString())
          }
        }}
      />
    </div>
  )
}

NewInvoice.authenticate = true
NewInvoice.suppressFirstRenderFlicker = true
NewInvoice.getLayout = (page) => <Layout>{page}</Layout>

export default NewInvoice
