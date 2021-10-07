import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetClient = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetClient), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const client = await db.client.findFirst({ where: { id } })

  if (!client) throw new NotFoundError()

  return client
})
