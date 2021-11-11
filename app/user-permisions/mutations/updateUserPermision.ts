import { resolver } from "blitz"
import db, { Role } from "db"
import { z } from "zod"

const UpdateUserPermision = z.object({
  id: z.string(),
  client: z.boolean().optional(),
  orders: z.boolean().optional(),
  users: z.boolean().optional(),
  product: z.boolean().optional(),
})

export default resolver.pipe(
  resolver.zod(UpdateUserPermision),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userPermision = await db.userPermision.update({ where: { id }, data })

    return userPermision
  }
)
