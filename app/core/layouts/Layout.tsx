import React, { ReactNode, Suspense, useCallback, useState } from "react"
import { Head, Image, useMutation, useRouter, useSession } from "blitz"
import { Avatar, Button, Divider, Dropdown, Layout, Menu } from "antd"
import {
  CaretLeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons"
import classes from "./layout.module.scss"
import logout from "../../auth/mutations/logout"
import logoImg from "public/logo-eyewear.png"

const { Header, Sider, Content } = Layout

type LayoutProps = {
  title?: string
  children: ReactNode
}

const CustomSider = () => {
  const { pathname, push } = useRouter()

  const selected = useCallback(() => pathname.match(/\/([a-z]+)/)?.shift() || "/", [pathname])
  const route = (route: string) => push(route)

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <Image src={logoImg} sizes={"cover"} />
      <Divider />
      <Menu mode="inline" defaultSelectedKeys={["1"]} selectedKeys={[selected()]}>
        <Menu.Item key="/" icon={<VideoCameraOutlined />} onClick={() => route("/")}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="/orders" icon={<UserOutlined />} onClick={() => route("/orders")}>
          Orders
        </Menu.Item>
        <Menu.Item key="/products" icon={<UserOutlined />} onClick={() => route("/products")}>
          Products
        </Menu.Item>
        <Menu.Item key="/clients" icon={<UserOutlined />} onClick={() => route("/clients")}>
          Clients
        </Menu.Item>
        <Menu.Item key="/invoices" icon={<UploadOutlined />}>
          Invoices
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

const CustomHeader = () => {
  const session = useSession()
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()
  const goBack = () => router.back()

  const menu = (
    <Menu className={classes.dropdown}>
      <Menu.Item
        key={"logout"}
        danger
        onClick={async () => {
          await logoutMutation()
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <Header className={classes.header}>
      <div className={classes.headerActions}>
        <Button onClick={goBack} icon={<CaretLeftOutlined />}>
          Back
        </Button>
      </div>

      <Dropdown overlay={menu}>
        <Avatar className={classes.avatar}>{session.name && session.name[0]}</Avatar>
      </Dropdown>
    </Header>
  )
}

const LayoutComponent = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "orders-app"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout className={classes.layout}>
        <CustomSider />

        <Layout className="site-layout">
          <CustomHeader />
          <Suspense fallback="Loading...">
            <Content className={classes.content}>{children}</Content>
          </Suspense>
        </Layout>
      </Layout>
    </>
  )
}

export default LayoutComponent
