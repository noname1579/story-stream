import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { books } from '../data/books'
import { Star, ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'
import BookGrid from '../components/BookGrid'

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  
  const book = books.find(book => book.id === id)
  
  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">Book not found</h2>
        <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/books"
          className="inline-flex items-center bg-amber-500 text-white hover:bg-amber-600 rounded-full px-6 py-3 font-medium transition-colors"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Books
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
  
  const similarBooks = books.filter(b => b.id !== book.id && b.genre.some(g => book.genre.includes(g))).slice(0, 4)
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        to="/books"
        className="inline-flex items-center text-gray-600 hover:text-amber-500 mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Books
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
              New
            </div>
          )}
        </div>
        
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
          
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(book.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">{book.rating} out of 5</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {book.genre.map((genre, index) => (
              <span key={index} className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm">
                {genre}
              </span>
            ))}
          </div>
          
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-800">${book.price.toFixed(2)}</span>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-8">{book.description}</p>
          
          <div className="flex space-x-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-full font-medium transition-colors flex items-center justify-center"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Добавить в корзину
            </button>
            
            <button
              onClick={handleWishlistToggle}
              className={`p-3 rounded-full border transition-colors ${
                isInWishlist(book.id) 
                  ? 'bg-rose-50 border-rose-200 text-rose-500' 
                  : 'border-gray-300 text-gray-600 hover:border-amber-500 hover:text-amber-500'
              }`}
              title={isInWishlist(book.id) ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart className={`h-5 w-5 ${isInWishlist(book.id) ? 'fill-rose-500' : ''}`} />
            </button>
            
            <button
              className="p-3 rounded-full border border-gray-300 text-gray-600 hover:border-amber-500 hover:text-amber-500 transition-colors"
              title="Share"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Publication Date</span>
              <span className="font-medium">{new Date(book.releaseDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Availability</span>
              <span className="text-green-600 font-medium">In Stock</span>
            </div>
          </div>
        </div>
      </div>
      
      {similarBooks.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarBooks.map(() => (
              <BookGrid books={similarBooks} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BookDetailsPage