import type { User } from '@/types/user'

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User
  }
  errors: Record<string, string[]>
  filters: {
    search?: string
    limit?: string
    col?: string
    sort?: 'asc' | 'desc'
    filters?: string
  }
}
