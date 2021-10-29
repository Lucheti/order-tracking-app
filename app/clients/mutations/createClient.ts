import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateClient = z.object({
  name: z.string(),
  surname: z.string(),
  phone: z.string(),
  email: z.string(),
  birthdate: z.string(),
  cuil: z.string(),
  businessName: z.string(),
})

export default resolver.pipe(resolver.zod(CreateClient), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant

  const birthdate = new Date(input?.birthdate).toISOString()

  const client = await db.client.create({
    data: {
      ...input,
      birthdate,
      order: {
        create: [],
      },
      invoice: {
        create: [],
      },
    },
  })

  return client
})
