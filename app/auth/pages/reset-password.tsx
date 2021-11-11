import { BlitzPage, useRouterQuery, Link, useMutation, Routes } from "blitz"
import EmptyLayout from "app/core/layouts/EmptyLayout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form } from "app/core/components/Form"
import { ResetPassword } from "app/auth/validations"
import resetPassword from "app/auth/mutations/resetPassword"

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <div>
      <h1>Set a New Password</h1>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </p>
        </div>
      ) : (
        <Form
          submitText="Reset Password"
          schema={ResetPassword}
          initialValues={{ password: "", passwordConfirmation: "", token: query.token as string }}
          onSubmit={async (values) => {
            try {
              await resetPasswordMutation(values)
            } catch (error: any) {}
          }}
        >
          <LabeledTextField name="password" label="New Password" type="password" />
          <LabeledTextField
            name="passwordConfirmation"
            label="Confirm New Password"
            type="password"
          />
        </Form>
      )}
    </div>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => (
  <EmptyLayout title="Reset Your Password">{page}</EmptyLayout>
)

export default ResetPasswordPage
