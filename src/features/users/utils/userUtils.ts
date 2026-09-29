import type { User, UserRole } from '../types/user'

export type UserSortField = 'name' | 'email' | 'role'

export function filterUsers(users: User[], search: string, role: UserRole | 'all' = 'all'): User[] {
  const term = search.trim().toLowerCase()

  return users.filter((user) =>
    (role === 'all' || user.role === role) &&
    (!term || [user.name, user.username, user.email, user.company.name].some((value) =>
      value.toLowerCase().includes(term),
    )),
  )
}

export function sortUsers(users: User[], field: UserSortField): User[] {
  return [...users].sort((a, b) =>
    a[field].localeCompare(b[field], undefined, { sensitivity: 'base' }) || a.id - b.id,
  )
}
