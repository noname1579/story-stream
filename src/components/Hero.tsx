import React from 'react';
import { ChevronRight, BookOpen } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-amber-500 to-amber-600 text-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] opacity-15 bg-center bg-cover"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Your Next Favorite Book
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-lg">
              From bestsellers to hidden gems, find the perfect stories to enrich your mind and inspire your imagination.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/books" className="inline-flex items-center bg-white text-amber-600 hover:bg-gray-100 rounded-full px-6 py-3 font-medium transition-colors">
                Browse Books
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
              <a href="/featured" className="inline-flex items-center bg-transparent text-white border border-white hover:bg-white/10 rounded-full px-6 py-3 font-medium transition-colors">
                Featured Titles
              </a>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className="absolute -top-6 -left-6 w-64 h-80 bg-white/10 rounded-lg transform rotate-6 backdrop-blur-sm"></div>
            <div className="absolute top-6 left-6 w-64 h-80 bg-white/20 rounded-lg transform -rotate-3 backdrop-blur-sm"></div>
            <div className="relative bg-white p-6 rounded-lg shadow-xl transform transition-transform duration-500 hover:scale-105">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-serif text-gray-800 text-xl font-bold">Weekly Pick</h3>
                <div className="bg-amber-500 text-white text-xs uppercase font-bold rounded-full px-3 py-1">
                  Bestseller
                </div>
              </div>
              <div className="flex space-x-4">
                <img 
                  src="https://images.pexels.com/photos/4466381/pexels-photo-4466381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Book cover" 
                  className="w-24 h-36 object-cover rounded shadow"
                />
                <div>
                  <h4 className="font-serif text-gray-800 font-medium mb-1">Atomic Habits</h4>
                  <p className="text-gray-600 text-sm mb-2">James Clear</p>
                  <div className="flex text-amber-500 mb-2">
                    <span>★★★★★</span>
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    Transform your life with tiny changes that yield remarkable results.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">$19.99</span>
                <a
                  href="/books/2"
                  className="bg-amber-500 hover:bg-amber-600 text-white py-1 px-4 rounded-full text-sm transition-colors"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <BookOpen className="h-8 w-8 text-amber-500 mb-2" />
              <span className="text-2xl font-bold text-gray-800">10,000+</span>
              <span className="text-gray-600 text-sm">Books Available</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-800">24/7</span>
              <span className="text-gray-600 text-sm">Customer Support</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-800">Free</span>
              <span className="text-gray-600 text-sm">Shipping over $35</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-800">30 Days</span>
              <span className="text-gray-600 text-sm">Return Policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;