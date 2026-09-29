import type { User } from '../types/user'
import { UserListItem } from './UserListItem'

interface UserListProps {
  users: User[]
  selectedId: number | null
  onSelect: (id: number) => void
  favoriteIds: number[]
  onToggleFavorite: (id: number) => void
}

export function UserList({ users, selectedId, onSelect, favoriteIds, onToggleFavorite }: UserListProps) {
  if (users.length === 0) {
    return <p className="rounded-lg border border-slate-200 bg-white p-4 text-slate-600">No users found.</p>
  }

  return (
    <ul className="space-y-3" aria-label="Users">
      {users.map((user) => (
        <UserListItem
          key={user.id}
          user={user}
          selected={user.id === selectedId}
          onSelect={onSelect}
          favorite={favoriteIds.includes(user.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </ul>
  )
}
