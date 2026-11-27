import React from 'react';
import { Shield, Flame, BookOpen, Users, Compass, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WHATSAPP_GROUP_LINK } from '../components/Navbar';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0d16] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-red-950/60 border border-red-700/60 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300">
            <Flame className="w-4 h-4 text-red-500" />
            <span>॥ सत्यमेव जयते नानृतम् ॥</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-sacred text-white">
            About <span className="text-gold-gradient">Maa Kaali Hindu Dharma Rakshaka Samiti</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            माँ काली हिन्दू धर्म रक्षक समिति is a resolute cultural and legal movement dedicated to the protection of Sanatana Dharma, revitalizing temple ecosystems, and legally safeguarding Hindu community interests.
          </p>
        </div>

        {/* Sacred Maa Kaali Inspiration Card */}
        <div className="rounded-2xl bg-gradient-to-r from-red-950/40 via-[#150a12] to-amber-950/40 border border-amber-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-black border-2 border-amber-400 shrink-0 shadow-xl">
            <img 
              src="/logo.svg" 
              alt="Maa Kali Emblem" 
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-amber-300 font-serif-sacred">
              Our Divine Patroness: Maa Mahakali
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In Sanatana theology, Maa Kaali represents the supreme unyielding cosmic force of Truth, Time (Kāla), and Transformation. She is the fierce mother who brandishes the Khadga (sword of discernment) and Trishul (tri-fold truth) to annihilate ignorance, adharma, and injustice. Taking refuge in Her fearless grace, our samiti resolves to protect every temple, every ritual, and every devotee from harm.
            </p>
            <div className="text-xs text-amber-400 font-serif italic">
              "When righteousness is endangered, the roar of Mahakali awakens in the hearts of the righteous."
            </div>
          </div>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Vision */}
          <div className="p-6 rounded-2xl bg-[#0f1423] border border-amber-500/20 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-amber-300 font-serif-sacred">
              Our Vision
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              A united, legally empowered, and culturally awake Hindu society where ancient temples thrive under devotee stewardship, sacred traditions are defended with constitutional excellence, and future generations stand proud of their Sanatana lineage.
            </p>
          </div>

          {/* Mission */}
          <div className="p-6 rounded-2xl bg-[#0f1423] border border-amber-500/20 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-amber-300 font-serif-sacred">
              Our Mission
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Provide 24/7 legal aid to vulnerable temples and devotee associations.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>File public interest litigations against illegal shrine desecration.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Maintain verified citizen communications via national WhatsApp chapters.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Sustain pujari welfare funds and indigenous cow protection initiatives.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Organizational Wings */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold font-serif-sacred text-white">
              Core Working Wings of the Samiti
            </h2>
            <p className="text-xs text-slate-400 mt-1">Structured across four specialized divisions to ensure targeted impact.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-bold text-red-400">01. Legal Wing</span>
              <h4 className="text-sm font-bold text-slate-100 mt-1 mb-1.5">Vidhi Raksha Parishad</h4>
              <p className="text-xs text-slate-400">Senior advocates and legal researchers formulating writ petitions, PILs, and constitutional briefs.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-bold text-amber-400">02. Temple Seva</span>
              <h4 className="text-sm font-bold text-slate-100 mt-1 mb-1.5">Mandir Punarutthan Wing</h4>
              <p className="text-xs text-slate-400">Conducting physical documentation, cleanliness drives, and assisting rural temple management committees.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-bold text-emerald-400">03. Youth Awakening</span>
              <h4 className="text-sm font-bold text-slate-100 mt-1 mb-1.5">Yuva Shakti Vahini</h4>
              <p className="text-xs text-slate-400">Student leadership camps, physical fitness, Vedic debates, and awareness campaigns against disinformation.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-bold text-cyan-400">04. Digital Network</span>
              <h4 className="text-sm font-bold text-slate-100 mt-1 mb-1.5">Sanchar & WhatsApp Cell</h4>
              <p className="text-xs text-slate-400">Managing state broadcast channels, instant emergency verification, and public awareness content.</p>
            </div>

          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border border-amber-500/30 text-center space-y-4">
          <h3 className="text-lg font-bold text-amber-300 font-serif-sacred">
            Join the Hands of Maa Kaali's Dharma Rakshaks
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Your registration equips us with the grassroots strength needed to preserve our sacred heritage.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/register"
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-md transition"
            >
              Register as Volunteer
            </Link>
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-md transition"
            >
              Join WhatsApp Group
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};