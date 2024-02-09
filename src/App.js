import React from 'react'
import Header from './components/Header'
import Login from "./components/Login";
import Register from "./components/Register";
import {Routes,Route} from 'react-router-dom'


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </div>
  )
}

export default App


