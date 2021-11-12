import db, { Role } from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  await db.userPermision.createMany({
    data: [
      {
        role: Role.ADMIN,
        client: true,
        product: true,
        orders: true,
        users: true,
      },
      {
        role: Role.NONE,
        client: true,
        product: true,
        orders: true,
        users: true,
      },
    ],
  })
}

export default seed
