import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppButton';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Petitions } from './pages/Petitions';
import { Support } from './pages/Support';
import { Contact } from './pages/Contact';
import { Register } from './pages/Register';
import { Terms } from './pages/Terms';
import { Admin } from './pages/Admin';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#0a0d16] text-slate-100 selection:bg-amber-500 selection:text-black">
        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Page Views */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/petitions" element={<Petitions />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Floating WhatsApp Direct Connection Button */}
        <WhatsAppFloatingButton />

        {/* Site Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;