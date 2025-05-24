import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BookDetailsPage from './pages/BookDetailsPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/404'
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import AuthInitializer from './store/AuthInitializer';
import { useDispatch } from 'react-redux';
import { checkAuth } from './store/authThunks';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
  };

  const dispatch = useDispatch();
  
  useEffect(() => {
    const checkUser_Auth = async () => {
      const resultAction = await dispatch(checkAuth())
      if (checkAuth.fulfilled.match(resultAction)) {
        console.log('Пользователь залогинен:', resultAction.payload)
      } else {
        console.log('Пользователь не залогинен:', resultAction.payload);
      }
    };
    checkUser_Auth();
  }, [dispatch]);

  return (
    <AuthInitializer>
      <Router>
        <CartProvider>
          <WishlistProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar onSearchSubmit={handleSearchSubmit} />
              <main className="flex-grow bg-gray-50">
                <Routes>
                  <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
                  <Route path="/books" element={<BooksPage searchQuery={searchQuery} />} />
                  <Route path="/books/:id" element={<BookDetailsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path='*' element={<NotFoundPage />}></Route>
                </Routes>
              </main>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </Router>
    </AuthInitializer>
  );
}

export default App;
