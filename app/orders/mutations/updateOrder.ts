import { resolver } from "blitz"
import db, { Product } from "db"
import { z } from "zod"

const UpdateOrder = z.object({
  id: z.string(),
  direction: z.string().optional(),
  clientId: z.string().optional(),
  products: z.array(z.string()).optional(),
})

export default resolver.pipe(
  resolver.zod(UpdateOrder),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const products: Product[] = await db.product.findMany({
      where: {
        id: { in: data.products },
      },
    })
    const total = products.reduce((acc, next) => acc + next.price, 0)
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const order = await db.order.update({
      where: { id },
      data: {
        ...data,
        total,
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
  }
)
