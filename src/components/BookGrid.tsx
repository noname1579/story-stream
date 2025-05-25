import React from 'react'
import { Book } from '../types'
import BookCard from './BookCard'

interface BookGridProps {
  books: Book[]
  title?: string
  maxItems?: number
}

const BookGrid: React.FC<BookGridProps> = ({ books, title, maxItems }) => {
  
  const displayedBooks = maxItems ? books.slice(0, maxItems) : books

  return (
    <div className="my-8">
      {title && (
        <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}

export default BookGrid