import React from 'react'
import { BookOpen, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-amber-500" />
              <span className="ml-2 text-xl font-serif font-semibold">StoryStream</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-amber-400 transition-colors">Главная</Link></li>
              <li><Link to="/books" className="text-gray-300 hover:text-amber-400 transition-colors">Каталог</Link></li>
              <li><Link to="/cart" className="text-gray-300 hover:text-amber-400 transition-colors">Корзина</Link></li>
              <li><Link to="/wishlist" className="text-gray-300 hover:text-amber-400 transition-colors">Вишлист</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Популярные жанры</h3>
            <ul className="space-y-2">
              <li><Link to="/books?genre=Классическая+литература" className="text-gray-300 hover:text-amber-400 transition-colors">Классическая литература</Link></li>
              <li><Link to="/books?genre=Мистика" className="text-gray-300 hover:text-amber-400 transition-colors">Мистика</Link></li>
              <li><Link to="/books?genre=Детектив" className="text-gray-300 hover:text-amber-400 transition-colors">Детектив</Link></li>
              <li><Link to="/books?genre=Роман" className="text-gray-300 hover:text-amber-400 transition-colors">Роман</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <span className="text-gray-300">г. Ростов-на-Дону <br /> ул. Красноармейская 11</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-gray-300">+7 951 500 65 20</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-gray-300">StoryStream@mail.ru</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 StoryStream</p>
          <div className="mt-4 md:mt-0">
            <ul className="block">
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Политика конфиденциальности</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Условия обслуживания</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Доставка</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Возврат</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer