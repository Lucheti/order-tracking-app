import { Form, FormProps } from "app/core/components/Form"
import { z } from "zod"
import { Form as ANTDForm, Input, InputNumber } from "antd"

const { Item } = ANTDForm
const { TextArea } = Input

export function ProductForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <div className={"input-group"}>
        <Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Input autoFocus placeholder="Brand" />
        </Item>

        <Item
          label="Model"
          name="model"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Input autoFocus placeholder="Model" />
        </Item>
      </div>

      <div className={"input-group"}>
        <Item
          label="Stock"
          name="stock"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <InputNumber autoFocus placeholder="Stock" />
        </Item>

        <Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Input autoFocus placeholder="Location" />
        </Item>
      </div>

      <div className={"input-group"}>
        <Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <InputNumber autoFocus placeholder="Price" />
        </Item>
        <Item label="Description" name="description">
          <TextArea autoFocus placeholder="Description" rows={4} />
        </Item>
      </div>
    </Form>
  )
}
