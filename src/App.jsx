import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Index from './components/Index';
import Calculator from './components/Calculator';
// import Iframe from './components/Iframe';
// import Index from './components/Index';

function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route exact path='/' element={<Index/>} />
        <Route path='/calculator' element={<Calculator/>} />
      </Routes>
  )
}

export default App
