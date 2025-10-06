import { create } from 'zustand'
import { User } from '@/types/user'

interface UserState {
  users: User[]
  getUserById: (id: string) => User | undefined
  findUsers: (query: string, excludeIds?: string[]) => User[]
}

const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Usuário Exemplo',
    email: 'usuario.exemplo@email.com',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
  },
  {
    id: 'user-2',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2',
  },
  {
    id: 'user-3',
    name: 'Bob Williams',
    email: 'bob@example.com',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=3',
  },
  {
    id: 'user-4',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4',
  },
  {
    id: 'user-5',
    name: 'Diana Prince',
    email: 'diana@example.com',
    avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=5',
  },
]

export const useUserStore = create<UserState>()((set, get) => ({
  users: mockUsers,
  getUserById: (id) => {
    return get().users.find((user) => user.id === id)
  },
  findUsers: (query, excludeIds = []) => {
    if (!query) return []
    const lowerCaseQuery = query.toLowerCase()
    return get().users.filter(
      (user) =>
        !excludeIds.includes(user.id) &&
        (user.name.toLowerCase().includes(lowerCaseQuery) ||
          user.email.toLowerCase().includes(lowerCaseQuery)),
    )
  },
}))
