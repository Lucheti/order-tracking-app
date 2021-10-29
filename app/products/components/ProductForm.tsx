import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
import LabeledTextAreaField from "../../core/components/LabeledTextAreaField"
export { FORM_ERROR } from "app/core/components/Form"

export function ProductForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <div className={"input-group"}>
        <LabeledTextField name="model" label="Model" placeholder="Model" />
        <LabeledTextField name="brand" label="Brand" placeholder="Brand" />
      </div>

      <div className={"input-group"}>
        <LabeledTextField name="stock" label="Stock" placeholder="Stock" type={"number"} />
        <LabeledTextField name="location" label="Location" placeholder="Location" />
      </div>

      <div className={"input-group"}>
        <LabeledTextField name="price" label="Price" placeholder="Price" type={"number"} />
        <LabeledTextAreaField
          name="description"
          label="Description (Optional)"
          placeholder="Description"
        />
      </div>
    </Form>
  )
}
