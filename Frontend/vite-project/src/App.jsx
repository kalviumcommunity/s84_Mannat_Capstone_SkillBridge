import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Dashboard from './components/Dashboard/Dashboard'
import Footer from './components/Footer/Footer'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <main>
                <Hero />
              </main>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/features" element={
              <ProtectedRoute>
                <div>Features Page</div>
              </ProtectedRoute>
            } />
            <Route path="/jobs" element={
              <ProtectedRoute>
                <div>Jobs Page</div>
              </ProtectedRoute>
            } />
            <Route path="/learn" element={
              <ProtectedRoute>
                <div>Learning Hub</div>
              </ProtectedRoute>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
