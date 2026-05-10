import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from './firebase'
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
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setUserProfile(null)
      setIsAuthenticated(Boolean(user))
      setAuthReady(true)
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    if (!currentUser) {
      return undefined
    }

    const profileRef = doc(db, 'users', currentUser.uid)
    const unsubscribe = onSnapshot(profileRef, (snapshot) => {
      setUserProfile(snapshot.exists() ? snapshot.data() : null)
    })

    return unsubscribe
  }, [currentUser])

  const handleSignIn = async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password)
    setAuthScreen('login')
    setActivePage('home')
  }

  const handleCreateAccount = async ({ fullName, businessName, email, phone, password, industry }) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password)

    try {
      await updateProfile(credential.user, {
        displayName: fullName,
      })

      await setDoc(doc(db, 'users', credential.user.uid), {
        uid: credential.user.uid,
        fullName,
        businessName,
        email,
        phone,
        industry,
        createdAt: serverTimestamp(),
      })

      await signOut(auth)
    } catch (error) {
      await deleteUser(credential.user)
      throw error
    }

    setCurrentUser(null)
    setIsAuthenticated(false)
    setAuthScreen('login')
    setActivePage('home')
  }

  const handleLogout = async () => {
    await signOut(auth)
    setCurrentUser(null)
    setIsAuthenticated(false)
    setActivePage('home')
    setAuthScreen('login')
  }

  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f4f4] text-slate-600">
        Connecting to Firebase...
      </div>
    )
  }

  if (!isAuthenticated) {
    if (authScreen === 'signup') {
      return (
        <Signup
          onCreateAccount={handleCreateAccount}
          onBackToLogin={() => setAuthScreen('login')}
        />
      )
    }

    return <Login onSignIn={handleSignIn} onCreateAccount={() => setAuthScreen('signup')} />
  }

  if (activePage === 'pos') {
    return <Pos activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} user={currentUser} profile={userProfile} />
  }

  if (activePage === 'inventory') {
    return <Inventory activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} user={currentUser} profile={userProfile} />
  }

  if (activePage === 'analytics') {
    return <Analytics activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} user={currentUser} profile={userProfile} />
  }

  if (activePage === 'ai-insights') {
    return <AiInsights activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} user={currentUser} profile={userProfile} />
  }

  if (activePage === 'settings') {
    return <Settings activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} user={currentUser} profile={userProfile} />
  }

  return <Overview activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} user={currentUser} profile={userProfile} />
}

export default App
