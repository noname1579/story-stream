import { useEffect } from 'react'
import { useAppDispatch } from './hooks'
import { checkAuth } from './authThunks'

const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return <>{children}</>
}

export default AuthInitializer