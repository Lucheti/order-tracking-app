import { Form, FormProps } from "app/core/components/Form"
import { Button, Form as ANTDForm, Input, InputNumber, Select, Space } from "antd"
import { useQuery } from "blitz"
import getClients from "../../clients/queries/getClients"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import getProducts from "../../products/queries/getProducts"
import { z } from "zod"

const { Item, List } = ANTDForm

export function OrderForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [{ clients }] = useQuery(getClients, { orderBy: { id: "asc" } })
  const [{ products }] = useQuery(getProducts, { orderBy: { id: "asc" } })

  return (
    <Form<S> {...props}>
      <Item
        label="Address"
        name="direction"
        rules={[{ required: true, message: "This field is required!" }]}
      >
        <Input autoFocus />
      </Item>

      <Item
        label={"Client"}
        name={"clientId"}
        rules={[{ required: true, message: "This field is required!" }]}
      >
        <Select>
          {(clients || []).map((client) => (
            <Select.Option key={client.id} value={client.id}>
              {client.name} {client.surname}
            </Select.Option>
          ))}
        </Select>
      </Item>

      <List name="products">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                <Item
                  {...restField}
                  name={[name, "productId"]}
                  fieldKey={[fieldKey, "productId"]}
                  rules={[{ required: true, message: "Missing products!" }]}
                >
                  <Select placeholder={"Product"}>
                    {(products || []).map((product) => (
                      <Select.Option key={product.id} value={product.id}>
                        {product.brand} {product.model}
                      </Select.Option>
                    ))}
                  </Select>
                </Item>
                <Item
                  {...restField}
                  name={[name, "quantity"]}
                  fieldKey={[fieldKey, "quantity"]}
                  rules={[{ required: true, message: "Missing product quantity" }]}
                >
                  <InputNumber placeholder="Quantity" type={"number"} required />
                </Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Item>
          </>
        )}
      </List>
    </Form>
  )
}
