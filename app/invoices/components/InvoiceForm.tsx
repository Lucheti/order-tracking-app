import { Form, FormProps } from "app/core/components/Form"
import { z } from "zod"
import { Form as ANTDForm, Input, InputNumber, Select } from "antd"
import { useQuery } from "blitz"
import getClients from "../../clients/queries/getClients"
import getOrders from "../../orders/queries/getOrders"

const { Item } = ANTDForm

export function InvoiceForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [{ clients }] = useQuery(getClients, { orderBy: { id: "asc" } })
  const [{ orders }] = useQuery(getOrders, { orderBy: { id: "asc" } })

  return (
    <Form<S> {...props}>
      <div className={"input-group"}>
        {/*type input*/}
        <Item
          label={"type"}
          name={"type"}
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Input placeholder={"type"} />
        </Item>

        {/*iva input*/}
        <Item
          label={"iva"}
          name={"iva"}
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <InputNumber placeholder={"iva"} />
        </Item>

        {/*discount input*/}
        <Item label={"discount"} name={"discount"}>
          <InputNumber placeholder={"discount"} />
        </Item>
      </div>

      {/*address input*/}
      <Item
        label={"address"}
        name={"address"}
        rules={[{ required: true, message: "This field is required!" }]}
      >
        <Input placeholder={"address"} />
      </Item>

      <div className={"input-group"}>
        {/*availableFrom input*/}
        <Item
          label={"availableFrom"}
          name={"availableFrom"}
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Input placeholder={"availableFrom"} type={"date"} />
        </Item>

        {/*availableTo input*/}
        <Item
          label={"availableTo"}
          name={"availableTo"}
          rules={[{ required: true, message: "This field is required!" }]}
        >
          <Input placeholder={"availableTo"} type={"date"} />
        </Item>
      </div>

      <Item
        label={"Client"}
        name={"clientId"}
        rules={[{ required: true, message: "This field is required!" }]}
      >
        <Select disabled>
          {(clients || []).map((client) => (
            <Select.Option key={client.id} value={client.id}>
              {client.name} {client.surname}
            </Select.Option>
          ))}
        </Select>
      </Item>

      <Item
        label={"Order"}
        name={"orderId"}
        rules={[{ required: true, message: "This field is required!" }]}
      >
        <Select disabled>
          {(orders || []).map((order) => (
            <Select.Option key={order.id} value={order.id}>
              {order.id}
            </Select.Option>
          ))}
        </Select>
      </Item>
    </Form>
  )
}
