import Layout from "../core/layouts/Layout"

const Home = () => {
  return <h1> Dashboard </h1>
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>
Home.authenticate = { redirectTo: "/login" }

export default Home
