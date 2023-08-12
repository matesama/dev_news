import { useState } from 'react'
import './App.css'
import SearchData from './components/SearchData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
       <SearchData />
      </div>
    </>
  )
}

export default App
