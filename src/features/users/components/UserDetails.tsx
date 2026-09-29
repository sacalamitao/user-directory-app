import type { User } from '../types/user'

interface UserDetailsProps {
  user: User | undefined
}

export function UserDetails({ user }: UserDetailsProps) {
  if (!user) {
    return <p className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">Select a user to view details.</p>
  }

  return (
    <section aria-label="User details" className="rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-semibold">{user.name}</h2>
      <p className="text-slate-500">@{user.username}</p>
      <dl className="mt-6 grid gap-4 text-sm">
        <div><dt className="font-medium text-slate-500">Role</dt><dd>{user.role}</dd></div>
        <div><dt className="font-medium text-slate-500">Email</dt><dd><a className="text-blue-700 underline" href={`mailto:${user.email}`}>{user.email}</a></dd></div>
        <div><dt className="font-medium text-slate-500">Phone</dt><dd>{user.phone}</dd></div>
        <div><dt className="font-medium text-slate-500">Company</dt><dd>{user.company.name}</dd></div>
        <div><dt className="font-medium text-slate-500">Address</dt><dd>{user.address.street}, {user.address.suite}, {user.address.city} {user.address.zipcode}</dd></div>
      </dl>
    </section>
  )
}
