import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  LogOut, 
  Users, 
  FileText, 
  HeartHandshake, 
  MessageSquare, 
  PlusCircle, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  Database, 
  RefreshCw,
  ExternalLink,
  Flame,
  Gavel,
  CheckCircle2,
  X
} from 'lucide-react';
import { api, ContentItem } from '../services/api';

export const Admin: React.FC = () => {
  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('mkhdrs_admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'announcements' | 'petitions' | 'volunteers' | 'donations' | 'inquiries'>('overview');

  // Overview Data
  const [overview, setOverview] = useState<any>(null);
  const [loadingOverview, setLoadingOverview] = useState(false);

  // Announcements Data
  const [announcements, setAnnouncements] = useState<ContentItem[]>([]);
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Legal & Protection',
    badge: 'Urgent Action',
    author: 'Central Legal Desk',
    summary: '',
    content: ''
  });

  // Petitions Data
  const [petitionsList, setPetitionsList] = useState<any[]>([]);
  const [suggestedList, setSuggestedList] = useState<any[]>([]);
  const [showAddPetitionModal, setShowAddPetitionModal] = useState(false);
  const [petitionForm, setPetitionForm] = useState({
    title: '',
    court: 'Supreme Court of India',
    caseNumber: '',
    status: 'Notice Issued',
    filedDate: new Date().toISOString().split('T')[0],
    summary: ''
  });

  // Volunteers Data
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [volunteerSearch, setVolunteerSearch] = useState('');

  // Donations Data
  const [donations, setDonations] = useState<any[]>([]);
  const [totalDonationsAmount, setTotalDonationsAmount] = useState(0);

  // Inquiries Data
  const [inquiries, setInquiries] = useState<any[]>([]);

  // Load Overview & Tab Data
  const loadDashboardData = async () => {
    setLoadingOverview(true);
    try {
      const ovRes = await api.getAdminOverview();
      if (ovRes && ovRes.data) {
        setOverview(ovRes.data);
      }
      const contentsRes = await api.getContent();
      if (contentsRes && contentsRes.data) {
        setAnnouncements(contentsRes.data);
      }
      const petRes = await api.getPetitions();
      if (petRes && petRes.petitions) {
        setPetitionsList(petRes.petitions);
      }
      const suggRes = await api.getSuggestedPetitions();
      if (suggRes && suggRes.data) {
        setSuggestedList(suggRes.data);
      }
      const volRes = await api.getRegistrationsList();
      if (volRes && volRes.data) {
        setVolunteers(volRes.data);
      }
      const donRes = await api.getDonationsList();
      if (donRes) {
        setDonations(donRes.data || []);
        setTotalDonationsAmount(donRes.totalAmountRaised || 0);
      }
      const inqRes = await api.getContactInquiries();
      if (inqRes && inqRes.data) {
        setInquiries(inqRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOverview(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    try {
      const res = await api.adminLogin(password);
      if (res.success) {
        setIsAuthenticated(true);
        localStorage.setItem('mkhdrs_admin_auth', 'true');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Invalid admin credentials');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('mkhdrs_admin_auth');
  };

  // Add announcement
  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title || !newsForm.summary) return;
    try {
      await api.addContent(newsForm);
      setShowAddNewsModal(false);
      setNewsForm({
        title: '',
        category: 'Legal & Protection',
        badge: 'Urgent Action',
        author: 'Central Legal Desk',
        summary: '',
        content: ''
      });
      loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete announcement
  const handleDeleteNews = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    await api.deleteContent(id);
    loadDashboardData();
  };

  // Add court petition
  const handleAddPetition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!petitionForm.title || !petitionForm.caseNumber) return;
    try {
      await api.createPetition(petitionForm);
      setShowAddPetitionModal(false);
      setPetitionForm({
        title: '',
        court: 'Supreme Court of India',
        caseNumber: '',
        status: 'Notice Issued',
        filedDate: new Date().toISOString().split('T')[0],
        summary: ''
      });
      loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete petition
  const handleDeletePetition = async (id: string) => {
    if (!confirm('Delete this petition entry?')) return;
    await api.deletePetition(id);
    loadDashboardData();
  };

  // Update suggested petition status
  const handleUpdateSuggestionStatus = async (id: string, status: string) => {
    await api.updateSuggestedPetition(id, status);
    loadDashboardData();
  };

  // Delete volunteer
  const handleDeleteVolunteer = async (id: string) => {
    if (!confirm('Remove this volunteer from the registry?')) return;
    await api.deleteRegistration(id);
    loadDashboardData();
  };

  // Update inquiry status
  const handleToggleInquiryStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Unread' ? 'Resolved' : 'Unread';
    await api.updateContactStatus(id, nextStatus);
    loadDashboardData();
  };

  // ================= LOGIN SCREEN ================= //
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070a12] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0d1222] border-2 border-amber-500/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="text-center space-y-3 mb-6">
            <div className="w-16 h-16 rounded-full bg-red-950/80 border-2 border-amber-400 p-1 mx-auto shadow-lg">
              <img src="./logo.svg" alt="Maa Kaali Emblem" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl font-bold font-serif-sacred text-amber-300">
              Central Karyalaya Admin Portal
            </h1>
            <p className="text-xs text-slate-400">
              Maa Kaali Hindu Dharma Rakshaka Samiti Management Console
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-700 text-red-200 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                Admin Password *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrative password..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Default Master Key: <code className="text-amber-400 font-mono">kaali@admin2026</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:to-red-500 text-black font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 border border-amber-300"
            >
              {loggingIn ? 'Verifying Credentials...' : 'Authenticate & Open Console'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <span className="text-[11px] text-slate-500">
              Authorized Committee Members Only • 256-Bit TLS Secured
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Filtered volunteers for search
  const filteredVolunteers = volunteers.filter(v => 
    v.fullName?.toLowerCase().includes(volunteerSearch.toLowerCase()) ||
    v.phone?.toLowerCase().includes(volunteerSearch.toLowerCase()) ||
    v.state?.toLowerCase().includes(volunteerSearch.toLowerCase()) ||
    v.sevaWing?.toLowerCase().includes(volunteerSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#080b14] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Bar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0d1222] p-6 rounded-2xl border border-amber-500/30 shadow-xl">
          <div className="flex items-center space-x-3">
            <img src="./logo.svg" alt="Maa Kaali Logo" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-xl font-bold font-serif-sacred text-amber-300 flex items-center space-x-2">
                <span>Central Admin & Database Console</span>
                <span className="text-[10px] font-mono bg-red-950 text-amber-200 border border-red-700 px-2 py-0.5 rounded">
                  LIVE
                </span>
              </h1>
              <p className="text-xs text-slate-400 flex items-center space-x-2">
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>Backend Engine: <strong>{overview?.databaseEngine || 'PostgreSQL / JSON Connected'}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={loadDashboardData}
              disabled={loadingOverview}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3.5 py-2 rounded-lg border border-slate-700 transition"
              title="Refresh all records"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingOverview ? 'animate-spin text-amber-400' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-semibold px-3.5 py-2 rounded-lg border border-red-700 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Overview Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
              activeTab === 'announcements'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Announcements & News ({announcements.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('petitions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
              activeTab === 'petitions'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Gavel className="w-4 h-4" />
            <span>Petitions & Citizen PILs ({petitionsList.length + suggestedList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('volunteers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
              activeTab === 'volunteers'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Volunteers Directory ({volunteers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('donations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
              activeTab === 'donations'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Donations Ledger ({donations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
              activeTab === 'inquiries'
                ? 'bg-amber-500 text-black shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Helpdesk Inquiries ({inquiries.length})</span>
          </button>
        </div>

        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="p-5 rounded-2xl bg-[#0f1526] border border-amber-500/20">
                <span className="text-xs text-slate-400 font-semibold uppercase">Total Volunteers</span>
                <p className="text-3xl font-bold font-serif-sacred text-amber-400 mt-1">{overview?.totalMembers || volunteers.length}</p>
                <span className="text-[11px] text-slate-500">Live registrations recorded</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#0f1526] border border-emerald-500/20">
                <span className="text-xs text-slate-400 font-semibold uppercase">Total Seva Funds Raised</span>
                <p className="text-3xl font-bold font-serif-sacred text-emerald-400 mt-1">₹{totalDonationsAmount.toLocaleString('en-IN')}</p>
                <span className="text-[11px] text-slate-500">{donations.length} total contributions</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#0f1526] border border-blue-500/20">
                <span className="text-xs text-slate-400 font-semibold uppercase">Active Court Petitions</span>
                <p className="text-3xl font-bold font-serif-sacred text-blue-400 mt-1">{petitionsList.length}</p>
                <span className="text-[11px] text-slate-500">{suggestedList.length} citizen suggestions</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#0f1526] border border-red-500/20">
                <span className="text-xs text-slate-400 font-semibold uppercase">Live Announcements</span>
                <p className="text-3xl font-bold font-serif-sacred text-red-400 mt-1">{announcements.length}</p>
                <span className="text-[11px] text-slate-500">Active on Home Page</span>
              </div>

            </div>

            {/* Quick Actions Panel */}
            <div className="p-6 rounded-2xl bg-[#0f1423] border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider font-serif-sacred">
                Quick Administrative Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => { setActiveTab('announcements'); setShowAddNewsModal(true); }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-900 to-amber-900 hover:from-red-800 hover:to-amber-800 text-amber-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-amber-500/40"
                >
                  <PlusCircle className="w-4 h-4 text-amber-400" />
                  <span>Publish New Home Announcement</span>
                </button>

                <button
                  onClick={() => { setActiveTab('petitions'); setShowAddPetitionModal(true); }}
                  className="flex items-center space-x-2 bg-blue-950 hover:bg-blue-900 text-blue-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-blue-700/60"
                >
                  <PlusCircle className="w-4 h-4 text-blue-400" />
                  <span>File New Court Petition Record</span>
                </button>

                <button
                  onClick={() => setActiveTab('volunteers')}
                  className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700"
                >
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Review Volunteer Registrations</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: ANNOUNCEMENTS ================= */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold font-serif-sacred text-amber-300">
                  Home Page Announcements & News Feed
                </h2>
                <p className="text-xs text-slate-400">
                  Changes published here immediately update the live home page feed.
                </p>
              </div>
              <button
                onClick={() => setShowAddNewsModal(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-red-600 text-black font-bold text-xs px-4 py-2 rounded-xl shadow transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Create Announcement</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {announcements.map((item) => (
                <div key={item.id} className="bg-[#0f1423] border border-slate-800 rounded-xl p-5 space-y-3 relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono bg-red-950 text-amber-300 border border-red-800 px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-2">{item.category} • {item.date}</span>
                      <h4 className="font-bold text-sm text-slate-100 mt-1">{item.title}</h4>
                    </div>
                    <button
                      onClick={() => handleDeleteNews(item.id)}
                      className="text-red-400 hover:text-red-300 p-1.5 rounded-lg bg-red-950/40 border border-red-800/40 transition shrink-0 ml-2"
                      title="Delete announcement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: PETITIONS ================= */}
        {activeTab === 'petitions' && (
          <div className="space-y-8">
            {/* Section A: Official Petitions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold font-serif-sacred text-amber-300">
                    Official Court Petitions (Public Interest Litigations)
                  </h2>
                  <p className="text-xs text-slate-400">
                    When you add a petition here, it appears on the public <code className="text-amber-400">/petitions</code> page.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddPetitionModal(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ File New Court Petition</span>
                </button>
              </div>

              {petitionsList.length === 0 ? (
                <div className="p-8 rounded-xl bg-[#0f1423] border border-dashed border-slate-800 text-center space-y-2">
                  <Gavel className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400">
                    No active petitions filed yet (matches initial user requirement). Click above to record a new petition.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {petitionsList.map((p) => (
                    <div key={p.id} className="bg-[#0f1423] border border-blue-500/30 rounded-xl p-5 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono text-blue-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                            {p.court}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-400 ml-2">{p.status}</span>
                          <h4 className="font-bold text-sm text-slate-100 mt-1">{p.title}</h4>
                          <p className="text-xs font-mono text-amber-400">Case No: {p.caseNumber}</p>
                        </div>
                        <button
                          onClick={() => handleDeletePetition(p.id)}
                          className="text-red-400 hover:text-red-300 p-1 rounded bg-red-950/40 border border-red-800/40"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-300">{p.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section B: Citizen Suggested Petitions */}
            <div className="space-y-4 pt-6 border-t border-slate-800">
              <h3 className="text-base font-bold font-serif-sacred text-amber-300">
                Citizen Issue Recommendations ({suggestedList.length})
              </h3>

              {suggestedList.length === 0 ? (
                <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
                  No citizen recommendations submitted yet.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#0a0e1c] text-amber-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">Citizen Name & Contact</th>
                        <th className="p-3">Issue Title & Details</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Review Status</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {suggestedList.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-900/40">
                          <td className="p-3 font-semibold text-slate-200">
                            {s.name} <br/>
                            <span className="font-mono text-[11px] text-slate-400">{s.contact}</span>
                          </td>
                          <td className="p-3 max-w-sm">
                            <span className="font-bold text-amber-300">{s.issueTitle}</span>
                            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{s.description}</p>
                          </td>
                          <td className="p-3">{s.location || 'India'}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              s.status === 'Accepted'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                : s.status === 'Dismissed'
                                ? 'bg-red-950 text-red-300 border border-red-700'
                                : 'bg-amber-950 text-amber-300 border border-amber-700'
                            }`}>
                              {s.status}
                            </span>
                          </td>
                          <td className="p-3 space-x-2">
                            <button
                              onClick={() => handleUpdateSuggestionStatus(s.id, 'Accepted for PIL')}
                              className="text-[10px] bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 px-2 py-1 rounded"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleUpdateSuggestionStatus(s.id, 'Under Review')}
                              className="text-[10px] bg-amber-900/80 hover:bg-amber-800 text-amber-200 px-2 py-1 rounded"
                            >
                              Review
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 4: VOLUNTEERS DIRECTORY ================= */}
        {activeTab === 'volunteers' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold font-serif-sacred text-amber-300">
                  Registered Dharma Volunteers ({volunteers.length})
                </h2>
                <p className="text-xs text-slate-400">
                  Every user registered via the <code className="text-amber-400">/register</code> form is stored in the database.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search by name, phone, state..."
                  value={volunteerSearch}
                  onChange={(e) => setVolunteerSearch(e.target.value)}
                  className="w-full px-3 py-2 pl-9 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              </div>
            </div>

            {filteredVolunteers.length === 0 ? (
              <div className="p-8 rounded-xl bg-[#0f1423] border border-slate-800 text-center text-xs text-slate-400">
                No volunteers matching your search.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#0a0e1c] text-amber-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Member ID</th>
                      <th className="p-3">Full Name</th>
                      <th className="p-3">WhatsApp / Phone</th>
                      <th className="p-3">State / City</th>
                      <th className="p-3">Assigned Seva Wing</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredVolunteers.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-900/40">
                        <td className="p-3 font-mono font-bold text-amber-300">{m.id}</td>
                        <td className="p-3 font-semibold text-slate-100">{m.fullName}</td>
                        <td className="p-3 font-mono text-slate-300">{m.phone}</td>
                        <td className="p-3">{m.city}, {m.state}</td>
                        <td className="p-3 text-amber-300/90">{m.sevaWing}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleDeleteVolunteer(m.id)}
                            className="text-red-400 hover:text-red-300 p-1 rounded bg-red-950/40 border border-red-800/40"
                            title="Delete volunteer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: DONATIONS LEDGER ================= */}
        {activeTab === 'donations' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold font-serif-sacred text-amber-300">
                  Seva Donations & Contribution Ledger
                </h2>
                <p className="text-xs text-slate-400">
                  Total Contributions Recorded: <strong className="text-emerald-400 font-serif">₹{totalDonationsAmount.toLocaleString('en-IN')}</strong> across {donations.length} records.
                </p>
              </div>
            </div>

            {donations.length === 0 ? (
              <div className="p-8 rounded-xl bg-[#0f1423] border border-slate-800 text-center text-xs text-slate-400">
                No donations recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#0a0e1c] text-amber-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Receipt ID</th>
                      <th className="p-3">Donor Name</th>
                      <th className="p-3">Amount (₹)</th>
                      <th className="p-3">Purpose</th>
                      <th className="p-3">PAN</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Txn Reference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {donations.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-900/40">
                        <td className="p-3 font-mono font-bold text-amber-300">{d.id}</td>
                        <td className="p-3 font-semibold text-slate-100">{d.donorName}</td>
                        <td className="p-3 font-bold text-emerald-400">₹{parseFloat(d.amount).toLocaleString('en-IN')}</td>
                        <td className="p-3 text-slate-300">{d.purpose}</td>
                        <td className="p-3 font-mono text-slate-400">{d.pan || 'N/A'}</td>
                        <td className="p-3">{d.date}</td>
                        <td className="p-3 font-mono text-[11px] text-slate-400">{d.transactionId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 6: INQUIRIES HELPDESK ================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold font-serif-sacred text-amber-300">
              Devotee & Contact Inquiries ({inquiries.length})
            </h2>

            {inquiries.length === 0 ? (
              <div className="p-8 rounded-xl bg-[#0f1423] border border-slate-800 text-center text-xs text-slate-400">
                No inquiries received yet.
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((iq) => (
                  <div key={iq.id} className="bg-[#0f1423] border border-slate-800 rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          iq.status === 'Resolved'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                            : 'bg-red-950 text-red-300 border border-red-700'
                        }`}>
                          {iq.status}
                        </span>
                        <span className="font-bold text-slate-100 text-xs">{iq.name}</span>
                        <span className="text-slate-500">•</span>
                        <span className="font-mono text-slate-400 text-xs">{iq.phone}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400 text-xs">{iq.email}</span>
                      </div>
                      <button
                        onClick={() => handleToggleInquiryStatus(iq.id, iq.status)}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg border border-slate-700 transition"
                      >
                        Mark as {iq.status === 'Unread' ? 'Resolved' : 'Unread'}
                      </button>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                      <p className="text-xs font-semibold text-amber-300 mb-1">{iq.subject}</p>
                      <p className="text-xs text-slate-300 leading-relaxed">{iq.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ================= MODAL: CREATE ANNOUNCEMENT ================= */}
      {showAddNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0f1524] border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setShowAddNewsModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-amber-400 font-serif-sacred mb-4">
              Publish New Announcement (Admin)
            </h3>

            <form onSubmit={handleAddNews} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  placeholder="e.g. Legal Cell Intervenes in District Court for Ancient Temple"
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Legal & Protection">Legal & Protection</option>
                    <option value="Spiritual & Sammelan">Spiritual & Sammelan</option>
                    <option value="Community Network">Community Network</option>
                    <option value="Youth Empowerment">Youth Empowerment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Badge</label>
                  <input
                    type="text"
                    value={newsForm.badge}
                    onChange={(e) => setNewsForm({ ...newsForm, badge: e.target.value })}
                    placeholder="e.g. Urgent Action, Live Alert"
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Summary *</label>
                <textarea
                  rows={3}
                  required
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  placeholder="Short briefing for the home page cards..."
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddNewsModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-red-600 font-bold text-black hover:from-amber-400 hover:to-red-500"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: CREATE PETITION ================= */}
      {showAddPetitionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0f1524] border border-blue-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setShowAddPetitionModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-blue-300 font-serif-sacred mb-4">
              File Official Court Petition Record
            </h3>

            <form onSubmit={handleAddPetition} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Petition Title *</label>
                <input
                  type="text"
                  required
                  value={petitionForm.title}
                  onChange={(e) => setPetitionForm({ ...petitionForm, title: e.target.value })}
                  placeholder="e.g. Writ Petition (Civil) against illegal encroachment of temple properties"
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Court</label>
                  <input
                    type="text"
                    value={petitionForm.court}
                    onChange={(e) => setPetitionForm({ ...petitionForm, court: e.target.value })}
                    placeholder="e.g. Supreme Court of India / High Court"
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Case / Diary Number *</label>
                  <input
                    type="text"
                    required
                    value={petitionForm.caseNumber}
                    onChange={(e) => setPetitionForm({ ...petitionForm, caseNumber: e.target.value })}
                    placeholder="e.g. WP(C) No. 108/2026"
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Current Status</label>
                  <select
                    value={petitionForm.status}
                    onChange={(e) => setPetitionForm({ ...petitionForm, status: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Notice Issued">Notice Issued</option>
                    <option value="Hearing Scheduled">Hearing Scheduled</option>
                    <option value="Interim Stay Granted">Interim Stay Granted</option>
                    <option value="Final Arguments">Final Arguments</option>
                    <option value="Disposed in Favor of Temple">Disposed in Favor of Temple</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Filed Date</label>
                  <input
                    type="date"
                    value={petitionForm.filedDate}
                    onChange={(e) => setPetitionForm({ ...petitionForm, filedDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Summary / Brief</label>
                <textarea
                  rows={3}
                  value={petitionForm.summary}
                  onChange={(e) => setPetitionForm({ ...petitionForm, summary: e.target.value })}
                  placeholder="Summary of legal relief sought..."
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPetitionModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-white shadow"
                >
                  File & Publish Petition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
