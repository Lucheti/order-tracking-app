import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetUserPermision = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional(),
  role: z.any().optional(),
})

export default resolver.pipe(
  resolver.zod(GetUserPermision),
  resolver.authorize(),
  async ({ id, role }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userPermision = await db.userPermision.findFirst({ where: { OR: [{ id }, { role }] } })

    if (!userPermision) throw new NotFoundError()

    return userPermision
  }
)
