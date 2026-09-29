import type { User } from '../types/user'

interface UserListItemProps {
  user: User
  selected: boolean
  onSelect: (id: number) => void
  favorite: boolean
  onToggleFavorite: (id: number) => void
}

export function UserListItem({ user, selected, onSelect, favorite, onToggleFavorite }: UserListItemProps) {
  return (
    <li className="relative">
      <button
        type="button"
        onClick={() => onSelect(user.id)}
        aria-label={`View details for ${user.name}`}
        aria-pressed={selected}
        className={`w-full rounded-lg border p-4 text-left transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
          selected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'
        }`}
      >
        <span className="block pr-10 font-semibold text-slate-900">{user.name}</span>
        <span className="block text-sm text-slate-600">{user.email}</span>
        <span className="block text-sm text-slate-600">{user.role}</span>
        <span className="block text-sm text-slate-500">{user.company.name}</span>
      </button>
      <button
        type="button"
        onClick={() => onToggleFavorite(user.id)}
        aria-label={`${favorite ? 'Remove' : 'Add'} ${user.name} ${favorite ? 'from' : 'to'} favorites`}
        aria-pressed={favorite}
        className={`absolute right-3 top-3 rounded p-1 text-xl focus-visible:outline-2 focus-visible:outline-blue-600 ${favorite ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'}`}
      >
        <span aria-hidden="true">{favorite ? '★' : '☆'}</span>
      </button>
    </li>
  )
}
