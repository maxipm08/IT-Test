import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './assets/Login.jsx'
import BeerList from './assets/BeerList.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/BeerList' element={<BeerList />}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
