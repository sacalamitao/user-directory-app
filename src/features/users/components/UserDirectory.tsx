import { useState } from 'react'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useFavorites } from '../hooks/useFavorites'
import { useUsers } from '../hooks/useUsers'
import type { UserRole } from '../types/user'
import { filterUsers, sortUsers, type UserSortField } from '../utils/userUtils'
import { RoleFilter } from './RoleFilter'
import { UserDetails } from './UserDetails'
import { UserList } from './UserList'
import { UserSearch } from './UserSearch'
import { UserSort } from './UserSort'

function UserDirectory() {
  const { data: users = [], isPending, isError, error, refetch } = useUsers()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search, 300)
  const [role, setRole] = useState<UserRole | 'all'>('all')
  const [sortBy, setSortBy] = useState<UserSortField>('name')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const { favoriteIds, toggleFavorite } = useFavorites()
  const visibleUsers = sortUsers(filterUsers(users, debouncedSearch, role), sortBy)
  const selectedUser = visibleUsers.find((user) => user.id === selectedId)

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-bold tracking-tight">User Directory</h1>
      <p className="mt-2 text-slate-600">Browse users and view their contact details.</p>

      {isPending ? (
        <p role="status" className="mt-8">Loading users…</p>
      ) : isError ? (
        <div role="alert" className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4">
          <p>{error.message}</p>
          <button type="button" onClick={() => void refetch()} className="mt-3 rounded bg-red-700 px-3 py-2 text-white hover:bg-red-800">Try again</button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <div className="grid gap-4 sm:grid-cols-3">
              <UserSearch value={search} onChange={setSearch} />
              <RoleFilter value={role} onChange={setRole} />
              <UserSort value={sortBy} onChange={setSortBy} />
            </div>
            <p className="my-4 text-sm text-slate-600">{visibleUsers.length} {visibleUsers.length === 1 ? 'user' : 'users'}</p>
            <UserList users={visibleUsers} selectedId={selectedId} onSelect={setSelectedId} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
          </div>
          <UserDetails user={selectedUser} />
        </div>
      )}
    </div>
  )
}

export default UserDirectory
