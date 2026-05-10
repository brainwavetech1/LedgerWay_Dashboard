import { getAnalytics, isSupported } from 'firebase/analytics'
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase web app configuration for LedgerWay.
const firebaseConfig = {
  apiKey: 'AIzaSyCc1BZrdEeHtZVx0PFrWo4pQfjE4Aevysc',
  authDomain: 'ledgerway001.firebaseapp.com',
  projectId: 'ledgerway001',
  storageBucket: 'ledgerway001.firebasestorage.app',
  messagingSenderId: '213060619880',
  appId: '1:213060619880:web:4b07aaaa176d3ba547b5dd',
  measurementId: 'G-KQEFL7LQWM',
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const analytics = (await isSupported()) ? getAnalytics(app) : null

export { app, analytics, auth, db }