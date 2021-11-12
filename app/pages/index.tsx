import Layout from "../core/layouts/Layout"
import { useQuery } from "blitz"
import getClients from "../clients/queries/getClients"
import { Card, Statistic } from "antd"
import getOrders from "../orders/queries/getOrders"
import { Box, Meter, Stack, Text } from "grommet"
import { useState } from "react"

// indicador: cantidad de clientes nuevos por mes
const NewMonthlyClients = () => {
  const [{ clients, count }] = useQuery(getClients, {
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      },
    },
  })

  return (
    <Card>
      <Statistic
        title="New clients this month"
        value={count}
        valueStyle={{ color: "#3f8600" }}
        suffix="New Clients"
      />
    </Card>
  )
}

// indicador: pedidos modificados

const ModifiedOrders = () => {
  const [{ orders, count }] = useQuery(getOrders, {
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      },
    },
  })

  const modifiedOrders = orders.filter(
    (order) => order.updatedAt.toString() !== order.createdAt.toString()
  ).length

  return (
    <Card title={"Modified Orders"} style={{ width: "fit-content" }}>
      <Stack anchor="center">
        <Meter
          values={[
            {
              value: modifiedOrders,
              label: "modified orders",
            },
          ]}
          max={count}
          type={"circle"}
          size={"small"}
        />
        <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
          <Text size="xlarge" weight="bold">
            {modifiedOrders} / {count}
          </Text>
        </Box>
      </Stack>
    </Card>
  )
}

// los pedidos de la semana pasada que no fueron facturados
const NonInvoicedLastWeekOrders = () => {
  const [{ orders, count }] = useQuery(getOrders, {
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7),
        lte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      },
    },
  })

  const nonInvoicedOrders = orders.filter((order) => order.invoiced === false).length

  return (
    <Card title={"Non-Invoiced Orders"} style={{ width: "fit-content" }}>
      <Stack anchor="center">
        <Meter
          values={[
            {
              value: nonInvoicedOrders,
              label: "non-invoiced orders",
            },
          ]}
          max={count}
          type={"circle"}
          size={"small"}
        />
        <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
          <Text size="xlarge" weight="bold">
            {nonInvoicedOrders} / {count}
          </Text>
        </Box>
      </Stack>
    </Card>
  )
}

// los clientes recuperados: los que dsps de 1 año de inactividad hicieron 2 o mas pedidos en un trimestre
const RecoveredClients = () => {
  const [{ orders, count }] = useQuery(getOrders, {
    orderBy: {
      clientId: "asc",
    },
  })

  const [groupByClientId] = useState(
    orders.reduce((acc, order) => {
      if (!acc[order.clientId]) {
        acc[order.clientId] = {
          orders: [],
          total: 0,
        }
      }
      acc[order.clientId].orders.push(order)
      acc[order.clientId].total += order.total
      return acc
    }, {})
  )

  const has1YearGapBetweenOrders = (groupByClientId) => {
    const clientIds = Object.keys(groupByClientId)
    const clientIdsWith2OrMoreOrders = clientIds.filter(
      (clientId) => groupByClientId[clientId].orders.length >= 2
    )
    const clientIdsWith1YearGap = clientIdsWith2OrMoreOrders.filter((clientId) => {
      const orders = groupByClientId[clientId].orders
      const firstOrderDate = orders[0].createdAt
      const lastOrderDate = orders[orders.length - 1].createdAt
      const firstOrderDatePlus1Year = new Date(
        firstOrderDate.getFullYear() + 1,
        firstOrderDate.getMonth(),
        firstOrderDate.getDate()
      )
      return lastOrderDate < firstOrderDatePlus1Year
    })
    return clientIdsWith1YearGap
  }

  return (
    <Card title={"Recovered Clients"} style={{ width: "fit-content" }}>
      {JSON.stringify(has1YearGapBetweenOrders(groupByClientId))}
      <Stack anchor="center">
        <Meter
          values={[
            {
              value: 1,
              label: "recovered clients",
            },
          ]}
          max={count}
          type={"circle"}
          size={"small"}
        />
        <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
          <Text size="xlarge" weight="bold">
            {1} / {count}
          </Text>
        </Box>
      </Stack>
    </Card>
  )
}

const Home = () => {
  return (
    <div>
      <h1> Dashboard </h1>
      <NewMonthlyClients />
      <ModifiedOrders />
      <NonInvoicedLastWeekOrders />
      <RecoveredClients />
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>
Home.authenticate = { redirectTo: "/login" }

export default Home
