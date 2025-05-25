import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Book, CartItem } from '../types'

interface CartContextType {
  cart: CartItem[];
  addToCart: (book: Book) => void
  removeFromCart: (bookId: string) => void
  updateQuantity: (bookId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('ошибка хука useCartContext :/')
  }
  return context
}

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = 'bookstore_cart'

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      return savedCart ? JSON.parse(savedCart) : []
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book: Book) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.book.id === book.id)
      
      if (existingItem) {
        return currentCart.map(item => 
          item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      
      return [...currentCart, { book, quantity: 1 }]
    })
  }

  const removeFromCart = (bookId: string) => {
    setCart(currentCart => currentCart.filter(item => item.book.id !== bookId))
  }

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(bookId)
      return
    }

    setCart(currentCart => 
      currentCart.map(item => 
        item.book.id === bookId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = cart.reduce(
    (total, item) => total + (item.book.price * item.quantity), 0)

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}