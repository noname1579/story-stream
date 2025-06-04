import { BadgePercent, RussianRuble } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import { motion } from 'framer-motion'

interface Book {
  id: number
  title: string
  author: string
  description: string
  price: number
  coverImage: string
  rating: number
}

const Promotion: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRandomBook = async () => {
      try {
        const response = await axios.get<Book[]>('https://story-stream-server.vercel.app/books')
        
        const today = new Date()
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
        
        const randomIndex = seed % response.data.length
        const selectedBook = response.data[randomIndex]
        
        setBook(selectedBook)
      } catch (err) {
        setError(axios.isAxiosError(err) 
          ? err.message 
          : 'Произошла неизвестная ошибка :/')
      }
    }

    fetchRandomBook()
  }, []);

  if (error) {
    return <div className="hidden md:block p-6 text-red-500"></div>
  }

  if (!book) {
    return <div className="hidden md:block p-6"></div>
  }

  const discountedPrice = Math.round(book.price * 0.85) // скидк 15%

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2.8 }}
    className="hidden md:block relative"
    >
    <div className="hidden md:block relative">
      <div className="relative bg-white p-6 rounded-lg shadow-xl transform transition-transform duration-500 hover:scale-105">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-serif text-gray-800 text-xl font-bold flex items-center">
            Ежедневная акция <BadgePercent className='ml-2' />
          </h3>
          <div className="bg-amber-500 text-white text-xs uppercase font-bold rounded-full px-3 py-1">
            Бестселлер
          </div>
        </div>
        <div className="flex space-x-4">
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="w-24 h-36 object-cover rounded shadow"
          />
          <div>
            <h4 className="font-serif text-gray-800 text-lg font-medium mb-1">{book.title}</h4>
            <p className="text-gray-600 text-md mb-2">{book.author}</p>
            <div className="flex text-amber-500 mb-2">
              <span>{'★'.repeat(Math.round(book.rating))}</span>
            </div>
            <p className="text-gray-700 text-sm line-clamp-3">
              {book.description}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-lg font-bold text-gray-800 flex">
              {discountedPrice} <RussianRuble className='text-gray-600' />
            </span>
            <span className="ml-2 text-sm text-gray-500 line-through flex">
              {book.price} <RussianRuble className='text-gray-400 w-5 h-5' />
            </span>
          </div>
          <Link 
            to={`/books/${book.id}`} 
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full text-sm transition-colors"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
    </motion.div>
  )
}
 
export default Promotion