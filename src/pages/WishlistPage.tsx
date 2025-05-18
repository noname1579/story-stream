import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import BookCard from '../components/BookCard';
import { Heart, ArrowRight } from 'lucide-react';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const handleAddAllToCart = () => {
    wishlist.forEach(book => {
      addToCart(book);
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-xl mx-auto">
          <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Твой вишлист пустой</h2>
          <p className="text-gray-600 mb-6">Сохраняй свои любимые книги в вишлист</p>
          <Link 
            to="/books"
            className="inline-flex items-center bg-amber-500 text-white hover:bg-amber-600 rounded-full px-6 py-3 font-medium transition-colors"
          >
            Посмотреть все книги
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-800">Твой вишлист</h1>
        
        <button
          onClick={handleAddAllToCart}
          className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-full text-sm transition-colors"
        >
          Добавить все товары в корзину
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}

export default WishlistPage