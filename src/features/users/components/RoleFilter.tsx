import { roles, type UserRole } from '../types/user'

interface RoleFilterProps {
  value: UserRole | 'all'
  onChange: (role: UserRole | 'all') => void
}

export function RoleFilter({ value, onChange }: RoleFilterProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">Role</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as UserRole | 'all')}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      >
        <option value="all">All roles</option>
        {roles.map((role) => <option key={role} value={role}>{role}</option>)}
      </select>
    </label>
  )
}
