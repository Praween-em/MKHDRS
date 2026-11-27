import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Flame, 
  UserPlus, 
  RefreshCw, 
  HeartHandshake, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  Sparkles,
  ExternalLink,
  MessageCircle,
  PlusCircle,
  X
} from 'lucide-react';
import { api, ContentItem } from '../services/api';
import { WHATSAPP_GROUP_LINK } from '../components/Navbar';

export const Home: React.FC = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stats, setStats] = useState({
    activeVolunteers: 18450,
    districtsCovered: 142,
    legalAdvocates: 64,
    whatsAppCommunitySize: "50,000+",
    templesAssisted: 89
  });
  
  // Modal for publishing dummy content to verify dynamic API updates live
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newCategory, setNewCategory] = useState('Urgent Defense');
  const [publishing, setPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState('');

  const categories = ['All', 'Legal & Protection', 'Spiritual & Sammelan', 'Community Network', 'Youth Empowerment'];

  const fetchContentData = async () => {
    setLoading(true);
    try {
      const response = await api.getContent(selectedCategory);
      if (response && response.data) {
        setContents(response.data);
      }
      const statsRes = await api.getStats();
      if (statsRes && statsRes.stats) {
        setStats(statsRes.stats);
      }
    } catch (err) {
      console.error("Error fetching content:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContentData();
  }, [selectedCategory]);

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;

    setPublishing(true);
    try {
      const res = await api.addContent({
        title: newTitle,
        summary: newSummary,
        category: newCategory,
        badge: "Just Announced",
        author: "Devotee Committee Desk"
      });
      if (res.success) {
        setPublishSuccess("New announcement successfully fetched and added to the home page via Dummy API!");
        setNewTitle('');
        setNewSummary('');
        fetchContentData();
        setTimeout(() => {
          setPublishSuccess('');
          setShowAddModal(false);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d16] text-slate-100">
      
      {/* =========================================================================
          HERO SECTION: Requirement 1 - USE IMAGE OF MAA KALI IN THE HOME PAGE
          ========================================================================= */}
      <section className="relative overflow-hidden pt-6 pb-20 lg:pt-12 lg:pb-28 border-b border-amber-500/20 bg-gradient-to-b from-[#150505] via-[#0d0914] to-[#0a0d16]">
        {/* Divine Aura Background Light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Mission, Title & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Auspicious Badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-950/80 to-amber-950/80 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300 shadow-md">
                <Flame className="w-4 h-4 text-red-500 animate-bounce" />
                <span>सनातन धर्म रक्षणार्थ समर्पित</span>
                <span className="text-amber-500">•</span>
                <span className="text-amber-200">Defend • Protect • Awaken</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif-sacred leading-tight text-white tracking-wide">
                <span className="text-red-500 block text-2xl sm:text-3xl md:text-4xl font-normal mb-1">
                  माँ काली हिन्दू धर्म रक्षक समिति
                </span>
                <span className="text-gold-gradient drop-shadow-lg">
                  MAA KAALI HINDU DHARMA
                </span>
                <span className="block text-slate-100 text-2xl sm:text-3xl md:text-4xl font-semibold mt-1">
                  RAKSHAKA SAMITI
                </span>
              </h1>

              {/* Sacred Shloka Mantra */}
              <div className="p-3.5 bg-red-950/40 border-l-4 border-red-600 rounded-r-lg max-w-xl mx-auto lg:mx-0">
                <p className="font-serif text-amber-300 text-sm md:text-base font-semibold">
                  ॥ ॐ क्रीं क्रीं क्रीं ह्रीं ह्रीं दक्षिणे कालिके क्रीं क्रीं क्रीं ह्रीं ह्रीं स्वाहा ॥
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Invoking the invincible fierce energy of Maa Kaali to protect sacred Hindu temples, dharma traditions, and the civil rights of devotees.
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We are a nationwide collective of devoted Sanatanis, advocates, scholars, and youth committed to defending Hindu shrines from illegal encroachment, filing constitutional petitions, supporting temple pujaris, and nurturing cultural self-defense.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                {/* Join WhatsApp Group (Requirement 5) */}
                <a
                  href={WHATSAPP_GROUP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-emerald-900/40 hover:shadow-emerald-500/30 transition transform hover:-translate-y-0.5 border border-emerald-400/40"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Join WhatsApp Group</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Register Form CTA (Requirement 2) */}
                <Link
                  to="/register"
                  className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:to-red-500 text-slate-950 font-extrabold text-sm px-5 py-3 rounded-xl shadow-lg shadow-orange-600/30 hover:shadow-orange-500/50 transition transform hover:-translate-y-0.5 border border-amber-300"
                >
                  <UserPlus className="w-5 h-5 text-slate-950" />
                  <span>Register as Dharma Volunteer</span>
                </Link>

                {/* Support & Donate (Requirement 4) */}
                <Link
                  to="/support"
                  className="flex items-center space-x-2 bg-slate-900/80 hover:bg-slate-800 text-amber-300 font-semibold text-sm px-4 py-3 rounded-xl border border-amber-500/30 hover:border-amber-400 transition"
                >
                  <HeartHandshake className="w-4 h-4 text-amber-400" />
                  <span>Support The Cause</span>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-center">
                <div className="p-2 rounded bg-slate-900/40 border border-slate-800">
                  <span className="block text-amber-400 font-bold text-lg font-serif">50,000+</span>
                  <span className="text-[11px] text-slate-400">WhatsApp Network</span>
                </div>
                <div className="p-2 rounded bg-slate-900/40 border border-slate-800">
                  <span className="block text-red-400 font-bold text-lg font-serif">100% Legal</span>
                  <span className="text-[11px] text-slate-400">Constitutional PILs</span>
                </div>
                <div className="p-2 rounded bg-slate-900/40 border border-slate-800">
                  <span className="block text-emerald-400 font-bold text-lg font-serif">24/7 Helpline</span>
                  <span className="text-[11px] text-slate-400">Temple Defense</span>
                </div>
              </div>

            </div>

            {/* Right Column: Prominent Maa Kaali Sacred Depiction (Requirement 1) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                
                {/* Glowing Outer Rings */}
                <div className="absolute -inset-2 bg-gradient-to-r from-red-600 via-amber-500 to-red-700 rounded-3xl blur-xl opacity-50 animate-pulse"></div>

                {/* Main Card Frame */}
                <div className="relative rounded-2xl bg-gradient-to-b from-[#1b0606] to-[#0d0916] border-2 border-amber-500/40 p-4 shadow-2xl overflow-hidden">
                  
                  {/* Ornate Top Banner */}
                  <div className="flex items-center justify-between pb-3 mb-2 border-b border-amber-500/20 text-xs">
                    <span className="text-amber-300 font-serif font-bold tracking-wider">
                      ॥ श्री महाकाली शरणम् ॥
                    </span>
                    <span className="text-[10px] bg-red-950 text-amber-200 border border-red-800 px-2 py-0.5 rounded font-mono">
                      DIVINE PROTECTRESS
                    </span>
                  </div>

                  {/* High Quality Maa Kali Image Display */}
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black border border-amber-500/30 group">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Calcutta_Art_Studio_-_Goddess_Kali_-_1883.jpg/800px-Calcutta_Art_Studio_-_Goddess_Kali_-_1883.jpg"
                      alt="Maa Kaali - Divine Mother and Supreme Defender of Dharma"
                      className="w-full h-full object-cover object-top transition duration-700 group-hover:scale-105"
                      loading="eager"
                      onError={(e) => {
                        // Fallback image if network fails
                        (e.target as HTMLImageElement).src = "./logo.svg";
                      }}
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                    {/* Divine Emblem Badge pinned on image */}
                    <div className="absolute top-3 right-3 w-14 h-14 rounded-full bg-black/80 border-2 border-amber-400 p-1 shadow-xl">
                      <img src="./logo.svg" alt="Maa Kali Logo" className="w-full h-full object-contain" />
                    </div>

                    {/* Bottom Caption on Image */}
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-black/85 backdrop-blur-md border border-amber-500/30 text-center">
                      <p className="font-serif-sacred text-amber-300 font-bold text-sm tracking-wide">
                        माँ महाकाली — दुष्टनाशिनी एवं धर्मरक्षिणी
                      </p>
                      <p className="text-[11px] text-slate-300 italic mt-0.5">
                        "The eternal embodiment of cosmic Shakti who annihilates adharma and protects righteousness."
                      </p>
                    </div>
                  </div>

                  {/* Footnote */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 px-1">
                    <span className="flex items-center space-x-1">
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                      <span>Official Samiti Iconography</span>
                    </span>
                    <Link to="/about" className="text-amber-400 hover:underline font-medium">
                      Learn Spiritual Heritage →
                    </Link>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          WHATSAPP NETWORK PROMINENT BANNER (Requirement 5)
          ========================================================================= */}
      <section className="bg-gradient-to-r from-emerald-950 via-[#062016] to-emerald-950 border-y border-emerald-500/30 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/30 border border-emerald-500 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-300">
                Join the Official Maa Kaali Hindu Dharma Rakshaka WhatsApp Group
              </h3>
              <p className="text-xs text-emerald-100/80">
                Receive instant legal defense alerts, local temple notifications, and join volunteer coordination in your state.
              </p>
            </div>
          </div>
          <a
            href={WHATSAPP_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm px-6 py-2.5 rounded-lg shadow-lg shadow-emerald-500/20 transition transform hover:scale-105"
          >
            <span>Connect on WhatsApp</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* =========================================================================
          FEATURE 3: DUMMY API THAT FETCHES CONTENT AND SHOWS NEW CONTENT IN HOME PAGE
          ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Dharma Updates Feed (Dummy API)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-sacred text-white">
              Latest Announcements & Dharma News
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Dynamically fetched from our backend API (<code className="text-amber-400 text-xs">/api/content</code>). Showing verified updates from the central committee.
            </p>
          </div>

          {/* Controls: Refresh & Publish Test Announcement */}
          <div className="flex items-center space-x-3">
            <button
              onClick={fetchContentData}
              disabled={loading}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3.5 py-2 rounded-lg border border-slate-700 transition"
              title="Refresh feed from API"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
              <span>{loading ? 'Fetching...' : 'Refresh Feed'}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-red-900 to-amber-900 hover:from-red-800 hover:to-amber-800 text-amber-200 text-xs font-semibold px-3.5 py-2 rounded-lg border border-amber-500/40 transition shadow"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>+ Add Live Announcement</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Cards Grid */}
        {loading ? (
          <div className="py-16 text-center">
            <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-400">Fetching latest dharma announcements from backend...</p>
          </div>
        ) : contents.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/40 rounded-xl border border-slate-800">
            <p className="text-slate-400 text-sm">No announcements found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contents.map((item) => (
              <div
                key={item.id}
                className="group bg-[#0e1322] border border-slate-800 hover:border-amber-500/40 rounded-xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-red-950/90 text-amber-300 border border-red-700/60 text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.badge}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/75 text-slate-300 text-[10px] px-2 py-0.5 rounded">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 mb-2">
                      <Calendar className="w-3 h-3 text-amber-500" />
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.author}</span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-100 group-hover:text-amber-400 transition leading-snug mb-2 line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">{item.readTime}</span>
                    <span className="text-amber-400 group-hover:translate-x-1 transition font-medium flex items-center space-x-1">
                      <span>Read More</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================================
          FOUR PILLARS OF DHARMA RAKSHA
          ========================================================================= */}
      <section className="py-16 bg-[#080b13] border-y border-amber-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Our Core Mandate
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-sacred text-white mt-1">
              Four Pillars of Hindu Protection & Seva
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every initiative of Maa Kaali Hindu Dharma Rakshaka Samiti is grounded in constitutional legitimacy, spiritual integrity, and uncompromising dedication to Hindu civil society.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 */}
            <div className="p-6 rounded-xl bg-[#0f1423] border border-amber-500/20 hover:border-amber-400/40 transition">
              <div className="w-12 h-12 rounded-lg bg-red-950/80 border border-red-700/60 flex items-center justify-center text-red-400 mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-amber-300 font-serif-sacred mb-2">
                Temple Defense & Legal Cell
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Safeguarding historical temple lands, challenging arbitrary bureaucratic takeovers, and defending ancient worship rituals through legal petitions and constitutional advocacy.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-xl bg-[#0f1423] border border-amber-500/20 hover:border-amber-400/40 transition">
              <div className="w-12 h-12 rounded-lg bg-amber-950/80 border border-amber-700/60 flex items-center justify-center text-amber-400 mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-amber-300 font-serif-sacred mb-2">
                Youth Dharma Jagaran
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empowering modern Hindu youth with Vedic philosophy, critical thinking against cultural degradation, and training in disciplined social service.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-xl bg-[#0f1423] border border-amber-500/20 hover:border-amber-400/40 transition">
              <div className="w-12 h-12 rounded-lg bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-400 mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-amber-300 font-serif-sacred mb-2">
                Pujari & Gau Seva Support
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Providing financial assistance, medical insurance, and respect to rural priests, temple custodians, and indigenous cow shelters (Gaushalas).
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-xl bg-[#0f1423] border border-amber-500/20 hover:border-amber-400/40 transition">
              <div className="w-12 h-12 rounded-lg bg-blue-950/80 border border-blue-700/60 flex items-center justify-center text-blue-400 mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-amber-300 font-serif-sacred mb-2">
                Constitutional Petitions
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Documenting human rights violations, tracking temple management cases, and drafting public interest litigations in State High Courts and the Supreme Court.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          COMMUNITY & REGISTRATION BANNER (Requirement 2 & 4)
          ========================================================================= */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-red-950/60 via-[#160c18] to-amber-950/60 border border-amber-500/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                Join the Sacred Vanguard
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-sacred text-white">
                Become a Registered Volunteer of Maa Kaali Samiti
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Whether you are a legal expert, student, digital creator, business professional, or devotee—your seva is vital to protecting Dharma. Register your details with our backend system today and receive a verified Member ID.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-black font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition"
                >
                  Open Registration Form →
                </Link>
                <Link
                  to="/support"
                  className="bg-slate-900/80 hover:bg-slate-800 text-amber-300 text-sm px-5 py-3 rounded-xl border border-amber-500/30 transition"
                >
                  Donate to Support The Cause
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-red-950 via-amber-700 to-red-900 p-1 shadow-2xl">
                <img src="./logo.svg" alt="Maa Kaali Logo" className="w-full h-full object-contain rounded-full bg-black/90 p-2" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          MODAL: ADD LIVE ANNOUNCEMENT (Demonstrating POST /api/content)
          ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0f1524] border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-amber-400 font-serif-sacred">
                Publish Live Announcement to Home Page (Dummy API)
              </h3>
            </div>

            <p className="text-xs text-slate-300 mb-4">
              This form submits directly to <code className="text-amber-400 font-mono">POST /api/content</code>. When published, the home page will instantly refresh and show your new announcement!
            </p>

            {publishSuccess && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{publishSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreateAnnouncement} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Announcement Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Legal Cell Files Intervention Petition in District Court"
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                >
                  <option value="Legal & Protection">Legal & Protection</option>
                  <option value="Spiritual & Sammelan">Spiritual & Sammelan</option>
                  <option value="Community Network">Community Network</option>
                  <option value="Youth Empowerment">Youth Empowerment</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Summary / Brief *</label>
                <textarea
                  required
                  rows={3}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Enter the short summary of this dharma protection update..."
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={publishing}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-red-600 font-bold text-black hover:from-amber-400 hover:to-red-500"
                >
                  {publishing ? 'Publishing...' : 'Publish to Feed'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};