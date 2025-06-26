import React, { useState, useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import BookGrid from '../components/BookGrid'
import { useBooks } from '../data/books'
import { Filter, X, ArrowUp, ArrowDown } from 'lucide-react'
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
          className="md:hidden flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <Filter className="h-5 w-5" />
          <span>Фильтры</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="hidden md:block">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-4">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h2 className="font-serif text-xl font-semibold text-gray-800">Фильтры</h2>
              {selectedGenre && (
                <button
                  onClick={() => setSelectedGenre('')}
                  className="text-sm text-amber-600 hover:text-amber-700 flex items-center"
                >
                  <X className="h-4 w-4 mr-1" />
                  Сбросить
                </button>
              )}
            </div>
            
            <div className="mb-8">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                <span>Жанры</span>
                <span className="ml-auto text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                  {allGenres.length}
                </span>
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedGenre('')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${selectedGenre === '' ? 'bg-amber-50 text-amber-700 font-medium' : 'hover:bg-gray-50 text-gray-600'}`}
                >
                  <span className="truncate">Все жанры</span>
                </button>
                
                {allGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center ${selectedGenre === genre ? 'bg-amber-50 text-amber-700 font-medium' : 'hover:bg-gray-50 text-gray-600'}`}
                  >
                    <span className="truncate">{genre}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {isMobileFilterOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-end">
            <div className="bg-white w-full max-w-sm h-full overflow-y-auto p-6 animate-slide-in">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h2 className="font-serif text-xl font-semibold text-gray-800">Фильтры</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mb-8">
                <h3 className="font-medium text-gray-700 mb-3">Жанры</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedGenre('')
                      setIsMobileFilterOpen(false)
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors text-sm ${selectedGenre === '' ? 'bg-amber-500 text-white font-medium' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                  >
                    Все жанры
                  </button>
                  
                  {allGenres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => {
                        setSelectedGenre(genre)
                        setIsMobileFilterOpen(false)
                      }}
                      className={`px-4 py-2 rounded-lg transition-colors text-sm ${selectedGenre === genre ? 'bg-amber-500 text-white font-medium' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-medium text-gray-700 mb-3">Сортировка</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSortBy('title')
                      setIsMobileFilterOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${sortBy === 'title' ? 'bg-amber-50 text-amber-700 font-medium border border-amber-200' : 'hover:bg-gray-50 text-gray-600 border border-gray-100'}`}
                  >
                    <span>По названию</span>
                    {sortBy === 'title' && (
                      sortOrder === 'asc' ? <ArrowUp className="h-4 w-4 ml-auto" /> : <ArrowDown className="h-4 w-4 ml-auto" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => {
                      setSortBy('price')
                      setIsMobileFilterOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${sortBy === 'price' ? 'bg-amber-50 text-amber-700 font-medium border border-amber-200' : 'hover:bg-gray-50 text-gray-600 border border-gray-100'}`}
                  >
                    <span>По цене</span>
                    {sortBy === 'price' && (
                      sortOrder === 'asc' ? <ArrowUp className="h-4 w-4 ml-auto" /> : <ArrowDown className="h-4 w-4 ml-auto" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setSortBy('rating')
                      setIsMobileFilterOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${sortBy === 'rating' ? 'bg-amber-50 text-amber-700 font-medium border border-amber-200' : 'hover:bg-gray-50 text-gray-600 border border-gray-100'}`}
                  >
                    <span>По рейтингу</span>
                    {sortBy === 'rating' && (
                      sortOrder === 'asc' ? <ArrowUp className="h-4 w-4 ml-auto" /> : <ArrowDown className="h-4 w-4 ml-auto" />
                    )}
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-lg transition-colors mt-4"
              >
                Применить фильтры
              </button>
            </div>
          </div>
        )}
        
        {/* Books Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="text-gray-600">
                <span className="font-medium text-amber-600">{filteredBooks.length}</span> книг найдено
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-sm text-gray-500">
                  Сортировка:
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSortBy('title')}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${sortBy === 'title' ? 'bg-amber-100 text-amber-700 font-medium' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                  >
                    Название
                  </button>
                  <button
                    onClick={() => setSortBy('price')}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${sortBy === 'price' ? 'bg-amber-100 text-amber-700 font-medium' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                  >
                    Цена
                  </button>
                  <button
                    onClick={() => setSortBy('rating')}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${sortBy === 'rating' ? 'bg-amber-100 text-amber-700 font-medium' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                  >
                    Рейтинг
                  </button>
                  <button
                    onClick={toggleSortOrder}
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    title={`Сортировать ${sortOrder === 'asc' ? 'по убыванию' : 'по возрастанию'}`}
                  >
                    {sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {filteredBooks.length > 0 ? (
            <>
              <BookGrid books={visibleBooks} />
              {hasMoreBooks && (
                <div className="mt-8 text-center">
                  <button
                    onClick={loadMoreBooks}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-sm hover:shadow-md"
                  >
                    Показать еще книги
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <h2 className="text-xl font-serif font-semibold text-gray-800 mb-2">Книги не найдены</h2>
              <p className="text-gray-600 mb-4">
                Попробуйте изменить критерии поиска или фильтрации
              </p>
              <button
                onClick={() => {
                  setSelectedGenre('')
                  setSortBy('title')
                  setSortOrder('asc')
                }}
                className="text-amber-600 hover:text-amber-700 font-medium flex items-center justify-center mx-auto"
              >
                <X className="h-4 w-4 mr-1" />
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BooksPage