import React, { useState, useEffect } from 'react'
import { Book } from '../types'
import BookGrid from '../components/BookGrid';
import { books, searchBooks } from '../data/books'
import { Filter, SortAsc, SortDesc } from 'lucide-react'

interface BooksPageProps {
  searchQuery: string;
}

const BooksPage: React.FC<BooksPageProps> = ({ searchQuery }) => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortBy, setSortBy] = useState<'title' | 'price'>('title')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Extract all unique genres from books
  const allGenres = Array.from(
    new Set(
      books.flatMap(book => book.genre)
    )
  ).sort();

  useEffect(() => {
    let result = [...books]
    
    if (searchQuery) {
      result = searchBooks(searchQuery);
    }
    
    // Apply genre filter if selected
    if (selectedGenre) {
      result = result.filter(book => book.genre.includes(selectedGenre))
    }
    
    result.sort((a, b) => {
      if (sortBy === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      } else {
        return sortOrder === 'asc'
          ? a.price - b.price
          : b.price - a.price;
      }
    })
    
    setFilteredBooks(result);
  }, [searchQuery, selectedGenre, sortOrder, sortBy])

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-800">
          {searchQuery ? `Результаты поиск по запросу: "${searchQuery}"` : selectedGenre ? `Книги в жанре ${selectedGenre}` : 'Все книги'}
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
                  <div className="h-5 w-5" />
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
                        setSelectedGenre('');
                        setIsMobileFilterOpen(false);
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
                          setSelectedGenre(genre);
                          setIsMobileFilterOpen(false);
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
                        setSortBy('title');
                        setIsMobileFilterOpen(false);
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
                        setSortBy('price');
                        setIsMobileFilterOpen(false);
                      }}
                      className="text-amber-500 focus:ring-amber-500"
                    />
                    <span className="ml-2 text-gray-600">Цене</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-600">Показано {filteredBooks.length} книг</span>
              </div>
              
              <div className="flex items-center">
                <span className="mr-2 text-gray-600">Сортировка:</span>
                <button
                  onClick={toggleSortOrder}
                  className="flex items-center text-gray-700 hover:text-amber-500 transition-colors"
                  title={`Sort ${sortOrder === 'asc' ? 'по убыванию' : 'по возрастанию'}`}
                >
                  {sortOrder === 'asc' 
                    ? <SortAsc className="h-5 w-5" /> 
                    : <SortDesc className="h-5 w-5" />
                  }
                </button>
              </div>
            </div>
          </div>
          
          {filteredBooks.length > 0 ? (
            <BookGrid books={filteredBooks} />
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
  );
};

export default BooksPage;