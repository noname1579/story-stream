import { Book } from '../types';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?',
    price: 24.99,
    coverImage: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: ['Fiction', 'Fantasy', 'Contemporary'],
    rating: 4.5,
    releaseDate: '2020-08-13',
    isNew: false,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    price: 19.99,
    coverImage: 'https://images.pexels.com/photos/4466381/pexels-photo-4466381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: ['Self-Help', 'Productivity', 'Psychology'],
    rating: 4.8,
    releaseDate: '2018-10-16',
    isNew: false,
    isFeatured: true
  },
  {
    id: '3',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn\'t know that. He can\'t even remember his own name, let alone the nature of his assignment or how to complete it.',
    price: 28.99,
    coverImage: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: ['Science Fiction', 'Adventure', 'Space'],
    rating: 4.7,
    releaseDate: '2021-05-04',
    isNew: true,
    isFeatured: true
  },
  {
    id: '4',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    description: 'A tale of gods, kings, immortal fame, and the human heart, The Song of Achilles is a dazzling literary feat that brilliantly reimagines Homer\'s enduring masterwork, The Iliad.',
    price: 16.99,
    coverImage: 'https://images.pexels.com/photos/8395554/pexels-photo-8395554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: ['Historical Fiction', 'Fantasy', 'Romance'],
    rating: 4.6,
    releaseDate: '2012-03-06',
    isNew: false,
    isFeatured: false
  },
  {
    id: '5',
    title: 'The Invisible Life of Addie LaRue',
    author: 'V.E. Schwab',
    description: 'A Life No One Will Remember. A Story You Will Never Forget. France, 1714: in a moment of desperation, a young woman makes a Faustian bargain to live forever—and is cursed to be forgotten by everyone she meets.',
    price: 22.99,
    coverImage: 'https://images.pexels.com/photos/3747163/pexels-photo-3747163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: ['Fantasy', 'Historical Fiction', 'Romance'],
    rating: 4.4,
    releaseDate: '2020-10-06',
    isNew: false,
    isFeatured: false
  },
  {
    id: '6',
    title: 'The Four Winds',
    author: 'Kristin Hannah',
    description: 'From the number-one bestselling author of The Nightingale and The Great Alone comes a powerful American epic about love and heroism and hope, set during the Great Depression, a time when the country was in crisis and at war with itself, when millions were out of work and even the land seemed to have turned against them.',
    price: 26.99,
    coverImage: 'https://images.pexels.com/photos/7034674/pexels-photo-7034674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: ['Historical Fiction', 'Drama'],
    rating: 4.3,
    releaseDate: '2021-02-02',
    isNew: true,
    isFeatured: false
  },
  {
    id: '7',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    description: 'For years, rumors of the "Marsh Girl" have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl.',
    price: 15.99,
    coverImage: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: ['Fiction', 'Mystery', 'Coming of Age'],
    rating: 4.7,
    releaseDate: '2018-08-14',
    isNew: false,
    isFeatured: true
  },
  {
    id: '8',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    description: 'Timeless lessons on wealth, greed, and happiness. Doing well with money isn\'t necessarily about what you know. It\'s about how you behave. And behavior is hard to teach, even to really smart people.',
    price: 18.99,
    coverImage: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    genre: ['Finance', 'Psychology', 'Self-Help'],
    rating: 4.7,
    releaseDate: '2020-09-08',
    isNew: false,
    isFeatured: false
  }
];

export const getBooksByGenre = (genre: string): Book[] => {
  return books.filter(book => book.genre.includes(genre));
};

export const getFeaturedBooks = (): Book[] => {
  return books.filter(book => book.isFeatured);
};

export const getNewReleases = (): Book[] => {
  return books.filter(book => book.isNew);
};

export const searchBooks = (query: string): Book[] => {
  const lowerCaseQuery = query.toLowerCase();
  return books.filter(
    book => 
      book.title.toLowerCase().includes(lowerCaseQuery) || 
      book.author.toLowerCase().includes(lowerCaseQuery) ||
      book.genre.some(g => g.toLowerCase().includes(lowerCaseQuery))
  );
};