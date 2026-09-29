import { useEffect, useState } from 'react'

const STORAGE_KEY = 'user-directory:favorites'

function readFavorites(): number[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    const parsed: unknown = JSON.parse(stored)
    return Array.isArray(parsed)
      ? parsed.filter((id): id is number => Number.isInteger(id) && id > 0)
      : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(readFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds))
    } catch {
      // Favorites still work for this session if storage is unavailable.
    }
  }, [favoriteIds])

  function toggleFavorite(id: number) {
    setFavoriteIds((current) =>
      current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id],
    )
  }

  return { favoriteIds, toggleFavorite }
}
