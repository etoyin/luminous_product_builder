import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Index from './components/Index';
import Calculator from './components/Calculator';
// import Index from './components/Index';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
         <Route path='/' element={<Index/>} />
         <Route path='/calculator' element={<Calculator/>} />
         {/* <Route path='/about' element={<About/>} />
         <Route path='/contact' element={<Contact/>} /> */}
       </Routes>
  )
}

export default App
