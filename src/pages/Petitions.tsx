import React, { useState, useEffect } from 'react';
import { FileText, ShieldAlert, AlertCircle, Send, CheckCircle2, Search, ArrowRight, Gavel } from 'lucide-react';
import { api, PetitionItem } from '../services/api';
import { WHATSAPP_GROUP_LINK } from '../components/Navbar';

export const Petitions: React.FC = () => {
  const [petitions, setPetitions] = useState<PetitionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusInfo, setStatusInfo] = useState('');
  
  // Suggest a petition form
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [issueTitle, setIssueTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [suggestSuccess, setSuggestSuccess] = useState(false);

  useEffect(() => {
    const fetchPetitionsData = async () => {
      setLoading(true);
      try {
        const res = await api.getPetitions();
        if (res && res.petitions) {
          setPetitions(res.petitions);
          setStatusInfo(res.statusMessage);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPetitionsData();
  }, []);

  const handleSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueTitle.trim() || !description.trim()) return;

    setSubmitting(true);
    try {
      await api.suggestPetition({
        name,
        contact,
        issueTitle,
        description
      });
      setSuggestSuccess(true);
      setName('');
      setContact('');
      setIssueTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d16] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-blue-950/60 border border-blue-700/60 px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-300">
            <Gavel className="w-4 h-4 text-blue-400" />
            <span>Vidhi Raksha Parishad • Constitutional Cell</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-serif-sacred text-white">
            Petitions Filed By Us
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Maa Kaali Hindu Dharma Rakshaka Samiti utilizes the judicial framework of the Constitution of Bharat to defend temple properties, counter cultural desecration, and protect devotee rights.
          </p>
        </div>

        {/* =========================================================================
            REQUIREMENT 4: "PETITIONS FILED BY US PAGE EMPTTY FOR NOW"
            Clean, dignified Empty State & Legal Explanatory Dashboard
            ========================================================================= */}
        <div className="rounded-2xl bg-[#0f1423] border border-amber-500/30 p-8 sm:p-12 text-center space-y-6 shadow-xl">
          
          <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-dashed border-amber-500/50 flex items-center justify-center mx-auto text-amber-400">
            <FileText className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold font-serif-sacred text-amber-300">
              No Public Petitions Filed at This Moment
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {statusInfo || "Currently, our central legal wing is in the drafting and evidence-gathering phase for upcoming Public Interest Litigations (PILs). Verified filing numbers will appear here once officially admitted by the Registry."}
            </p>
          </div>

          {/* Legal Roadmap Cards */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                DRAFT STAGE 01
              </span>
              <h4 className="text-xs font-bold text-slate-200 mt-2">Temple Autonomy PIL</h4>
              <p className="text-[11px] text-slate-400 mt-1">Researching constitutional scope under Articles 25 & 26 regarding state administrative control over sacred shrines.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                DRAFT STAGE 02
              </span>
              <h4 className="text-xs font-bold text-slate-200 mt-2">Encroachment Eviction</h4>
              <p className="text-[11px] text-slate-400 mt-1">Factual survey of encroached ancient mathas and devasthan land records across 5 states.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                DRAFT STAGE 03
              </span>
              <h4 className="text-xs font-bold text-slate-200 mt-2">Pilgrim Security & Safety</h4>
              <p className="text-[11px] text-slate-400 mt-1">Drafting representations for improved medical, hygiene, and security measures on major Yatra routes.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-red-950/30 border border-red-800/40 text-xs text-amber-200 max-w-lg mx-auto">
            <span>Notice: As per our transparency charter, every filed petition will be uploaded with its full case diary, advocate names, and upcoming hearing dates.</span>
          </div>

        </div>

        {/* Suggest / Report an Issue for Petition Section */}
        <div className="rounded-2xl bg-gradient-to-r from-[#140606] via-[#0e121f] to-[#140606] border border-slate-800 p-6 sm:p-8">
          <div className="max-w-2xl mx-auto space-y-6">
            
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-amber-300 font-serif-sacred">
                Recommend an Issue for Legal Action
              </h3>
              <p className="text-xs text-slate-400">
                Are temple properties in your district facing illegal demolition, land grabbing, or harassment? Bring it to the attention of our legal advisory cell.
              </p>
            </div>

            {suggestSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-950/80 border border-emerald-500 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-300">Matter Logged for Legal Review</h4>
                <p className="text-xs text-slate-300">
                  Our advocate panel will examine the details and contact you if supporting affidavits or land revenue documents are required.
                </p>
                <button
                  onClick={() => setSuggestSuccess(false)}
                  className="mt-2 text-xs text-amber-400 hover:underline"
                >
                  Submit Another Recommendation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSuggest} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Advocate Rajesh / Devotee"
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Contact / WhatsApp Number</label>
                    <input
                      type="tel"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+91 98765 00000"
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Issue / Subject *</label>
                  <input
                    type="text"
                    required
                    value={issueTitle}
                    onChange={(e) => setIssueTitle(e.target.value)}
                    placeholder="e.g. Encroachment of 12th century temple pond in District..."
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Detailed Facts & Location *</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details: village/city name, survey numbers if known, local authorities approached, present status..."
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="text-right pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-red-600 text-black font-bold px-6 py-2.5 rounded-lg hover:from-amber-400 hover:to-red-500 transition shadow"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Submitting...' : 'Submit to Legal Council'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};