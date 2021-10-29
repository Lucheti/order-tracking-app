import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import "antd/lib/input/style/index.css"
import classes from "./inputs.module.scss"
import { usePaginatedQuery } from "blitz"
import { Select } from "antd"

interface LabeledSelectField<T> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<T[]>
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
        parse: (v) => v,
        multiple: mode === "multiple",
        ...fieldProps,
      })

      const [data, { isLoading, isFetching }] = usePaginatedQuery(dataProvider, {
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
              loading={isLoading || isFetching}
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
