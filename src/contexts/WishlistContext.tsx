import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Book } from '../types'

interface WishlistContextType {
  wishlist: Book[]
  addToWishlist: (book: Book) => void
  removeFromWishlist: (bookId: string) => void
  isInWishlist: (bookId: string) => boolean
  clearWishlist: () => void
  wishlistCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('Ошибка хука useWishlist :/')
  }
  return context
}

interface WishlistProviderProps {
  children: ReactNode
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Book[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wishlist')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (book: Book) => {
    if (!book || !book.id) {
      console.error('Ошибка :/ | Книга не найдена')
      return
    }

    setWishlist(current => {
      const exists = current.some(item => item.id === book.id)
      if (exists) {
        return current
      }
      return [...current, book]
    })
  }

  const removeFromWishlist = (bookId: string) => {
    setWishlist(current => current.filter(book => book.id !== bookId))
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  const isInWishlist = (bookId: string) => {
    return wishlist.some(book => book.id === bookId)
  }

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount: wishlist.length
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}