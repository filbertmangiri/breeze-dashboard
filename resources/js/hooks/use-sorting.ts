import type { PageProps } from '@/types'
import type { Dispatch, SetStateAction } from 'react'

const useSorting = (
  initialParams: PageProps['filters'],
  setParams: Dispatch<SetStateAction<PageProps['filters']>>,
) => {
  const sort = (column: string) => {
    setParams((prevParams) => ({
      ...prevParams,
      col: column,
      sort: prevParams.sort ? (prevParams.sort === 'asc' ? 'desc' : 'asc') : 'asc',
    }))
  }

  return { sort }
}

export default useSorting
