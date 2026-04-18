import { useState } from 'react'
import Overview from './components/Dashboard/overview'
import Pos from './components/Dashboard/pos'

function App() {
  const [activePage, setActivePage] = useState('home')

  if (activePage === 'pos') {
    return <Pos activePage={activePage} onNavigate={setActivePage} />
  }

  return <Overview activePage={activePage} onNavigate={setActivePage} />
}

export default App
