import React from 'react'
import { Book } from '../types'
import { Heart, ShoppingCart } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  
  const handleAddToCart = () => {
    addToCart(book);
  };
  
  const handleWishlistToggle = () => {
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg h-full flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-full object-cover object-center"
        />
        {book.isNew && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs uppercase font-bold rounded-full px-3 py-1 shadow-md">
            Новая
          </div>
        )}
        <button 
          onClick={handleWishlistToggle}
          className="absolute top-2 left-2 p-1 rounded-full bg-white/70 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
        >
          <Heart 
            className={`h-5 w-5 ${isInWishlist(book.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-700'}`} 
          />
        </button>
      </div>
      
      <div className="p-2 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-serif text-lg font-medium text-gray-800 mb-1 line-clamp-2">{book.title}</h3>
            <div className="flex items-center text-amber-600 ml-2">
              <span className="text-sm">★</span>
              <span className="text-md ml-1">{book.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-2">{book.author}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {book.genre.slice(0, 2).map((genre, index) => (
              <span key={index} className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded">
                {genre}
              </span>
            ))}
          </div>
          <p className="text-gray-700 text-sm line-clamp-3 mb-4">{book.description}</p>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-gray-800">{book.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="flex items-center bg-amber-500 hover:bg-amber-600 text-white py-1 px-2 rounded-full transition-colors text-sm"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;