import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetUserPermisionsInput
  extends Pick<Prisma.UserPermisionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetUserPermisionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: userPermisions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.userPermision.count({ where }),
      query: (paginateArgs) => db.userPermision.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      userPermisions,
      nextPage,
      hasMore,
      count,
    }
  }
)
