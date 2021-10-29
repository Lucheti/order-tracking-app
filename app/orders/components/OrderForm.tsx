import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
import { LabeledSelectField } from "../../core/components/LabeledSelectField"
import GetClients from "../../clients/queries/getClients"
import GetProducts from "../../products/queries/getProducts"
export { FORM_ERROR } from "app/core/components/Form"

export function OrderForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <div className={"input-group"}>
        <LabeledTextField name="direction" label="Direction" placeholder="Direction" />
        <LabeledSelectField
          name={"clientId"}
          label={"Client"}
          dataProvider={GetClients}
          dataMapper={(data) =>
            data.clients.map((client) => ({
              value: client.id,
              label: client.name,
            }))
          }
        />
      </div>
      <div className={"input-group"}>
        <LabeledSelectField
          name={"products"}
          label={"Products"}
          dataProvider={GetProducts}
          dataMapper={(data) =>
            data.products.map((product) => ({
              value: product.id,
              label: `${product.brand}-${product.model}`,
            }))
          }
          mode={"multiple"}
        />
      </div>
    </Form>
  )
}
