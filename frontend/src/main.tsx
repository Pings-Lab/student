import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './auth/Auth.tsx'
import Dashboard from './pages/Dashboard.tsx';

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
      <BrowserRouter>
        <Routes >
          <Route element={<ProtectedRoute/>}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<PublicRoute redirectPath="/dashboard" />}> 
          <Route path="/" element={<App />} />
            <Route path="/auth" element={<Auth />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
