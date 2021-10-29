import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function ClientForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <div className={"input-group"}>
        <LabeledTextField name="name" label="Name" placeholder="Name" />
        <LabeledTextField name="surname" label="Surname" placeholder="Surname" />
      </div>

      <div className={"input-group"}>
        <LabeledTextField name="phone" label="Phone" placeholder="Phone" />
        <LabeledTextField name="email" label="Email" placeholder="Email" />
      </div>

      <div className={"input-group"}>
        <LabeledTextField
          name="birthdate"
          label="Birthdate"
          placeholder="Birthdate"
          type={"date"}
        />
        <LabeledTextField name="cuil" label="Cuil" placeholder="Cuil" />
      </div>

      <div className={"input-group"}>
        <LabeledTextField name="businessName" label="BusinessName" placeholder="BusinessName" />
      </div>
    </Form>
  )
}
