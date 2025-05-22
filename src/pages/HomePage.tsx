import Hero from '../components/Hero'
import BookGrid from '../components/BookGrid'
import FeaturedCategories from '../components/FeaturedCategories'
import Testimonials from '../components/Testimonials'
import { useBooks } from '../data/books'
import { TailChase } from 'ldrs/react'




interface HomePageProps {
  searchQuery: string
}

const HomePage: React.FC<HomePageProps> = ({ searchQuery }) => {
  
  const { getFeaturedBooks, getNewReleases, searchBooks, loading } = useBooks()
  const featuredBooks = getFeaturedBooks()
  const newReleases = getNewReleases()
  const searchResults = searchQuery ? searchBooks(searchQuery) : null

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
    <div>
      {!searchQuery && <Hero />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {searchQuery ? (
          <BookGrid 
            books={searchResults || []} 
          />
        ) : (
          <div>
            <BookGrid books={featuredBooks} title="Рекомендуемые книги" />
            <BookGrid books={newReleases} title="Новинки" />
          </div>
        )}
      </div>
      
      {!searchQuery && (
        <>
          <FeaturedCategories />
          <Testimonials />
        </>
      )}
    </div>
  )
}

export default HomePage