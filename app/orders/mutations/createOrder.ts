import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateOrder = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateOrder), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const order = await db.order.create({ data: input })

  return order
})
