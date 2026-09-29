export const roles = ['Engineer', 'Designer', 'Product Manager', 'QA Engineer'] as const

export type UserRole = (typeof roles)[number]

export interface ApiUser {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: { lat: string; lng: string }
  }
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface User extends ApiUser {
  role: UserRole
}
