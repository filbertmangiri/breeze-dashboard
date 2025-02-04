import { useEffect, useRef } from 'react'

export default function usePrevious(value: unknown) {
  const ref = useRef<unknown>(null)

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}
