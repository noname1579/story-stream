import React, { useState, useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import BookGrid from '../components/BookGrid'
import { useBooks } from '../data/books'
import { Filter, X } from 'lucide-react'
import { TailChase } from 'ldrs/react'
import 'ldrs/react/TailChase.css'

interface BooksPageProps {
  searchQuery: string
}

const BooksPage: React.FC<BooksPageProps> = ({ searchQuery }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortBy, setSortBy] = useState<'title' | 'price' | 'rating'>('title')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [visibleBooksCount, setVisibleBooksCount] = useState(8)
  
  const { books, loading, searchBooks } = useBooks()

  useEffect(() => {
    window.scrollTo(0, 0)
    setVisibleBooksCount(8)
  }, [searchQuery, selectedGenre, sortOrder, sortBy])

  useEffect(() => {
    const genreFromUrl = searchParams.get('genre')
    if (genreFromUrl) {
      setSelectedGenre(genreFromUrl)
    }
  }, [location.search, searchParams])

  useEffect(() => {
    if (selectedGenre) {
      searchParams.set('genre', selectedGenre)
    } else {
      searchParams.delete('genre')
    }
    setSearchParams(searchParams, { replace: true })
  }, [selectedGenre, searchParams, setSearchParams])

  const filteredBooks = React.useMemo(() => {
    let result = [...books]
    
    if (searchQuery) {
      result = searchBooks(searchQuery)
    }
    
    if (selectedGenre) {
      result = result.filter(book => book.genre.includes(selectedGenre))
    }
    
    result.sort((a, b) => {
      if (sortBy === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      } else if (sortBy === 'price') {
        return sortOrder === 'asc'
          ? a.price - b.price
          : b.price - a.price
      } else {
        return sortOrder === 'asc'
          ? a.rating - b.rating
          : b.rating - a.rating
      }
    })
    
    return result
  }, [books, searchQuery, selectedGenre, sortOrder, sortBy, searchBooks])

  const visibleBooks = filteredBooks.slice(0, visibleBooksCount)
  const hasMoreBooks = filteredBooks.length > visibleBooksCount

  const loadMoreBooks = () => {
    setVisibleBooksCount(prev => prev + 16)
  }

  const allGenres = Array.from(
    new Set(books.flatMap(book => book.genre))
  ).sort()

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailChase
          size="40"
          speed="2"
          color="black" 
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-xl md:text-3xl font-bold text-gray-800">
          {searchQuery 
            ? `Результаты поиска по запросу: "${searchQuery}"` 
            : selectedGenre 
              ? `Книги в жанре: ${selectedGenre}` 
              : 'Все книги'}
        </h1>
        
        <button
          className="md:hidden flex items-center text-gray-700 hover:text-amber-500"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <Filter className="h-5 w-5 mr-1" />
          Фильтры
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="hidden md:block">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-serif text-lg font-semibold text-gray-800 mb-4">Фильтры</h2>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Жанры</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="genre"
                    checked={selectedGenre === ''}
                    onChange={() => setSelectedGenre('')}
                    className="text-amber-500 focus:ring-amber-500"
                  />
                  <span className="ml-2 text-gray-600">Все жанры</span>
                </label>
                
                {allGenres.map((genre) => (
                  <label key={genre} className="flex items-center">
                    <input
                      type="radio"
                      name="genre"
                      checked={selectedGenre === genre}
                      onChange={() => setSelectedGenre(genre)}
                      className="text-amber-500 focus:ring-amber-500"
                    />
                    <span className="ml-2 text-gray-600">{genre}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Сортировка по</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={sortBy === 'title'}
                    onChange={() => setSortBy('title')}
                    className="text-amber-500 focus:ring-amber-500"
                  />
                  <span className="ml-2 text-gray-600">Названию</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={sortBy === 'price'}
                    onChange={() => setSortBy('price')}
                    className="text-amber-500 focus:ring-amber-500"
                  />
                  <span className="ml-2 text-gray-600">Цене</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={sortBy === 'rating'}
                    onChange={() => setSortBy('rating')}
                    className="text-amber-500 focus:ring-amber-500"
                  />
                  <span className="ml-2 text-gray-600">Рейтингу</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {isMobileFilterOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-50 flex justify-end">
            <div className="bg-white w-3/4 h-full overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-serif text-lg font-semibold text-gray-800">Фильтры</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Жанры</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="genre-mobile"
                      checked={selectedGenre === ''}
                      onChange={() => {
                        setSelectedGenre('')
                        setIsMobileFilterOpen(false)
                      }}
                      className="text-amber-500 focus:ring-amber-500"
                    />
                    <span className="ml-2 text-gray-600">Все жанры</span>
                  </label>
                  
                  {allGenres.map((genre) => (
                    <label key={genre} className="flex items-center">
                      <input
                        type="radio"
                        name="genre-mobile"
                        checked={selectedGenre === genre}
                        onChange={() => {
                          setSelectedGenre(genre)
                          setIsMobileFilterOpen(false)
                        }}
                        className="text-amber-500 focus:ring-amber-500"
                      />
                      <span className="ml-2 text-gray-600">{genre}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Сортировка по</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sortBy-mobile"
                      checked={sortBy === 'title'}
                      onChange={() => {
                        setSortBy('title')
                        setIsMobileFilterOpen(false)
                      }}
                      className="text-amber-500 focus:ring-amber-500"
                    />
                    <span className="ml-2 text-gray-600">Названию</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sortBy-mobile"
                      checked={sortBy === 'price'}
                      onChange={() => {
                        setSortBy('price')
                        setIsMobileFilterOpen(false)
                      }}
                      className="text-amber-500 focus:ring-amber-500"
                    />
                    <span className="ml-2 text-gray-600">Цене</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sortBy-mobile"
                      checked={sortBy === 'rating'}
                      onChange={() => {
                        setSortBy('rating')
                        setIsMobileFilterOpen(false)
                      }}
                      className="text-amber-500 focus:ring-amber-500"
                    />
                    <span className="ml-2 text-gray-600">Рейтингу</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
            <div className="block md:flex items-center justify-between">
              <div>
                <span className="text-gray-800 text-sm md:text-lg">
                  Показано {visibleBooks.length} из {filteredBooks.length} книг
                </span>
              </div>
              
              <div className="flex items-center mt-2 md:mt-0">
                <span className="mr-2 text-gray-600 text-sm md:text-lg">Сортировка:</span>
                <button
                  onClick={toggleSortOrder}
                  className="flex items-center text-gray-700 hover:text-amber-500 transition-colors"
                  title={`Сортировать ${sortOrder === 'asc' ? 'по убыванию' : 'по возрастанию'}`}
                >
                  {sortOrder === 'asc' 
                    ? <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2YjcyODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1hcnJvdy11cC1pY29uIGx1Y2lkZS1hcnJvdy11cCI+PHBhdGggZD0ibTUgMTIgNy03IDcgNyIvPjxwYXRoIGQ9Ik0xMiAxOVY1Ii8+PC9zdmc+" className="h-5 w-5" /> 
                    : <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2YjcyODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1hcnJvdy1kb3duLWljb24gbHVjaWRlLWFycm93LWRvd24iPjxwYXRoIGQ9Ik0xMiA1djE0Ii8+PHBhdGggZD0ibTE5IDEyLTcgNy03LTciLz48L3N2Zz4=" className="h-5 w-5" />
                  }
                </button>
              </div>
            </div>
          </div>
          
          {filteredBooks.length > 0 ? (
            <>
              <BookGrid books={visibleBooks} />
              {hasMoreBooks && (
                <div className="mt-6 text-center">
                  <button
                    onClick={loadMoreBooks}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-full transition-colors"
                  >
                    Показать еще книги
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-serif font-semibold text-gray-800 mb-2">Книги не найдены</h2>
              <p className="text-gray-600">
                Попробуйте изменить критерии поиска или фильтрации, чтобы найти то, что вы ищете
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BooksPage