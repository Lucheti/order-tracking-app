import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const CreateProduct = z.object({
  model: z.string(),
  brand: z.string(),
  stock: z.number(),
  location: z.string(),
  description: z.string().optional(),
})

export default resolver.pipe(resolver.zod(CreateProduct), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const product = await db.product.create({
    data: {
      ...input,
      orderedProduct: {
        create: [],
      },
    },
  })

  return product
})
