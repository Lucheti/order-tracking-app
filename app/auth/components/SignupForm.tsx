import { Link, Routes, useMutation } from "blitz"
import { Form } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import classes from "./AuthForm.module.scss"
import { Form as ANTDForm, Input, message } from "antd"

const { Item } = ANTDForm

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
                message.error("This email is already being used", 10)
              } else {
                message.error(error.toString())
              }
            }
          }}
        >
          <div className={classes.inputGroup}>
            <Item
              name="name"
              label="Name"
              style={{ marginBottom: 0 }}
              rules={[{ required: true, message: "This field is required!" }]}
            >
              <Input placeholder="Name" />
            </Item>
            <Item
              name="surname"
              label="Surname"
              style={{ marginBottom: 0 }}
              rules={[{ required: true, message: "This field is required!" }]}
            >
              <Input placeholder="Surname" />
            </Item>
          </div>

          <div className={classes.inputGroup}>
            <Item
              name="phone"
              label="Phone"
              style={{ marginBottom: 0 }}
              rules={[{ required: true, message: "This field is required!" }]}
            >
              <Input placeholder="Phone" type={"tel"} />
            </Item>
          </div>

          <div className={classes.inputGroup}>
            <Item
              name="email"
              label="Email"
              style={{ marginBottom: 0 }}
              rules={[{ required: true, message: "This field is required!" }]}
            >
              <Input placeholder="Email" />
            </Item>
          </div>

          <div className={classes.inputGroup}>
            <Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "This field is required!" },
                { min: 10, message: "Password must be at least 10 characters" },
              ]}
            >
              <Input placeholder="Password" type={"password"} />
            </Item>
          </div>
        </Form>

        <div className={classes.authFooter}>
          <p>Or</p>
          <p>
            <Link href={Routes.LoginPage()}>Login</Link> if you already have an account{" "}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
