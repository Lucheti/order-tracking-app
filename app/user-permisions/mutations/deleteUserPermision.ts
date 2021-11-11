import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteUserPermision = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteUserPermision),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userPermision = await db.userPermision.deleteMany({ where: { id } })

    return userPermision
  }
)
