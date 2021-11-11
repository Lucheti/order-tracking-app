import React, { ReactNode, Suspense, useCallback, useState } from "react"
import { Head, Image, useMutation, useRouter, useSession, Routes, Link, useQuery } from "blitz"
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
import { useCurrentUser } from "../hooks/useCurrentUser"
import getUserPermision from "../../user-permisions/queries/getUserPermision"
import { Role } from "db"
import { useEnsurePermissions } from "../../auth/hooks/useEnsurePermisions"

const { Header, Sider, Content } = Layout

type LayoutProps = {
  title?: string
  children: ReactNode
}

const CustomSider = () => {
  const { pathname } = useRouter()
  const currentUser = useCurrentUser()
  const [permissions] = useQuery(getUserPermision, { role: currentUser?.role })
  const selected = useCallback(() => pathname.match(/\/([a-z\-]+)/)?.shift() || "/", [pathname])

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <Image src={logoImg} sizes={"cover"} />
      <Divider />
      <Menu mode="inline" defaultSelectedKeys={["/"]} selectedKeys={[selected()]}>
        <Divider orientation="left"> General </Divider>
        <Menu.Item key={Routes.Home().pathname} icon={<VideoCameraOutlined />}>
          <Link href={Routes.Home()}>Dashboard</Link>
        </Menu.Item>
        {permissions?.orders && (
          <Menu.Item key={Routes.OrdersPage().pathname} icon={<UserOutlined />}>
            <Link href={Routes.OrdersPage()}>Orders</Link>
          </Menu.Item>
        )}
        {permissions?.product && (
          <Menu.Item key={Routes.ProductsPage().pathname} icon={<UserOutlined />}>
            <Link href={Routes.ProductsPage()}>Products</Link>
          </Menu.Item>
        )}
        {permissions?.client && (
          <Menu.Item key={Routes.ClientsPage().pathname} icon={<UserOutlined />}>
            <Link href={Routes.ClientsPage()}>Clients</Link>
          </Menu.Item>
        )}

        {currentUser?.role === Role.ADMIN && (
          <>
            <Divider orientation="left"> Admin </Divider>

            <Menu.Item key={Routes.UserPermisionsPage().pathname} icon={<UploadOutlined />}>
              <Link href={Routes.UserPermisionsPage()}>Permissions</Link>
            </Menu.Item>
          </>
        )}
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
  useEnsurePermissions()
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
