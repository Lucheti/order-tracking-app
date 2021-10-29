import { resolver } from "blitz"
import db, { Product } from "db"
import { z } from "zod"

export const CreateOrder = z.object({
  direction: z.string(),
  clientId: z.string(),
  products: z.array(z.string()),
})

export default resolver.pipe(resolver.zod(CreateOrder), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  console.log(input)
  const products: Product[] = await db.product.findMany({
    where: {
      id: { in: input.products },
    },
  })
  const total = products.reduce((acc, next) => acc + next.price, 0)

  const order = await db.order.create({
    data: {
      ...input,
      total,
      invoices: {
        create: [],
      },
      products: {
        create: products.map((product) => ({
          product: {
            connect: {
              id: product.id,
            },
          },
          quantity: 1,
        })),
      },
    },
  })

  return order
})
