import { useEffect, useState } from 'react'
import { Book } from '../types'
import axios from 'axios'

export const GetFeaturedBooks = (books: Book[]): Book[] => 
  books.filter(book => book.isFeatured);

export const GetNewReleases = (books: Book[]): Book[] => 
  books.filter(book => book.isNew);

export const SearchBooks = (books: Book[], query: string): Book[] => {
  if (!query.trim()) return books;
  const q = query.toLowerCase();
  return books.filter(book => 
    book.title.toLowerCase().includes(q) || 
    book.author.toLowerCase().includes(q)
  )
}

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://story-stream-server.vercel.app/books')
        setBooks(response.data)
      } catch (err) {
        console.error(err)
        setError('Ошибка загрузки книг :/')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  

  const getBooksByGenre = (genre: string): Book[] => {
    return books.filter(book => 
      book.genre?.map(g => g.toLowerCase()).includes(genre.toLowerCase())
    )
  }

  const getFeaturedBooks = (): Book[] => {
    return books.filter(book => book.isFeatured)
  }

  const getNewReleases = (): Book[] => {
    return books.filter(book => book.isNew)
  }

  const searchBooks = (query: string): Book[] => {
    if (!query.trim()) return books
    
    const lowerCaseQuery = query.toLowerCase()
    return books.filter(book => 
      book.title?.toLowerCase().includes(lowerCaseQuery) || 
      book.author?.toLowerCase().includes(lowerCaseQuery) ||
      book.genre?.some(g => g.toLowerCase().includes(lowerCaseQuery))
    )
  }

  return {
    books,
    loading,
    error,
    getBooksByGenre,
    getFeaturedBooks,
    getNewReleases,
    searchBooks
  }
}