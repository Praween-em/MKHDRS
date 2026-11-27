import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, HeartHandshake, FileText, Phone, UserPlus, ExternalLink, Flame } from 'lucide-react';

export const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/sample-maa-kaali-dharma-rakshaka";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Flame },
    { name: 'About Us', path: '/about', icon: Shield },
    { name: 'Petitions', path: '/petitions', icon: FileText, badge: 'Legal' },
    { name: 'Support & Donate', path: '/support', icon: HeartHandshake, highlight: true },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0c0f17]/95 backdrop-blur-md border-b border-amber-500/20 shadow-xl">
      {/* Top Auspicious Ticker */}
      <div className="bg-gradient-to-r from-red-950 via-amber-900 to-red-950 text-amber-200 text-xs py-1.5 px-4 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-red-500 animate-pulse font-bold">॥ ॐ क्रीं कालिकायै नमः ॥</span>
            <span className="hidden sm:inline text-amber-300/80">|</span>
            <span className="hidden sm:inline font-medium text-amber-100">धर्मो रक्षति रक्षितः — Defending Sanatana Dharma, Temples & Heritage</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href={WHATSAPP_GROUP_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Join WhatsApp Group</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-amber-500/60">|</span>
            <span className="text-amber-200/90 font-mono">Helpline: +91 98765-KAALI</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Samiti Title */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-red-950 via-red-800 to-amber-600 p-0.5 shadow-lg shadow-red-900/40 group-hover:shadow-amber-500/30 transition-all duration-300">
                <img 
                  src="./logo.svg" 
                  alt="Maa Kaali Emblem" 
                  className="w-full h-full object-contain rounded-full bg-black/80 p-0.5"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-red-600 text-amber-200 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-amber-400">
                माँ काली
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="font-serif-sacred text-base sm:text-lg lg:text-xl font-bold tracking-wider text-amber-400 group-hover:text-amber-300 transition leading-tight">
                MAA KAALI
              </span>
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-300 leading-tight">
                Hindu Dharma Rakshaka Samiti
              </span>
              <span className="text-[10px] text-amber-500/90 font-medium">
                माँ काली हिन्दू धर्म रक्षक समिति
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1.5 ${
                    active
                      ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40 shadow-sm shadow-amber-500/20'
                      : link.highlight
                      ? 'text-amber-300 hover:text-amber-200 bg-gradient-to-r from-red-900/40 to-amber-900/40 border border-amber-500/30 hover:border-amber-400'
                      : 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-900/80 text-amber-200 border border-red-700 font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* WhatsApp Group Direct CTA */}
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-lg shadow-md hover:shadow-emerald-500/25 transition transform hover:-translate-y-0.5 border border-emerald-400/40"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.976.533 2.023.815 3.149.815 3.18 0 5.767-2.587 5.768-5.766.001-3.182-2.585-5.767-5.768-5.767zm7.42 5.767c-.002 4.095-3.332 7.425-7.42 7.425-1.272 0-2.478-.328-3.535-.911l-4.526 1.187 1.209-4.417c-.675-1.127-1.047-2.433-1.047-3.784.002-4.095 3.333-7.425 7.422-7.425 4.088 0 7.417 3.33 7.417 7.425zm1.58-5.766c-1.536-1.536-3.58-2.383-5.753-2.383-4.484 0-8.134 3.65-8.136 8.135 0 1.433.374 2.833 1.085 4.066l-1.152 4.208 4.305-1.129c1.189.648 2.527.99 3.897.99 4.485 0 8.135-3.65 8.137-8.135.001-2.174-.845-4.218-2.383-5.752z" />
              </svg>
              <span>WhatsApp Group</span>
            </a>

            {/* Register Member CTA */}
            <Link
              to="/register"
              className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:to-red-500 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2 rounded-lg shadow-lg shadow-orange-600/30 hover:shadow-orange-500/50 transition transform hover:-translate-y-0.5 border border-amber-300"
            >
              <UserPlus className="w-4 h-4 text-slate-950" />
              <span>Register Member</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              to="/register"
              className="text-xs font-bold bg-amber-500 text-black px-2.5 py-1.5 rounded border border-amber-300"
            >
              Register
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1320] border-b border-amber-500/30 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  active
                    ? 'text-amber-300 bg-amber-500/20 border border-amber-500/40'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-amber-400" />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-900 text-amber-200">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-lg text-sm"
            >
              <span>Join WhatsApp Community</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-amber-500 to-red-600 text-black font-bold py-2.5 rounded-lg text-sm"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register as Volunteer / Member</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};