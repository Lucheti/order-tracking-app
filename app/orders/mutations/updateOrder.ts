import { resolver } from "blitz"
import db, { Product } from "db"
import { z } from "zod"

const UpdateOrder = z.object({
  id: z.string(),
  direction: z.string(),
  clientId: z.string(),
  products: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
    })
  ),
})

export default resolver.pipe(
  resolver.zod(UpdateOrder),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const currentOrderedProducts = await db.orderedProduct.findMany({
      where: {
        orderId: id,
      },
      include: {
        product: true,
      },
    })

    //delete all current products
    await db.orderedProduct.deleteMany({
      where: {
        orderId: id,
      },
    })

    //add all orderedProducts
    await db.orderedProduct.createMany({
      data: data.products.map((product) => ({
        ...product,
        orderId: id,
      })),
    })

    const newOrderedProducts = await db.orderedProduct.findMany({
      where: {
        orderId: id,
      },
      include: {
        product: true,
      },
    })

    const total = newOrderedProducts.reduce(
      (acc, next) => acc + next.product.price * next.quantity,
      0
    )
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    const order = await db.order.update({
      where: { id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        invoice: true,
      },
      data: {
        ...data,
        total,
        invoiced: false,
        picking: false,
        products: {
          connect: newOrderedProducts.map(({ id }) => ({
            id,
          })),
        },
      },
    })

    return order
  }
)
