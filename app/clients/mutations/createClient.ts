import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateClient = z.object({
  name: z.string(),
  surname: z.string().optional(),
  phone: z.string().optional(),
  email: z.string(),
  birthdate: z.date().optional(),
  cuil: z.number().optional(),
  businessName: z.string().optional(),
})

export default resolver.pipe(resolver.zod(CreateClient), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const client = await db.client.create({
    data: {
      ...input,
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
