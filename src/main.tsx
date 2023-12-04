// import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
