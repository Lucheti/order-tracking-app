import React, { Suspense } from "react"
import { Head, RouteUrlObject, useRouter } from "blitz"
import classes from "./entityPage.module.scss"
import { Button } from "antd"

interface Props {
  name: string
  route: RouteUrlObject
  create?: boolean
}

export const EntityPage: React.FC<Props> = ({ name, route, children, create = true }) => {
  const { push } = useRouter()

  return (
    <>
      <Head>
        <title>{name}s</title>
      </Head>

      <div className={classes.entityPage}>
        <div className={classes.header}>
          <h2> {name}s </h2>

          {create && (
            <Button type={"primary"} onClick={() => push(route, undefined, { shallow: true })}>
              New {name}
            </Button>
          )}
        </div>

        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </div>
    </>
  )
}
