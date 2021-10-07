import { Link, Routes, useMutation } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import Layout from "../core/layouts/Layout"
import { OrdersList } from "./orders"

const Home = () => {
  return <h1> Dashboard </h1>
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>
Home.authenticate = { redirectTo: "/login" }

export default Home
