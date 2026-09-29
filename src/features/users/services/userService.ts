import { roles, type ApiUser, type User } from '../types/user'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(USERS_URL, { signal })

  if (!response.ok) {
    throw new Error(`Unable to load users (${response.status})`)
  }

  const users = (await response.json()) as ApiUser[]
  return users.map((user) => ({
    ...user,
    role: roles[user.id % roles.length],
  }))
}
