import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, RussianRuble } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'
import { Book } from '../types'
import axios from 'axios'
import { TailChase } from 'ldrs/react'

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://story-stream-server.vercel.app/books')
        setBooks(response.data)
      } catch (err) {
        console.error(err)
        setError('Не удалось загрузить данные о книгах')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const book = books.find(book => book.id.toString() === id)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailChase
          size="40"
          speed="1.75"
          color="black" 
        />
      </div>
    )
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>
  }

  if (!book) {
    return (
      <div className="text-center py-10">
        <p className="text-lg mb-4">Книга не найдена</p>
        <Link 
          to="/books"
          className="inline-flex items-center text-amber-500 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Вернуться в каталог
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(book)
  }
  
  const handleWishlistToggle = () => {
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id)
    } else {
      addToWishlist(book)
    }
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        to="/books"
        className="inline-flex items-center text-gray-600 hover:text-amber-500 mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Вернуться в каталог
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative">
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
          {book.isNew && (
            <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs uppercase font-bold rounded-full px-3 py-1 shadow-md">
              Новинка
            </div>
          )}
        </div>
        
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{book.author}</p>
          
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(book.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">{book.rating} из 5</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {book.genre.map((genre, index) => (
              <span key={index} className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm">
                {genre}
              </span>
            ))}
          </div>
          
          <div className="mb-6">
            <span className="text-xl md:text-3xl font-bold text-gray-800 flex items-center">
              {book.price.toFixed(2)} <RussianRuble size={26} />
            </span>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-8">{book.description}</p>
          
          <div className="flex space-x-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-full font-medium transition-colors flex items-center justify-center"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Добавить в корзину
            </button>
            
            <button
              onClick={handleWishlistToggle}
              className={`p-3 rounded-full border transition-colors ${
                isInWishlist(book.id) ? 'bg-rose-50 border-rose-200 text-rose-500' : 'border-gray-300 text-gray-600 hover:border-amber-500 hover:text-amber-500'
              }`}
              title={isInWishlist(book.id) ? "Удалить из вишлиста" : "Добавить в вишлист"}
            >
              <Heart className={`h-5 w-5 ${isInWishlist(book.id) ? 'fill-rose-500' : ''}`} />
            </button>
            
            <button
              className="p-3 rounded-full border border-gray-300 text-gray-600 hover:border-amber-500 hover:text-amber-500 transition-colors"
              title="Поделиться"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Дата публикации</span>
              <span className="font-medium">{new Date(book.releaseDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Наличие</span>
              <span className="text-green-600 font-medium">В наличии</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailsPage