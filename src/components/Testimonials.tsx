import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Testimonials: React.FC = () => {
  interface Comment {
    id: number,
    comment: string,
    author: string,
    avatar?: string
  }

  const [data, setData] = useState<Comment[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://story-stream-server.vercel.app/comments')
        setData(response.data)
      } catch (error) {
        console.error('Ошибка загрузки комментариев :/')
      }
    }

    fetchData()
  }, [])

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-gray-800 mb-4">Отзывы о нас</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((data) => (
            <div
              key={data.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
            <div className='flex items-center mb-4'>
              <img 
                src={data.avatar} 
                alt={data.author} 
                className="h-12 w-12 rounded-full object-cover mr-4"
              />
              <h4 className="font-serif font-medium text-gray-800">{data.author}</h4>
            </div>
            <p className="text-gray-800 mb-2 italic">
              {data.comment}
            </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials