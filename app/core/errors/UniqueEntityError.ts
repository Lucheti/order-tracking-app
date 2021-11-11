import SuperJson from "superjson"

export class UniqueEntityError extends Error {
  name = "UniqueEntityError"
  constructor({ message }: { message: string }) {
    super()
    this.message = message
  }
}
// Register with SuperJson serializer so it's reconstructed on the client
SuperJson.registerClass(UniqueEntityError, { identifier: "UniqueEntityError" })
SuperJson.allowErrorProps("message")
