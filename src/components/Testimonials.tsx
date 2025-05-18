import React from 'react'

const testimonials = [
  {
    id: 1,
    comment: "StoryStream полностью изменил мой опыт чтения. Их коллекция огромна, а рекомендации всегда точные!",
    author: "Сара Джонсон",
    avatar: "https://img.freepik.com/free-photo/medium-shot-man-wearing-glasses_23-2149396227.jpg?semt=ais_hybrid&w=740"
  },
  {
    id: 2,
    comment: "Как заядлый читатель, я пробовал много книжных магазинов, но ни один не сравнится с ассортиментом и сервисом StoryStream.",
    author: "Майкл Чен",
    avatar: "https://img.freepik.com/free-photo/portrait-interesting-young-man-winter-clothes_158595-914.jpg?semt=ais_hybrid&w=740"
  },
  {
    id: 3,
    comment: "Доставка всегда вовремя, а книги приходят в идеальном состоянии. StoryStream стал моим основным книжным магазином.",
    author: "Эмили Родригес",
    avatar: "https://img.freepik.com/free-photo/medium-shot-woman-posing-outside_23-2148877793.jpg?semt=ais_hybrid&w=740"
  }
]

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-gray-800 mb-4">Отзывы о нас</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
            <div className='flex items-center mb-4'>
              <img 
                src={testimonial.avatar} 
                alt={testimonial.author} 
                className="h-12 w-12 rounded-full object-cover mr-4"
              />
              <h4 className="font-serif font-medium text-gray-800">{testimonial.author}</h4>
            </div>
            <p className="text-gray-800 mb-2 italic">
              {testimonial.comment}
            </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials