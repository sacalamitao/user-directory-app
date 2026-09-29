import type { UserSortField } from '../utils/userUtils'

interface UserSortProps {
  value: UserSortField
  onChange: (field: UserSortField) => void
}

export function UserSort({ value, onChange }: UserSortProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">Sort by</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as UserSortField)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      >
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="role">Role</option>
      </select>
    </label>
  )
}
