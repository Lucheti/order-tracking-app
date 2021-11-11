import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
import { InputNumber, Input, Form as ANTDForm } from "antd"

const { Item } = ANTDForm

export function ClientForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <div className={"input-group"}>
        <Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Input autoFocus placeholder="Name" />
        </Item>

        <Item
          label="Surname"
          name="surname"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Input placeholder="Surname" />
        </Item>
      </div>

      <div className={"input-group"}>
        <Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Input placeholder="Phone" type={"tel"} addonBefore={"+54 11"} />
        </Item>

        <Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Input placeholder="Email" type={"email"} />
        </Item>
      </div>

      <div className={"input-group"}>
        <Item
          name="birthdate"
          label="Birthdate"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Input placeholder="Birthdate" type={"date"} />
        </Item>

        <Item
          label="Cuil"
          name="cuil"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Input placeholder="Cuil" />
        </Item>
      </div>

      <div className={"input-group"}>
        <Item
          label="BusinessName"
          name="businessName"
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Input placeholder="BusinessName" />
        </Item>
      </div>
    </Form>
  )
}
