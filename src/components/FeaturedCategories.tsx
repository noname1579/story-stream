import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Ghost, Rocket, Castle, Scroll, ShieldAlert, Book, Sparkles, Search, Briefcase } from 'lucide-react'

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

const iconComponents: Record<string, JSX.Element> = {
  Ghost: <Ghost className="w-5 h-5" />,
  Rocket: <Rocket className="w-5 h-5" />,
  Castle: <Castle className="w-5 h-5" />,
  Scroll: <Scroll className="w-5 h-5" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5" />,
  Book: <Book className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />
}

const FeaturedCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://story-stream-server.vercel.app/jenres')
        if (!response.ok) throw new Error('Ошибка загрузки категорий')
        const data = await response.json()
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка :/')
      }
    }

    fetchCategories()
  }, [])

  if (error) {
    return (
      <div className="py-12 text-center text-red-500 text-lg">
        {error} :/
      </div>
    )
  }

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
            <Link 
              key={category.id}
              to={`/books?genre=${encodeURIComponent(category.name)}`}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className={`${category.color} text-white p-3 rounded-full mb-4`}>
                <div className="w-6 h-6 flex items-center justify-center">
                  {iconComponents[category.icon] || <Book className="w-5 h-5" />}
                </div>
              </div>
              <h3 className="font-serif font-medium text-gray-800 text-center">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCategories