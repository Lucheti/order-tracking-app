import { Link, Routes, useMutation } from "blitz"
import { Form } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import classes from "./AuthForm.module.scss"
import { Form as ANTDForm, Input, message } from "antd"

const { Item } = ANTDForm

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <h1>Login</h1>

        <Form
          submitText="Login"
          schema={Login}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await loginMutation(values)
              props.onSuccess?.()
            } catch (error: any) {
              message.error("Sorry, those credentials are invalid")
            }
          }}
        >
          <Item
            name="email"
            label="Email"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: "This field is required!" }]}
          >
            <Input placeholder="Email" />
          </Item>

          <Item
            name="password"
            label="Password"
            style={{ marginBottom: 0 }}
            rules={[{ required: true, message: "This field is required!" }]}
          >
            <Input type={"password"} placeholder="Password" />
          </Item>

          <div className={classes.forgotPassword}>
            <Link href={Routes.ForgotPasswordPage()}>
              <a>Forgot your password?</a>
            </Link>
          </div>
        </Form>

        <div className={classes.authFooter}>
          <p>Or</p>
          <Link href={Routes.SignupPage()}>Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
