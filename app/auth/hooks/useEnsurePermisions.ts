import { useCurrentUser } from "../../core/hooks/useCurrentUser"
import { AuthorizationError, Routes, useQuery, useRouter } from "blitz"
import getUserPermision from "../../user-permisions/queries/getUserPermision"
import { Role } from "db"
import { useEffect } from "react"

export const useEnsurePermissions = () => {
  const { pathname, push } = useRouter()
  const user = useCurrentUser()
  const [userPermission] = useQuery(getUserPermision, { role: user?.role })
  const throwError = () => {
    push(Routes.Error({ code: 403 }))
  }

  useEffect(() => {
    if (!user) throwError()
    switch (pathname.match(/\/([a-z]+)/)?.shift() || "/") {
      case Routes.Home().pathname:
        break
      case Routes.ClientsPage().pathname:
        if (!userPermission.client) throwError()
        break
      case Routes.ProductsPage().pathname:
        if (!userPermission.product) throwError()
        break
      case Routes.OrdersPage().pathname:
        if (!userPermission.orders) throwError()
        break
      case Routes.UsersPage().pathname:
        if (!userPermission.users) throwError()
        break
      default:
        if (!(user?.role === Role.ADMIN)) throwError()
    }
  }, [])
}
