import React from 'react'
import { ChevronRight, BookOpen, MessageCircleQuestion, Truck, Undo2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import TypingAnimatedText from './TypingText'
import Promotion from './Promotion'

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-amber-500 to-amber-600 text-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] opacity-15 bg-center bg-cover"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl font-bold">
              <TypingAnimatedText />
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-lg">
              От бестселлеров до скрытых жемчужин — найдите идеальные истории, которые обогатят ваш разум и вдохновят ваше воображение
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/books" className="inline-flex items-center bg-white text-amber-600 hover:bg-gray-100 rounded-full px-10 py-3 font-medium transition-colors">
                Посмотреть все книги
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              {/* <Link to="/books/1" className="inline-flex items-center bg-transparent text-white border border-white hover:bg-white/10 rounded-full px-14 md:px-14 py-3 font-medium transition-colors">
                Популярные
              </Link> */}
            </div>
          </div>

          <Promotion />

        </div>
      </div>
      
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <BookOpen className="h-8 w-8 text-amber-600 mb-2" />
              <span className="text-2xl font-bold text-gray-800">10.000+</span>
              <span className="text-gray-600 text-sm">Книг в наличии</span>
            </div>
            <div className="flex flex-col items-center">
              <MessageCircleQuestion className="h-8 w-8 text-amber-600 mb-2" />
              <span className="text-2xl font-bold text-gray-800">24/7</span>
              <span className="text-gray-600 text-sm">Поддержка клиенктов</span>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-8 w-8 text-amber-600 mb-2" />
              <span className="text-2xl font-bold text-gray-800">Бесплатная</span>
              <span className="text-gray-600 text-sm">Доставка к вашему дому</span>
            </div>
            <div className="flex flex-col items-center">
              <Undo2 className="h-8 w-8 text-amber-600 mb-2" />
              <span className="text-2xl font-bold text-gray-800">30 Дней</span>
              <span className="text-gray-600 text-sm">Возврат товара</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero