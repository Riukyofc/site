import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { CartSidebar } from './components/layout/CartSidebar';
import './App.css';

// Lazy load rotas administrativas para economizar bundle inicial
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(module => ({ default: module.AdminDashboard })));

// Loading Premium Fallback
const PageLoader = () => (
  <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-t-2 border-[#00BFFF] animate-spin"></div>
      <div className="absolute inset-2 rounded-full border-b-2 border-[#FF1493] animate-[spin_1.5s_linear_infinite_reverse]"></div>
      <div className="absolute inset-4 rounded-full border-l-2 border-[#8B5CF6] animate-[spin_2s_linear_infinite]"></div>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <CartSidebar />
          <Router>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Rota Pública do Site */}
                <Route path="/" element={<LandingPage />} />
                
                {/* Rotas Administrativas */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Suspense>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
