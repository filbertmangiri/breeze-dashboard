export interface User {
  id: number
  name: string
  username: string
  email: string
  email_verified_at: string
  gender: {
    value: string
    label: string
  }
  profile_picture: string
  description?: string
  created_at: string
  updated_at: string
}
