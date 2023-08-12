import { useState } from 'react'
import './App.css'
import SearchData from './components/SearchData'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Dev News</h1>
        <SearchData />
      </div>
    </>
  )
}

export default App
