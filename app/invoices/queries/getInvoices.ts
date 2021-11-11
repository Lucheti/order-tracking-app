import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetInvoicesInput
  extends Pick<Prisma.InvoiceFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetInvoicesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: invoices,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.invoice.count({ where }),
      query: (paginateArgs) => db.invoice.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      invoices,
      nextPage,
      hasMore,
      count,
    }
  }
)
