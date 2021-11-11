import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { UniqueEntityError } from "../../core/errors/UniqueEntityError"

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

  const existingClient = await db.client.findFirst({
    where: {
      OR: [{ email: input.email }, { cuil: input.cuil }],
    },
  })

  if (existingClient?.email === input.email) {
    throw new Error("There's another client with that Email!")
  }

  if (existingClient?.cuil === input.cuil) {
    throw new Error("There's another client with that CUIL!")
  }

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
