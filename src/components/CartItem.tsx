import React from 'react'
import { CartItem as CartItemType } from '../types'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

interface CartItemProps {
  item: CartItemType
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()
  const { book, quantity } = item

  const handleIncrease = () => {
    updateQuantity(book.id, quantity + 1)
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(book.id, quantity - 1)
    } else {
      removeFromCart(book.id)
    }
  }

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex-1">
        <h3 className="font-serif text-base font-medium text-gray-800">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
        <p className="mt-1 text-base font-medium text-amber-600">{book.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center border border-gray-200 rounded">
        <button 
          onClick={handleDecrease}
          className="px-2 py-1 text-gray-600 hover:text-amber-500 transition-colors"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="px-4 py-1">{quantity}</span>
        <button 
          onClick={handleIncrease}
          className="px-2 py-1 text-gray-600 hover:text-amber-500 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="ml-4 text-base font-medium text-gray-900">
        {(book.price * quantity).toFixed(2)}
      </div>

      <button
        onClick={() => removeFromCart(book.id)}
        className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
        title="Очистить"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  )
}

export default CartItem