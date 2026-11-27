import React, { useState } from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  QrCode, 
  Download, 
  CreditCard, 
  Building, 
  Award,
  ExternalLink,
  Flame,
  Users
} from 'lucide-react';
import { WHATSAPP_GROUP_LINK } from '../components/Navbar';

export const Support: React.FC = () => {
  // Donation Form States
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(1100);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [sevaPurpose, setSevaPurpose] = useState('Temple Legal Defense & Advocacy');
  const [copiedUpi, setCopiedUpi] = useState(false);
  
  // Receipt Generator
  const [receipt, setReceipt] = useState<{
    receiptNumber: string;
    donorName: string;
    amount: number;
    purpose: string;
    date: string;
    transactionId: string;
  } | null>(null);

  const presetAmounts = [501, 1100, 2100, 5100, 11000];

  const handleCopyUPI = () => {
    navigator.clipboard.writeText('maakaalirakshak@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = selectedAmount === 'custom' ? parseFloat(customAmount) : selectedAmount;
    if (!finalAmount || isNaN(finalAmount) || finalAmount <= 0) return;

    // Simulate instant donation receipt generation
    const generatedReceipt = {
      receiptNumber: `MK-DON-${Date.now().toString().slice(-6)}`,
      donorName: donorName.trim() || 'Devoted Sanatani',
      amount: finalAmount,
      purpose: sevaPurpose,
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      transactionId: `TXN-UPI-${Math.floor(100000000 + Math.random() * 900000000)}`
    };

    setReceipt(generatedReceipt);
  };

  return (
    <div className="min-h-screen bg-[#0a0d16] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* =========================================================================
            HEADER: SUPPORT THE CAUSE
            ========================================================================= */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-950/80 to-amber-950/80 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300">
            <HeartHandshake className="w-4 h-4 text-red-500" />
            <span>॥ परोपकाराय पुण्याय भवति ॥</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-sacred text-white">
            Support the Cause & <span className="text-gold-gradient">Donate to Us</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Every rupee contributed to Maa Kaali Hindu Dharma Rakshaka Samiti is strictly allocated towards high-impact temple legal defense, pujari sustenance, and preserving sacred heritage.
          </p>
        </div>

        {/* Why Support the Cause Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0f1423] border border-amber-500/20 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-700/50 flex items-center justify-center text-red-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-amber-300 font-serif-sacred">
              1. Constitutional Court Fights
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Court fees, documentation, certified survey maps, and research expenses for filing writ petitions against illegal takeover and encroachment of Hindu religious properties.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0f1423] border border-amber-500/20 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-700/50 flex items-center justify-center text-amber-400">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-amber-300 font-serif-sacred">
              2. Rural Pujari & Mandir Welfare
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Providing monthly subsistence stipends, ritual samagri, and emergency medical insurance for priests serving in remote and economically disadvantaged rural temples.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0f1423] border border-amber-500/20 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-amber-300 font-serif-sacred">
              3. Indigenous Gaushala Seva
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Supporting shelters preserving indigenous Desi cow breeds (Gir, Sahiwal, Tharparkar, Kangayam) and supplying fodder during drought seasons.
            </p>
          </div>
        </div>

        {/* =========================================================================
            REQUIREMENT 4: "DONTATE TO US SECTION IN TEH SAME PAGE"
            Interactive Donation Portal with UPI, QR Code & Instant Receipt Generator
            ========================================================================= */}
        <div id="donate-section" className="rounded-3xl bg-gradient-to-b from-[#160606] via-[#0d101d] to-[#0a0d16] border-2 border-amber-500/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
            <div className="inline-flex items-center space-x-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Dedicated Seva Contribution Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-sacred text-white">
              Donate to Maa Kaali Dharma Rakshaka Samiti
            </h2>
            <p className="text-xs text-slate-300">
              Select your voluntary donation amount. Receive an instant official digital seva receipt.
            </p>
          </div>

          {receipt ? (
            /* Digital Seva Receipt Modal / Card */
            <div className="max-w-lg mx-auto bg-[#0a0e1a] border-2 border-amber-400 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                <div className="flex items-center space-x-2.5">
                  <img src="./logo.svg" alt="Maa Kali Emblem" className="w-10 h-10 object-contain" />
                  <div>
                    <h4 className="font-serif-sacred text-xs font-bold text-amber-400">
                      MAA KAALI HINDU DHARMA RAKSHAKA SAMITI
                    </h4>
                    <p className="text-[10px] text-slate-400">Official Seva Donation Receipt</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-600 px-2 py-0.5 rounded">
                  VERIFIED
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Receipt Number:</span>
                  <span className="font-mono font-bold text-amber-400">{receipt.receiptNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Donor Name:</span>
                  <span className="font-bold text-slate-100">{receipt.donorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contribution Amount:</span>
                  <span className="font-bold text-emerald-400 text-sm">₹{receipt.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Allocated Wing:</span>
                  <span className="text-amber-300">{receipt.purpose}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Transaction Reference:</span>
                  <span className="font-mono text-slate-300">{receipt.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date:</span>
                  <span className="text-slate-300">{receipt.date}</span>
                </div>
              </div>

              <div className="p-3 bg-red-950/40 rounded-xl border border-red-800/40 text-center text-[11px] text-amber-300 font-serif">
                <p>॥ ॐ क्रीं कालिकायै नमः ॥</p>
                <p className="text-slate-400 text-[10px] mt-0.5">May Maa Kaali shower Her divine blessings upon you and your family for your righteous seva.</p>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 flex items-center justify-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2.5 rounded-lg border border-slate-700 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setReceipt(null)}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs py-2.5 rounded-lg transition"
                >
                  Make Another Seva
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Preset Amounts & Details Form */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Amount Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                    Select Seva Amount (₹ INR) *
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setSelectedAmount(amt)}
                        className={`py-3 px-2 rounded-xl text-xs font-bold transition border ${
                          selectedAmount === amt
                            ? 'bg-amber-500 text-black border-amber-300 shadow-lg shadow-amber-500/20'
                            : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-amber-500/40'
                        }`}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount option */}
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => setSelectedAmount('custom')}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition ${
                        selectedAmount === 'custom'
                          ? 'bg-amber-500 text-black border-amber-300 font-bold'
                          : 'text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      Enter Custom Amount
                    </button>

                    {selectedAmount === 'custom' && (
                      <div className="mt-2 relative">
                        <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">₹</span>
                        <input
                          type="number"
                          min="1"
                          placeholder="e.g. 25000"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-400 font-mono"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Form fields */}
                <form onSubmit={handleDonateSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Select Specific Seva Wing</label>
                    <select
                      value={sevaPurpose}
                      onChange={(e) => setSevaPurpose(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400 text-xs"
                    >
                      <option value="Temple Legal Defense & Advocacy">Temple Legal Defense & Advocacy (PIL Fund)</option>
                      <option value="Rural Pujari Welfare Fund">Rural Pujari Welfare & Medical Support</option>
                      <option value="Indigenous Gaushala Seva">Indigenous Desi Cow (Gaushala) Protection</option>
                      <option value="Yuva Dharma Jagaran">Yuva Dharma Jagaran & Vedic Literature</option>
                      <option value="General Samiti Operations">General Samiti Seva (Where Most Needed)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Donor Name (Optional)</label>
                      <input
                        type="text"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="e.g. Smt. Sunita Devi"
                        className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">WhatsApp / Phone for Receipt</label>
                      <input
                        type="tel"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">PAN Card Number (For Tax Receipt - Optional)</label>
                    <input
                      type="text"
                      maxLength={10}
                      value={donorPan}
                      onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                      placeholder="ABCDE1234F"
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400 font-mono uppercase"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:to-red-500 text-black font-extrabold text-sm py-3 px-6 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 border border-amber-300"
                  >
                    Generate Seva Receipt & Confirm Donation
                  </button>
                </form>

              </div>

              {/* Right Column: Direct UPI & Bank Transfer details */}
              <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
                
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>Direct UPI & Bank Transfer</span>
                </h3>

                {/* UPI ID Box */}
                <div className="p-3.5 rounded-xl bg-black/60 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Official Samiti UPI ID:</span>
                    <span className="font-mono text-sm font-bold text-amber-300">maakaalirakshak@upi</span>
                  </div>
                  <button
                    onClick={handleCopyUPI}
                    className="flex items-center space-x-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedUpi ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                {/* QR Code Placeholder */}
                <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-center space-y-2">
                  <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl flex items-center justify-center">
                    <img 
                      src="./logo.svg" 
                      alt="UPI QR Code preview" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Scan with any UPI App: <strong className="text-slate-200">GPay, PhonePe, Paytm, BHIM</strong>
                  </p>
                </div>

                {/* Bank Account Details */}
                <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                  <div className="flex items-center space-x-1.5 text-slate-300 font-semibold mb-1">
                    <Building className="w-3.5 h-3.5 text-amber-400" />
                    <span>Bank Transfer (NEFT / RTGS / IMPS)</span>
                  </div>
                  <div className="text-[11px] space-y-1 text-slate-400 font-mono">
                    <p><span className="text-slate-500">Account:</span> Maa Kaali Hindu Dharma Rakshaka Samiti</p>
                    <p><span className="text-slate-500">Bank:</span> State Bank of India (SBI)</p>
                    <p><span className="text-slate-500">A/C No:</span> 987654321098</p>
                    <p><span className="text-slate-500">IFSC:</span> SBIN0001234</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-[10px] text-emerald-300 text-center">
                  <span>✓ 100% Transparent Financial Accounting & Audit</span>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};