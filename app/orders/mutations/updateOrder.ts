import { resolver } from "blitz"
import db, { Product } from "db"
import { z } from "zod"

const UpdateOrder = z.object({
  id: z.string(),
  direction: z.string(),
  clientId: z.string(),
  products: z.array(z.string()),
})

export default resolver.pipe(
  resolver.zod(UpdateOrder),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const products = await db.orderedProduct.findMany({
      where: {
        orderId: id,
      },
      include: {
        product: true,
      },
    })

    const newProducts = data.products.filter(
      (productId) => !products?.some((product) => product.productId === productId)
    )
    const deletedProducts =
      products?.filter((product) => !data?.products?.includes(product?.productId || "")) || []

    const total = products.reduce((acc, next) => acc + (next?.product?.price || 0), 0)
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    const order = await db.order.update({
      where: { id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        invoices: true,
      },
      data: {
        ...data,
        total,
        products: {
          create: newProducts.map((productId) => ({
            product: {
              connect: {
                id: productId,
              },
            },
            quantity: 1,
          })),
          delete: deletedProducts.map(({ id }) => ({ id })),
        },
      },
    })

    return order
  }
)
