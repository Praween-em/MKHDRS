import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, HeartHandshake, Phone, Mail, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { WHATSAPP_GROUP_LINK } from './Navbar';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070a10] border-t border-amber-500/20 text-slate-300 relative overflow-hidden">
      {/* Background Sacred Motif Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-red-600/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Identity & Shloka */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="./logo.svg" alt="Maa Kaali Emblem" className="w-12 h-12 object-contain" />
              <div>
                <h3 className="font-serif-sacred text-base font-bold text-amber-400 leading-snug">
                  Maa Kaali Hindu Dharma Rakshaka Samiti
                </h3>
                <p className="text-xs text-amber-500/90 font-medium">माँ काली हिन्दू धर्म रक्षक समिति</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated to upholding, defending, and safeguarding Sanatana Dharma, preserving Vedic heritage, protecting sacred temples, filing constitutional petitions, and uniting Hindu society under the fierce protective grace of Maa Kaali.
            </p>

            <div className="p-3 rounded-lg bg-red-950/30 border border-red-800/40 text-amber-300 text-xs font-serif leading-relaxed">
              <p className="font-semibold text-center">॥ यतो धर्मस्ततो जयः ॥</p>
              <p className="text-center text-[11px] text-amber-400/80 mt-0.5">Where there is Dharma, there is Divine Victory.</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 border-l-2 border-red-600 pl-2">
              Samiti Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-amber-300 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  <span>Home & Latest Updates</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-amber-300 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  <span>About Our Mission & Heritage</span>
                </Link>
              </li>
              <li>
                <Link to="/petitions" className="text-slate-400 hover:text-amber-300 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  <span>Petitions Filed By Us</span>
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-slate-400 hover:text-amber-300 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  <span>Support the Cause & Donate</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-400 hover:text-amber-300 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  <span>Register as Volunteer / Member</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-amber-300 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: WhatsApp Community Direct */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 border-l-2 border-emerald-500 pl-2">
              WhatsApp Community
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Join our verified state and national broadcast groups to receive instant alerts, legal updates, event notices, and seva coordination.
            </p>
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-lg transition duration-200"
            >
              <span>Join Official WhatsApp Group</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="mt-4 p-2.5 rounded bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
              <span className="text-emerald-400 font-bold">100% Privacy Protected:</span> Your number is only accessible to verified administrators and never shared.
            </div>
          </div>

          {/* Col 4: Contact & Emergency Helpline */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 border-l-2 border-red-600 pl-2">
              National Helpline
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Central Kendriya Karyalaya, New Delhi & Kolkata, Bharat</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-mono text-slate-200">+91 98765-KAALI / +91 94321 00000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>contact@maakaalirakshak.org</span>
              </div>
              
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="text-xs text-amber-400 hover:text-amber-300 underline font-medium"
                >
                  View State Coordinators Directory →
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Maa Kaali Hindu Dharma Rakshaka Samiti. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <Link to="/terms" className="hover:text-amber-400 transition">Terms & Conditions</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-amber-400 transition">Privacy Policy</Link>
            <span>•</span>
            <Link to="/petitions" className="hover:text-amber-400 transition">Legal Transparency</Link>
            <span>•</span>
            <Link to="/support" className="hover:text-amber-400 transition">Donate</Link>
            <span>•</span>
            <Link to="/admin" className="hover:text-amber-400 text-amber-500/80 font-mono transition">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};