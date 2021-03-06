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

// los clientes recuperados: los que dsps de 1 a??o de inactividad hicieron 2 o mas pedidos en un trimestre
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
      // sort orders by createdAt
      const sortedOrders = orders.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

      const orderWith1YearGap = sortedOrders.find((order, index) => {
        if (index === sortedOrders.length - 1) return false
        const nextOrder = sortedOrders[index + 1]
        const timeDifference = nextOrder.createdAt.getTime() - order.createdAt.getTime()
        return timeDifference > 31536000000
      })

      console.log(orderWith1YearGap)
      if (orderWith1YearGap) {
        console.log(sortedOrders)
        const posteriorOrders = sortedOrders.filter(
          (order) => order.createdAt.getTime() > orderWith1YearGap.createdAt.getTime()
        )
        console.log(posteriorOrders)
        return posteriorOrders.length >= 2
      }

      return orderWith1YearGap
    })
    return clientIdsWith1YearGap
  }

  return (
    <Card title={"Recovered Clients"} style={{ width: "fit-content" }}>
      <Stack anchor="center">
        <Meter
          values={[
            {
              value: has1YearGapBetweenOrders(groupByClientId).length,
              label: "recovered clients",
            },
          ]}
          max={count}
          type={"circle"}
          size={"small"}
        />
        <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
          <Text size="xlarge" weight="bold">
            {has1YearGapBetweenOrders(groupByClientId).length}
          </Text>
        </Box>
      </Stack>
    </Card>
  )
}

const MonthlyInvoicedMoney = () => {
  const [{ orders }] = useQuery(getOrders, {
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      },
    },
  })

  const invoicedMoney = orders.reduce((acc, order) => {
    if (order.invoiced) {
      acc += order.total
    }
    return acc
  }, 0)

  return (
    <Card title={"Monthly Invoiced Money"} style={{ width: "fit-content" }}>
      <Statistic
        title="This month invoices"
        value={invoicedMoney}
        valueStyle={{ color: "#3f8600" }}
        suffix="$"
      />
    </Card>
  )
}

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h1> Dashboard </h1>
      <NewMonthlyClients />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <ModifiedOrders />
        <NonInvoicedLastWeekOrders />
        <RecoveredClients />
      </div>
      <MonthlyInvoicedMoney />
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>
Home.authenticate = { redirectTo: "/login" }

export default Home
