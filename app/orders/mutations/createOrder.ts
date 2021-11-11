import { resolver } from "blitz"
import db, { Product } from "db"
import { z } from "zod"

export const CreateOrder = z.object({
  direction: z.string(),
  clientId: z.string(),
  products: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
    })
  ),
})

export default resolver.pipe(resolver.zod(CreateOrder), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  console.log(input)
  const appendQuantity = (product: Product) => {
    const productIndex = input.products.findIndex((p) => p.productId === product.id)
    return {
      ...product,
      quantity: input?.products[productIndex]?.quantity || 0,
    }
  }
  const products = await db.product
    .findMany({
      where: { id: { in: input.products.map((p) => p.productId) } },
    })
    .then((products) => products.map(appendQuantity))

  const total = products.reduce((acc, next) => acc + next.price * next.quantity, 0)

  const order = await db.order.create({
    data: {
      ...input,
      total,
      invoices: {
        create: [],
      },
      products: {
        create: products.map(({ id, quantity }) => ({
          product: {
            connect: {
              id,
            },
          },
          quantity,
        })),
      },
    },
  })

  return order
})
