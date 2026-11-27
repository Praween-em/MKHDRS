import React, { useState } from 'react';
import { UserPlus, CheckCircle2, Shield, Flame, ExternalLink, ArrowRight, MessageCircle, AlertCircle } from 'lucide-react';
import { api, MemberRegistration } from '../services/api';
import { WHATSAPP_GROUP_LINK } from '../components/Navbar';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState<MemberRegistration>({
    fullName: '',
    phone: '',
    email: '',
    state: 'Uttar Pradesh',
    city: '',
    sevaWing: 'Legal & Advocacy',
    motivation: ''
  });

  const [loading, setLoading] = useState(false);
  const [registeredMember, setRegisteredMember] = useState<{
    id: string;
    fullName: string;
    phone: string;
    state: string;
    city: string;
    sevaWing: string;
    registeredAt: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const indianStates = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi NCR', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 
    'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Other / NRI'
  ];

  const sevaWings = [
    'Legal & Advocacy (Advocates & Researchers)',
    'Temple Seva & Mandir Protection',
    'Yuva Shakti & Youth Leadership',
    'Media, IT & Social Awareness',
    'Pujari Welfare & Gau Seva',
    'General Dharma Rakshak Volunteer'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage('Please provide your Full Name and WhatsApp Contact Number.');
      return;
    }

    setLoading(true);
    try {
      // Submits to Dummy API backend /api/register
      const res = await api.registerUser(formData);
      if (res.success) {
        setRegisteredMember({
          id: res.memberId,
          fullName: formData.fullName,
          phone: formData.phone,
          state: formData.state,
          city: formData.city || 'Central',
          sevaWing: formData.sevaWing,
          registeredAt: new Date().toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d16] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-red-950/80 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300">
            <Flame className="w-4 h-4 text-red-500" />
            <span>॥ धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः ॥</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-sacred text-white">
            Register as a <span className="text-gold-gradient">Dharma Rakshak</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join Maa Kaali Hindu Dharma Rakshaka Samiti. Complete the registration form below. Your data is securely recorded via our backend API (<code className="text-amber-400 font-mono text-xs">POST /api/register</code>).
          </p>
        </div>

        {/* Success State / Digital Member ID Card */}
        {registeredMember ? (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0e161a] to-emerald-950/40 border border-emerald-500/40 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-bold text-emerald-300 font-serif-sacred">
                Jai Maa Kaali! Registration Successful
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                Your volunteer application has been recorded in the samiti database. Below is your official digital identity credential.
              </p>

              {/* Digital Member ID Card */}
              <div className="max-w-md mx-auto rounded-2xl bg-gradient-to-br from-[#180404] via-[#0d0914] to-[#150a0a] border-2 border-amber-400 p-5 shadow-2xl text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-4">
                  <div className="flex items-center space-x-2.5">
                    <img src="/logo.svg" alt="Maa Kali Emblem" className="w-10 h-10 object-contain" />
                    <div>
                      <h4 className="font-serif-sacred text-xs font-bold text-amber-400">
                        MAA KAALI SAMITI
                      </h4>
                      <p className="text-[10px] text-slate-400">Dharma Rakshak Credential</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-red-950 text-amber-200 border border-red-700 px-2 py-0.5 rounded">
                    ACTIVE
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Member ID:</span>
                    <span className="font-mono font-bold text-amber-400">{registeredMember.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Full Name:</span>
                    <span className="font-bold text-slate-100">{registeredMember.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Contact / WhatsApp:</span>
                    <span className="font-mono text-slate-200">{registeredMember.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Region:</span>
                    <span className="text-slate-200">{registeredMember.city}, {registeredMember.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned Wing:</span>
                    <span className="text-amber-300 font-semibold">{registeredMember.sevaWing}</span>
                  </div>
                  <div className="flex justify-between text-[11px] pt-1 border-t border-slate-800">
                    <span className="text-slate-500">Issued On:</span>
                    <span className="text-slate-400">{registeredMember.registeredAt}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-500/20 text-center">
                  <p className="text-[10px] text-amber-400/90 font-serif font-bold">
                    ॥ ॐ क्रीं कालिकायै नमः ॥
                  </p>
                </div>
              </div>

              {/* Requirement 5: WhatsApp Direct Connection */}
              <div className="pt-4 max-w-md mx-auto space-y-3">
                <a
                  href={WHATSAPP_GROUP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-lg transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Join Official WhatsApp Group Now</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => {
                    setRegisteredMember(null);
                    setFormData({
                      fullName: '',
                      phone: '',
                      email: '',
                      state: 'Uttar Pradesh',
                      city: '',
                      sevaWing: 'Legal & Advocacy',
                      motivation: ''
                    });
                  }}
                  className="text-xs text-amber-400 hover:underline"
                >
                  Register Another Devotee
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* Registration Form (Requirement 2) */
          <div className="bg-[#0f1423] border border-amber-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-700 text-red-200 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rameshwar Nath"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm transition"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm transition font-mono"
                  />
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rameshwar@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm transition"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    State / Region *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400 text-sm transition"
                  >
                    {indianStates.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                {/* City / District */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    City / District *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Varanasi, Ayodhya, Kolkata"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm transition"
                  />
                </div>

                {/* Seva Wing / Interest */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Preferred Seva Wing *
                  </label>
                  <select
                    value={formData.sevaWing}
                    onChange={(e) => setFormData({ ...formData, sevaWing: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400 text-sm transition"
                  >
                    {sevaWings.map((wing) => (
                      <option key={wing} value={wing}>{wing}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Motivation */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Your Motivation / How You Can Contribute (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="Tell us about your background, legal skills, temple connections, or how you wish to serve..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm transition"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:to-red-500 text-slate-950 font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-xl shadow-orange-600/30 transition transform hover:-translate-y-0.5 border border-amber-300"
                >
                  <UserPlus className="w-5 h-5 text-slate-950" />
                  <span>{loading ? 'Submitting to Backend API...' : 'Submit Official Registration'}</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-400">
                <span>By submitting, you pledge to respect the constitution of Bharat and the timeless ethics of Sanatana Dharma.</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};