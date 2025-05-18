import React from 'react'
import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { useCart } from '../contexts/CartContext'
import { ShoppingCart, CreditCard, ArrowRight, Trash2 } from 'lucide-react'

const CartPage: React.FC = () => {
  const { cart, totalItems, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-xl mx-auto">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Корзина пустая</h2>
          <p className="text-gray-600 mb-6">Похоже вы еще ничего не добавили в корзину</p>
          <Link 
            to="/books"
            className="inline-flex items-center bg-amber-500 text-white hover:bg-amber-600 rounded-full px-6 py-3 font-medium transition-colors"
          >
            Продолжить покупки
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold text-gray-800 mb-8">Твоя корзина</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-xl font-semibold text-gray-800">
                Cart Items ({totalItems})
              </h2>
              <button
                onClick={clearCart}
                className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear Cart
              </button>
            </div>
            
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <CartItem key={item.book.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="font-serif text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{totalPrice > 35 ? 'Free' : '$4.99'}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${(totalPrice + (totalPrice > 35 ? 0 : 4.99) + (totalPrice * 0.08)).toFixed(2)}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  {totalPrice > 35 ? 'Free shipping applied' : `Add ${(35 - totalPrice).toFixed(2)} more for free shipping`}
                </p>
              </div>
            </div>
            
            <button
              className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-full font-medium transition-colors flex items-center justify-center"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Proceed to Checkout
            </button>
            
            <Link 
              to="/books"
              className="mt-4 w-full inline-flex items-center justify-center text-gray-600 hover:text-amber-500 py-2 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;