import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateUser = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateUser), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const user = await db.user.create({
    data: {
      name: "asd",
      surname: "asd",
      email: "asd",
      hashedPassword: "asd",
    },
  })

  return user
})
