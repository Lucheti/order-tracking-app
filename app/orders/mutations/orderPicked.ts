import { z } from "zod"
import { resolver } from "blitz"
import db from "../../../db"

const OrderPicked = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(OrderPicked), resolver.authorize(), async ({ id }) => {
  const order = await db.order.update({
    where: { id },
    data: { picking: true },
  })

  return order
})
