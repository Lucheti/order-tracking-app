import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateInvoice = z.object({
  type: z.string(),
  iva: z.number(),
  discount: z.number().optional(),
  address: z.string(),
  availableFrom: z.string(),
  availableTo: z.string(),
  clientId: z.string(),
  orderId: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateInvoice),
  resolver.authorize(),
  async ({ clientId, orderId, availableFrom, availableTo, ...input }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    if (new Date(availableFrom).getTime() > new Date(availableTo).getTime()) {
      throw new Error("La fecha de inicio debe ser menor a la fecha de fin")
    }

    const from = new Date(availableFrom).toISOString()
    const to = new Date(availableTo).toISOString()

    const invoice = await db.invoice.upsert({
      create: {
        ...input,
        availableFrom: from,
        availableTo: to,
        client: { connect: { id: clientId } },
        order: { connect: { id: orderId } },
      },
      update: {
        ...input,
        availableFrom: from,
        availableTo: to,
      },
      where: {
        orderId,
      },
    })

    await db.order.update({
      where: { id: orderId },
      data: {
        invoiced: true,
      },
    })

    return invoice
  }
)
