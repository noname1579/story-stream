import React from 'react'

const categories = [
  { id: 1, name: 'Художественная литература', icon: '📚', color: 'bg-amber-500' },
  { id: 2, name: 'Нон-фикшн', icon: '🧠', color: 'bg-teal-500' },
  { id: 3, name: 'Саморазвитие', icon: '✨', color: 'bg-indigo-500' },
  { id: 4, name: 'Научная фантастика', icon: '🚀', color: 'bg-rose-500' },
  { id: 5, name: 'Фэнтези', icon: '🐉', color: 'bg-emerald-500' },
  { id: 6, name: 'Детективы', icon: '🔍', color: 'bg-purple-500' },
  { id: 7, name: 'Биографии', icon: '👤', color: 'bg-amber-500' },
  { id: 8, name: 'Бизнес', icon: '💼', color: 'bg-blue-500' }
]

const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-gray-800 mb-4">Просмотр по категориям</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Изучите нашу обширную коллекцию книг разных жанров и найдите свою
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a 
              key={category.id}
              href={`/books?genre=${encodeURIComponent(category.name)}`}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className={`${category.color} text-white p-3 rounded-full mb-4`}>
                <span className="text-2xl" role="img" aria-label={category.name}>
                  {category.icon}
                </span>
              </div>
              <h3 className="font-serif font-medium text-gray-800">{category.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCategories