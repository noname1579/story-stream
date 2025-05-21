import { Book } from '../types'

export const books: Book[] = [
  {
    id: '1',
    title: 'Ночная библиотека',
    author: 'Мэтт Хэйг',
    description: 'Между жизнью и смертью есть библиотека, и в этой библиотеке полки продолжаются вечно. Каждая книга предоставляет шанс попробовать другую жизнь, которую вы могли бы прожить. Увидеть, как бы все обстояло, если бы вы сделали другие выборы... Сделали бы вы что-то иначе, если бы у вас была возможность исправить свои сожаления?',
    price: 2499,
    coverImage: 'https://imo10.labirint.ru/books/777465/cover.jpg/242-0',
    genre: ['Художественная литература', 'Фэнтези', 'Современная проза'],
    rating: 4.5,
    releaseDate: '2020-08-13',
    isNew: false,
    isFeatured: true
  },
  {
    id: '2',
    title: '1984',
    author: 'Джордж Оруэлл',
    description: 'Роман, описывающий тоталитарное общество, где правительство контролирует все аспекты жизни граждан. Главный герой, Уинстон Смит, пытается противостоять системе и найти свою индивидуальность.',
    price: 1999,
    coverImage: 'https://anylang.net/sites/default/files/covers/1984.jpg',
    genre: ['Фантастика', 'Социальная драма'],
    rating: 4.8,
    releaseDate: '1949-06-08',
    isNew: true,
    isFeatured: true
  },
  {
    id: '3',
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    description: 'Роман, в котором переплетаются судьбы нескольких персонажей, включая дьявола, который приходит в Москву, и историю любви между Мастером и Маргаритой.',
    price: 2999,
    coverImage: 'https://content.img-gorod.ru/pim/products/images/a0/cd/0190b9a3-724a-71e0-9c86-4fe230cea0cd.jpg?width=0&height=1200&fit=bounds',
    genre: ['Роман', 'Фантастика'],
    rating: 4.9,
    releaseDate: '1967-01-01',
    isNew: false,
    isFeatured: true
  },
  {
    id: '4',
    title: 'Война и мир',
    author: 'Лев Толстой',
    description: 'Эпический роман, охватывающий события Наполеоновских войн и их влияние на жизнь русских аристократов.',
    price: 3499,
    genre: ['Исторический роман'],
    coverImage: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/ecbb3822-ee34-42f6-8480-e0920b41a050/600x900',
    rating: 4.7,
    releaseDate: '1869-01-01',
    isNew: false,
    isFeatured: true
  },
]

export const getBooksByGenre = (genre: string): Book[] => {
  return books.filter(book => book.genre.includes(genre));
}

export const getFeaturedBooks = (): Book[] => {
  return books.filter(book => book.isFeatured);
}

export const getNewReleases = (): Book[] => {
  return books.filter(book => book.isNew);
}

export const searchBooks = (query: string): Book[] => {
  const lowerCaseQuery = query.toLowerCase();
  return books.filter(
    book => 
      book.title.toLowerCase().includes(lowerCaseQuery) || 
      book.author.toLowerCase().includes(lowerCaseQuery) ||
      book.genre.some(g => g.toLowerCase().includes(lowerCaseQuery))
  )
}