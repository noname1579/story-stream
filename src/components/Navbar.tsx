import React, { useEffect, useState } from 'react'
import { BookOpen, ShoppingCart, User, Heart, Search, Menu, X } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom';

interface NavbarProps {
  onSearchSubmit: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchSubmit }) => {
  const { totalItems } = useCart()
  const { isAuthenticated, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearchSubmit(searchQuery)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } 
    else {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to='/' className="flex items-center">
            <BookOpen className="h-8 w-8 text-amber-500" />
            <span className="ml-2 text-xl font-serif font-semibold text-gray-800">StoryStream</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="Поиск книги"
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute left-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </form>
            </div>

            <Link to='/' className="text-gray-700 hover:text-amber-500 px-3 py-2 rounded-md font-medium transition-colors">Главная</Link>
            <Link to='/books' className="text-gray-700 hover:text-amber-500 px-3 py-2 rounded-md font-medium transition-colors">Каталог</Link>
            <Link to='/wishlist' className="text-gray-700 hover:text-amber-500 px-3 py-2 relative">
              <Heart className="h-6 w-6" />
            </Link>
             <Link to='/cart' className="text-gray-700 hover:text-amber-500 px-3 py-2 relative">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="relative group">
                <button className="text-gray-700 hover:text-amber-500 px-3 py-2">
                  <User className="h-6 w-6" />
                </button>
                <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg hidden group-hover:block">
                  <Link to='/profile' className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">Профиль</Link>
                  <Link to='/orders' className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">Заказы</Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                  >
                    Выйти из профиля
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-amber-500 px-3 py-2">
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-amber-500 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form onSubmit={handleSearchSubmit} className="flex items-center mb-3">
              <input
                type="text"
                placeholder="Поиск книг..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute left-7">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>
            <Link to="/" onClick={() => {setIsMobileMenuOpen(!isMobileMenuOpen)}} className="text-gray-700 hover:text-amber-500 block px-3 py-2 rounded-md font-medium">
              Главная
            </Link>
             <Link to="/books" onClick={() => {setIsMobileMenuOpen(!isMobileMenuOpen)}} className="text-gray-700 hover:text-amber-500 block px-3 py-2 rounded-md font-medium">
              Каталог
            </Link>
             <Link to="/wishlist" onClick={() => {setIsMobileMenuOpen(!isMobileMenuOpen)}} className="text-gray-700 hover:text-amber-500 block px-3 py-2 rounded-md font-medium">
              Вишлист
            </Link>
            <Link to="/cart" onClick={() => {setIsMobileMenuOpen(!isMobileMenuOpen)}} className="text-gray-700 hover:text-amber-500 block px-3 py-2 rounded-md font-medium">
              Корзина ({totalItems})
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-amber-500 block px-3 py-2 rounded-md font-medium">
                  Профиль
                </Link>
                <Link to="/orders" className="text-gray-700 hover:text-amber-500 block px-3 py-2 rounded-md font-medium">
                  Заказы
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left text-gray-700 hover:text-amber-500 block px-3 py-2 rounded-md font-medium"
                >
                  Выйти из профиля
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => {setIsMobileMenuOpen(!isMobileMenuOpen)}} className="text-gray-700 hover:text-amber-500 block px-3 py-2 rounded-md font-medium">
                Войти
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar