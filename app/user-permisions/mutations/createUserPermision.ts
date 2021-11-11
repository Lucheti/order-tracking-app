import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateUserPermision = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateUserPermision),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userPermision = await db.userPermision.create({ data: input })

    return userPermision
  }
)
