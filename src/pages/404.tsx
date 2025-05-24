import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4"
    >
      <div className="text-center max-w-md">
        <motion.div
          animate={{ 
            scale: [0.6, 0.7, 0.6],
            rotate: [0, 7, -7, 0]
          }}
          transition={{ repeat: Infinity, duration: 5 }}
        >
          <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
        </motion.div>
        
        <h2 className="text-3xl font-semibold text-gray-700 mb-2">
          Страница не найдена
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          Кажется, мы не можем найти страницу, которую вы ищете. Возможно, она была перемещена или удалена.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-amber-600 text-white rounded-lg shadow-md hover:bg-amber-700 transition-colors font-medium"
        >
          Вернуться на главную
        </motion.button>
        
        <div className="my-5 text-gray-500">
          <p>или</p>
          <div className="flex justify-center mt-2">
            <button 
              onClick={() => window.location.reload()}
              className="text-indigo-600 hover:underline text-md"
            >
              Обновить страницу
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}