import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import "antd/lib/input/style/index.css"
import classes from "./inputs.module.scss"
import { Select } from "antd"
import { usePaginatedQuery } from "blitz"
import getOrders from "../../orders/queries/getOrders"

interface LabeledSelectField<T> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
  dataProvider: (...args: any[]) => Promise<T>
  dataMapper: (data: T) => { label: string; value: any }[]
  mode?: "multiple"
}

export function LabeledSelectField<T>(props: LabeledSelectField<T>) {
  const Component = forwardRef<HTMLInputElement, LabeledSelectField<T>>(
    (
      { name, label, outerProps, fieldProps, labelProps, dataProvider, dataMapper, mode, ...props },
      ref
    ) => {
      const {
        input,
        meta: { touched, error, submitError, submitting },
      } = useField(name, {
        parse: (v) => {
          console.info(v)
          return v
        },
        multiple: mode === "multiple",
        ...fieldProps,
      })

      const [data] = usePaginatedQuery(dataProvider, {
        orderBy: { id: "asc" },
      })

      const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

      return (
        <div {...outerProps}>
          <label className={classes.inputLabel} {...labelProps}>
            <p>{label}</p>
            <Select
              {...input}
              disabled={submitting}
              {...props}
              ref={ref}
              style={{ width: "100%" }}
              mode={mode}
            >
              {dataMapper(data).map(({ label, value }) => (
                <Select.Option key={value} value={value}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </label>

          {touched && normalizedError && (
            <div role="alert" style={{ color: "red" }}>
              {normalizedError}
            </div>
          )}
        </div>
      )
    }
  )

  return <Component {...props} />
}
