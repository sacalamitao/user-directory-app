interface UserSearchProps {
  value: string
  onChange: (value: string) => void
}

export function UserSearch({ value, onChange }: UserSearchProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">Search users</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Name, username, email, or company"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </label>
  )
}
