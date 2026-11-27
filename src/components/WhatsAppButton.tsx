import React, { useState } from 'react';
import { ExternalLink, MessageCircle, X, Users, ShieldCheck } from 'lucide-react';
import { WHATSAPP_GROUP_LINK } from './Navbar';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Tooltip badge */}
        {showTooltip && (
          <div className="mb-2 bg-[#0c121e] text-slate-100 text-xs py-2 px-3.5 rounded-xl border border-emerald-500/40 shadow-2xl max-w-xs animate-fadeIn relative">
            <button 
              onClick={() => setShowTooltip(false)} 
              className="absolute -top-1.5 -right-1.5 bg-slate-800 rounded-full p-0.5 text-slate-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="font-bold text-emerald-400 flex items-center space-x-1">
              <span>Maa Kaali WhatsApp Group</span>
            </p>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Connect with 50,000+ Sanatana Dharma Rakshaks across Bharat for immediate alerts & seva.
            </p>
          </div>
        )}

        <div className="relative group">
          {/* Pulsing Aura */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-60 blur-md group-hover:opacity-100 animate-pulse transition"></span>
          
          <button
            onClick={() => setShowModal(true)}
            onMouseEnter={() => setShowTooltip(true)}
            className="relative flex items-center space-x-2 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white font-bold p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl border-2 border-emerald-300 hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Join Official WhatsApp Group"
          >
            {/* WhatsApp SVG Icon */}
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.976.533 2.023.815 3.149.815 3.18 0 5.767-2.587 5.768-5.766.001-3.182-2.585-5.767-5.768-5.767zm7.42 5.767c-.002 4.095-3.332 7.425-7.42 7.425-1.272 0-2.478-.328-3.535-.911l-4.526 1.187 1.209-4.417c-.675-1.127-1.047-2.433-1.047-3.784.002-4.095 3.333-7.425 7.422-7.425 4.088 0 7.417 3.33 7.417 7.425zm1.58-5.766c-1.536-1.536-3.58-2.383-5.753-2.383-4.484 0-8.134 3.65-8.136 8.135 0 1.433.374 2.833 1.085 4.066l-1.152 4.208 4.305-1.129c1.189.648 2.527.99 3.897.99 4.485 0 8.135-3.65 8.137-8.135.001-2.174-.845-4.218-2.383-5.752z" />
            </svg>
            <span className="hidden sm:inline text-xs font-bold tracking-wide">WhatsApp Group</span>
          </button>
        </div>
      </div>

      {/* WhatsApp Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0f1524] border border-amber-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Maa Kaali Emblem */}
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo.svg" alt="Logo" className="w-12 h-12 object-contain" />
              <div>
                <h3 className="text-base font-bold text-amber-400 font-serif-sacred">
                  Maa Kaali Dharma Rakshak WhatsApp
                </h3>
                <p className="text-xs text-emerald-400 font-medium flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Official National Devotee & Volunteer Network</span>
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Connect directly with central coordinators, temple legal defense volunteers, and local chapters across India to receive immediate verifiable dharma protection alerts.
            </p>

            {/* Benefits List */}
            <div className="space-y-2 mb-5 bg-slate-900/70 p-3 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center space-x-2 text-slate-200">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Verified news & temple defense action alerts</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-200">
                <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Participate in regional Maha Yajna & Seva drives</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-200">
                <MessageCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Direct contact with High Court & PIL advocates</span>
              </div>
            </div>

            {/* Direct Join Button */}
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowModal(false)}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition duration-200"
            >
              <span>Click Here to Join WhatsApp Group</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="mt-3 text-center">
              <p className="text-[11px] text-slate-400">
                You can also message our admin helpline directly on WhatsApp: <br/>
                <span className="font-mono text-emerald-400 font-semibold">+91 98765-52254</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};