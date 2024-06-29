import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Index from './components/Index';
// import Index from './components/Index';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Index />
    </div>
  )
}

export default App
