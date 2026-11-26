import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CMSProvider } from './context/CMSContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import ShowroomPage from './pages/ShowroomPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';

const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F4] text-[#292520]">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <CMSProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/products/:slug" element={<ProductPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/showrooms" element={<ShowroomPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Layout>
        </HashRouter>
      </CMSProvider>
    </AuthProvider>
  );
};

export default App;
