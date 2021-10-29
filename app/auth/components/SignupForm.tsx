import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import classes from "./AuthForm.module.scss"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <h1>Create an Account</h1>

        <Form
          submitText="Create Account"
          schema={Signup}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await signupMutation(values)
              props.onSuccess?.()
            } catch (error: any) {
              if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                // This error comes from Prisma
                return { email: "This email is already being used" }
              } else {
                return { [FORM_ERROR]: error.toString() }
              }
            }
          }}
        >
          <div className={classes.inputGroup}>
            <LabeledTextField name="name" label="Name" placeholder="Name" />
            <LabeledTextField name="surname" label="Surname" placeholder="Surname" />
          </div>

          <div className={classes.inputGroup}>
            <LabeledTextField name="phone" label="Phone" placeholder="Phone" inputMode={"tel"} />
          </div>

          <div className={classes.inputGroup}>
            <LabeledTextField name="email" label="Email" placeholder="Email" />
          </div>

          <div className={classes.inputGroup}>
            <LabeledTextField
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default SignupForm
