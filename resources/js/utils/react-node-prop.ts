import type { ReactNode } from 'react'

export type NodeChildren<T> = {
  props?: {
    children?: NodeChildren<T>
  }
  type?: {
    [x: string]: T
  }
}

export function getChildrenProps<T>(
  children: ReactNode | NodeChildren<T>,
  propName: string,
  recursive: true,
): T[]
export function getChildrenProps<T>(
  children: ReactNode | NodeChildren<T>,
  propName: string,
  recursive?: false,
): T | undefined
export function getChildrenProps<T>(
  children: ReactNode | NodeChildren<T>,
  propName: string,
  recursive?: boolean,
): T[] | T | undefined {
  let values: T[] = []

  let current: NodeChildren<T> | undefined = children as NodeChildren<T>

  if (!recursive) {
    return current?.type?.[propName]
  }

  while (current?.props) {
    if (current?.type?.[propName]) {
      if (current.type[propName] instanceof Array) {
        values = values.concat(current.type[propName])
      } else {
        values.push(current.type[propName])
      }
    }

    current = current.props?.children
  }

  return values
}
