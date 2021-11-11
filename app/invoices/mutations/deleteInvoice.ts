import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteInvoice = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteInvoice), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const invoice = await db.invoice.deleteMany({ where: { id } })

  return invoice
})
