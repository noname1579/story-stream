import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import BooksPage from './pages/BooksPage'
import BookDetailsPage from './pages/BookDetailsPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import LoginPage from './pages/LoginPage'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import { WishlistProvider } from './contexts/WishlistContext'

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
  }

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar onSearchSubmit={handleSearchSubmit} />
              <main className="flex-grow bg-gray-50">
                <Routes>
                  <Route path="/story-stream/" element={<HomePage searchQuery={searchQuery} />} />
                  <Route path="/story-stream/books" element={<BooksPage searchQuery={searchQuery} />} />
                  <Route path="/story-stream/books/:id" element={<BookDetailsPage />} />
                  <Route path="/story-stream/cart" element={<CartPage />} />
                  <Route path="/story-stream/wishlist" element={<WishlistPage />} />
                  <Route path="/story-stream/login" element={<LoginPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App