import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { Auth, Error, Home } from './pages'
import { useEffect } from 'react'
import { checkSign } from './helpers/storage'
import authService from './service/auth'
import { useDispatch } from 'react-redux'
import {  signInToken } from './slice/auth'

function App() {
  const dispatch = useDispatch()

  const getUser = async () => {
    try {
      const response = await authService.getUser()
      dispatch(signInToken(response))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const sign = checkSign('Sign')
    if (sign) {
      getUser()
    }
  }, [])
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/*' element={<Error />} />
      </Routes>
      < div className='restangle'>
        <svg
          className='svg'
          xmlns="http://www.w3.org/2000/svg"
          // width="1115"
          // height="1024"
          viewBox="0 0 1115 1024"
          fill="none">
          <path d="M0 0H1072.5L1103.2 37.9667C1118.42 56.7948 1117.96 83.8246 1102.12 102.13L304 1024H0V0Z" fill="#333333" />
        </svg>
      </div >
    </div >
  )
}

export default App
