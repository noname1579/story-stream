import React, { useState } from 'react'
import Hero from '../components/Hero'
import BookGrid from '../components/BookGrid'
import FeaturedCategories from '../components/FeaturedCategories'
import Testimonials from '../components/Testimonials'
import { getFeaturedBooks, getNewReleases, searchBooks } from '../data/books'

interface HomePageProps {
  searchQuery: string
}

const HomePage: React.FC<HomePageProps> = ({ searchQuery }) => {
  const featuredBooks = getFeaturedBooks();
  const newReleases = getNewReleases();
  const searchResults = searchQuery ? searchBooks(searchQuery) : null;

  return (
    <div>
      {!searchQuery && <Hero />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {searchQuery ? (
          <BookGrid 
            books={searchResults || []} 
            title={`Search Results for "${searchQuery}"`} 
          />
        ) : (
          <div>
            <BookGrid books={featuredBooks} title="Featured Books" />
            <BookGrid books={newReleases} title="New Releases" />
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