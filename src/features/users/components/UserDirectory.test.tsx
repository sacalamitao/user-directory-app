// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserDirectory from './UserDirectory'

const users = [
  { id: 1, name: 'Ada Lovelace', username: 'ada', email: 'ada@example.com', phone: '111', website: 'example.com', address: { street: 'One St', suite: 'A', city: 'London', zipcode: '1000', geo: { lat: '0', lng: '0' } }, company: { name: 'Analytical Co', catchPhrase: '', bs: '' } },
  { id: 2, name: 'Grace Hopper', username: 'grace', email: 'grace@example.com', phone: '222', website: 'example.com', address: { street: 'Two St', suite: 'B', city: 'New York', zipcode: '2000', geo: { lat: '0', lng: '0' } }, company: { name: 'Compiler Co', catchPhrase: '', bs: '' } },
  { id: 3, name: 'Linus Torvalds', username: 'linus', email: 'linus@example.com', phone: '333', website: 'example.com', address: { street: 'Three St', suite: 'C', city: 'Helsinki', zipcode: '3000', geo: { lat: '0', lng: '0' } }, company: { name: 'Kernel Co', catchPhrase: '', bs: '' } },
]

function renderDirectory() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(<QueryClientProvider client={client}><UserDirectory /></QueryClientProvider>)
}

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => users }))
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('user directory', () => {
  it('renders users after data loads', async () => {
    renderDirectory()
    expect(screen.getByRole('status')).toHaveTextContent('Loading users')
    const list = await screen.findByRole('list', { name: 'Users' })
    expect(within(list).getAllByRole('listitem')).toHaveLength(3)
    expect(within(list).getByText('Ada Lovelace')).toBeInTheDocument()
  })

  it('filters the list after entering a search term', async () => {
    const user = userEvent.setup()
    renderDirectory()
    const list = await screen.findByRole('list', { name: 'Users' })
    await user.type(screen.getByRole('searchbox', { name: 'Search users' }), 'grace')
    await waitFor(() => expect(within(list).getAllByRole('listitem')).toHaveLength(1))
    expect(within(list).getByText('Grace Hopper')).toBeInTheDocument()
  })

  it('filters users by their assigned role', async () => {
    const user = userEvent.setup()
    renderDirectory()
    const list = await screen.findByRole('list', { name: 'Users' })
    await user.selectOptions(screen.getByRole('combobox', { name: 'Role' }), 'Designer')
    expect(within(list).getAllByRole('listitem')).toHaveLength(1)
    expect(within(list).getByText('Ada Lovelace')).toBeInTheDocument()
  })

  it('shows the selected user details', async () => {
    const user = userEvent.setup()
    renderDirectory()
    await user.click(await screen.findByRole('button', { name: 'View details for Grace Hopper' }))
    const details = screen.getByRole('region', { name: 'User details' })
    expect(within(details).getByText('grace@example.com')).toBeInTheDocument()
    expect(within(details).getByText('Product Manager')).toBeInTheDocument()
    expect(within(details).getByText('222')).toBeInTheDocument()
    expect(within(details).getByText('Compiler Co')).toBeInTheDocument()
    expect(within(details).getByText(/New York/)).toBeInTheDocument()
  })

  it('shows an error when the API fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }))
    renderDirectory()
    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load users (503)')
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
  })
})
