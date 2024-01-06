import { useState } from 'react'

import {BrowserRouter , Routes, Route} from 'react-router-dom'


import Dashboard from './components/Dashboard'
import SinglePoll from './components/SinglePoll'
import CreatePoll from './components/CreatePoll'
import LikedPoll from './components/LikedPoll'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <nav className="navbar font d-flex justify-content-center mt-2 p-4 mb-2 text-white navbar-dark bg-dark">
      Voting Dojo
    </nav>
    <Routes>
      <Route path='/' element={<Dashboard />}/>
      <Route path='/votes' element={<Dashboard />}/>
      <Route path='/vote/create' element={<CreatePoll />}/>
      <Route path='/vote/:id' element={<SinglePoll />}/>
      <Route path='/vote/edit/:id' element={<LikedPoll />}/>

    </Routes>
      
    </BrowserRouter>
  )
}

export default App
