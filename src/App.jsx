import { useState } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Form from './components/Form'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path ="/signup" element={<Signup/>}></Route>
          <Route path = "/form" element = {<Form/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
