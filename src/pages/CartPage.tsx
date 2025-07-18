import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { useCart } from '../contexts/CartContext'
import { ShoppingCart, CreditCard, ArrowRight, Trash2 } from 'lucide-react'

const CartPage: React.FC = () => {
  const { cart, totalItems, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);

    const auth = localStorage.getItem('auth')
    const token = localStorage.getItem('token')

    if (!auth || !token) {
      alert('Вам необходимо авторизоваться')
      navigate('/login')
    }
  }, [navigate])

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-xl mx-auto">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Корзина пустая</h2>
          <p className="text-gray-600 mb-6">Похоже вы еще ничего не добавили в корзину</p>
          <Link 
            to="/books"
            className="flex text-md items-center bg-amber-500 text-white hover:bg-amber-600 rounded-full px-3 py-3 font-medium transition-colors justify-center"
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
                Товары ({totalItems})
              </h2>
              <button
                onClick={clearCart}
                className="flex items-center ml-16 md:ml-4 text-gray-500 hover:text-red-500 transition-colors"
              >
                <Trash2 className="md:h-5 md:w-5 h-7 w-7 md:mx-2" />
                Очистить корзину
              </button>
            </div>
            
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <CartItem key={item.book.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:sticky lg:top-20">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-serif text-xl font-semibold text-gray-800 mb-6">Оформление заказа</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Стоимость</span>
                <span>{totalPrice.toFixed(2)} ₽</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Доставка</span>
                <span>{totalPrice >= 2999 ? 'Бесплатно' : '499.99 ₽'}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Итого</span>
                  <span>{(totalPrice + (totalPrice >= 2999 ? 0 : 499.99)).toFixed(2)} ₽</span>
                </div>
                <p className="text-gray-700 text-sm mt-1">
                  {totalPrice >= 2999 ? '' : `Добавьте еще товаров на ${(2999 - totalPrice).toFixed()} ₽ для бесплатной доставки`}
                </p>
              </div>
            </div>
            
            <button className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-full font-medium transition-colors flex items-center justify-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Перейти к оплате
            </button>
            
            <Link to="/books" className="mt-4 w-full inline-flex items-center justify-center text-gray-600 hover:text-amber-500 py-2 transition-colors">
              Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
