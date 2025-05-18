import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Book } from '../types'

interface WishlistContextType {
  wishlist: Book[];
  addToWishlist: (book: Book) => void
  removeFromWishlist: (bookId: string) => void
  isInWishlist: (bookId: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('ошибка хука useWishlist :/')
  }
  return context
};

interface WishlistProviderProps {
  children: ReactNode
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Book[]>([])

  const addToWishlist = (book: Book) => {
    setWishlist(currentWishlist => {
      if (currentWishlist.some(item => item.id === book.id)) {
        return currentWishlist
      }
      return [...currentWishlist, book]
    });
  };

  const removeFromWishlist = (bookId: string) => {
    setWishlist(currentWishlist => 
      currentWishlist.filter(book => book.id !== bookId)
    )
  }

  const isInWishlist = (bookId: string) => {
    return wishlist.some(book => book.id === bookId)
  }

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}