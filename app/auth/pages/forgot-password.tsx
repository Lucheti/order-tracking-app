import { BlitzPage, useMutation } from "blitz"
import EmptyLayout from "app/core/layouts/EmptyLayout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"
import { message } from "antd"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <div>
      <h1>Forgot your password?</h1>

      {isSuccess ? (
        <div>
          <h2>Request Submitted</h2>
          <p>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </p>
        </div>
      ) : (
        <Form
          submitText="Send Reset Password Instructions"
          schema={ForgotPassword}
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            try {
              await forgotPasswordMutation(values)
            } catch (error: any) {
              message.error("Sorry, we had an unexpected error. Please try again.")
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
        </Form>
      )}
    </div>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => (
  <EmptyLayout title="Forgot Your Password?">{page}</EmptyLayout>
)

export default ForgotPasswordPage
