import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateClient = z.object({
  id: z.string(),
  name: z.string().optional(),
  surname: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  birthdate: z.date().optional(),
  cuil: z.string().optional(),
  businessName: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(UpdateClient),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const client = await db.client.update({ where: { id }, data })

    return client
  }
)
