import { ReactNode } from "react"
import { Button, Form as ANTDForm } from "antd"
import { FormProps as FinalFormProps } from "react-final-form"
import { z } from "zod"
import { FormApi, SubmissionErrors } from "final-form"
const { Item } = ANTDForm

export interface FormProps<S extends z.ZodType<any, any>> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<any>
  initialValues?: Partial<z.infer<S>>
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <ANTDForm initialValues={initialValues} onFinish={onSubmit} layout={"vertical"}>
      {children}
      <Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Item>
    </ANTDForm>
  )
}

export default Form
