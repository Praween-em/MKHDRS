import React from 'react';
import { Shield, BookOpen, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0d16] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Governance & Legal Integrity</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-sacred text-white">
            Terms & Conditions & Code of Conduct
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: November 2026 • Maa Kaali Hindu Dharma Rakshaka Samiti
          </p>
        </div>

        <div className="bg-[#0f1423] border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-8 text-xs text-slate-300 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
              <Shield className="w-4 h-4 text-red-500" />
              <span>1. Organizational Mandate & Legal Framework</span>
            </h2>
            <p>
              Maa Kaali Hindu Dharma Rakshaka Samiti operates in strict compliance with the laws and Constitution of the Republic of Bharat. The Samiti functions as a socio-cultural and legal advocacy trust dedicated to the protection of ancient Hindu temples, scriptural preservation, and devotee civil rights under Articles 14, 19, 21, 25, and 26 of the Constitution of India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
              <Shield className="w-4 h-4 text-red-500" />
              <span>2. Volunteer Registration & Conduct</span>
            </h2>
            <p>
              By submitting the official Volunteer / Member registration form:
            </p>
            <ul className="space-y-1.5 pl-4 list-disc text-slate-300">
              <li>You confirm that all personal details provided (Full Name, Phone/WhatsApp, Address) are authentic and correct.</li>
              <li>You pledge to uphold the noble principles of Ahimsa, Satya, and peaceful legal recourse in all dharma raksha activities.</li>
              <li>No individual registered member is authorized to make public statements or represent the Samiti without written sanction from the Central Executive Council.</li>
              <li>Any form of hate speech, incitement to violence, or illegal behavior is strictly prohibited and leads to immediate expulsion and revocation of membership.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
              <Shield className="w-4 h-4 text-red-500" />
              <span>3. WhatsApp Community Guidelines</span>
            </h2>
            <p>
              Our official broadcast and discussion groups on WhatsApp are designated strictly for verified dharma updates, legal notices, and community seva. Commercial advertisements, forwards unrelated to Hindu heritage, and harassment of members are grounds for permanent banning from all broadcast groups.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
              <Shield className="w-4 h-4 text-red-500" />
              <span>4. Voluntary Contributions & Donations</span>
            </h2>
            <p>
              All donations made to the Samiti through UPI, Net Banking, or Cheque are voluntary seva contributions. Every contribution is utilized towards the stated causes: Temple Legal Defense, Rural Pujari welfare, Gaushala assistance, and youth awakening programs. Official digital donation receipts are generated automatically upon contribution.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
              <Shield className="w-4 h-4 text-red-500" />
              <span>5. Privacy & Data Security</span>
            </h2>
            <p>
              We respect your privacy. Devotee phone numbers, email addresses, and registration records are stored in protected backend databases. The Samiti will never sell, lease, or rent member data to third-party marketing companies.
            </p>
          </section>

          <div className="pt-4 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-400">
              For any clarification regarding these terms, please contact: <span className="text-amber-400">legal@maakaalirakshak.org</span>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};