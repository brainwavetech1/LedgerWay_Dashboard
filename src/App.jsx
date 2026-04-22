import { useState } from 'react'
import Overview from './components/Dashboard/overview'
import Pos from './components/Dashboard/pos'
import Inventory from './components/Dashboard/inventory'
import Analytics from './components/Dashboard/analytics'
import AiInsights from './components/Dashboard/ai_insights'
import Settings from './components/Dashboard/settings'
import Login from './components/Credentials/login'
import Signup from './components/Credentials/signup'

function App() {
  const [activePage, setActivePage] = useState('home')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authScreen, setAuthScreen] = useState('login')

  const handleLogout = () => {
    setIsAuthenticated(false)
    setActivePage('home')
    setAuthScreen('login')
  }

  if (!isAuthenticated) {
    if (authScreen === 'signup') {
      return (
        <Signup
          onCreateAccount={() => setIsAuthenticated(true)}
          onBackToLogin={() => setAuthScreen('login')}
        />
      )
    }

    return <Login onSignIn={() => setIsAuthenticated(true)} onCreateAccount={() => setAuthScreen('signup')} />
  }

  if (activePage === 'pos') {
    return <Pos activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
  }

  if (activePage === 'inventory') {
    return <Inventory activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
  }

  if (activePage === 'analytics') {
    return <Analytics activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
  }

  if (activePage === 'ai-insights') {
    return <AiInsights activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
  }

  if (activePage === 'settings') {
    return <Settings activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
  }

  return <Overview activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
}

export default App
