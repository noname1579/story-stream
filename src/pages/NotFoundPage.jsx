import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <div>
      <h1>404</h1>
      <Link to="/">
        Вернуться на главную
      </Link>
    </div>
  )
}

export default NotFoundPage()