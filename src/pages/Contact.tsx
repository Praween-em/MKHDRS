import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Clock, ExternalLink } from 'lucide-react';
import { api } from '../services/api';
import { WHATSAPP_GROUP_LINK } from '../components/Navbar';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      await api.submitContact({
        name,
        email,
        phone,
        subject,
        message
      });
      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d16] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-red-950/60 border border-red-700/60 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300">
            <Phone className="w-4 h-4 text-red-500" />
            <span>24/7 National Emergency & Devotee Desk</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-serif-sacred text-white">
            Contact <span className="text-gold-gradient">Maa Kaali Samiti</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Reach out to our central karyalaya, legal advisory cell, or join the official state broadcast groups on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Direct Helplines & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">

            {/* WhatsApp Card */}
            <div className="rounded-2xl bg-gradient-to-r from-emerald-950/60 to-[#0c1a14] border border-emerald-500/40 p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/30 border border-emerald-500 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-emerald-300">
                    Official WhatsApp Helpline
                  </h3>
                  <p className="text-xs text-emerald-200/80">Direct Message Admin</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                For rapid incident reporting, legal advice, or joining state broadcast channels, contact our WhatsApp desk directly.
              </p>
              <a
                href={WHATSAPP_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md transition"
              >
                <span>Join Official WhatsApp Group</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Office Coordinates */}
            <div className="rounded-2xl bg-[#0f1423] border border-slate-800 p-6 space-y-4 text-xs text-slate-300">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">
                Central Karyalaya Coordinates
              </h3>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-100">National Headquarters</p>
                  <p className="text-slate-400">Plot 108, Mandir Marg, Near Birla Mandir, New Delhi - 110001</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-100">Eastern Regional Chapter</p>
                  <p className="text-slate-400">Kalighat Temple Enclave, South 24 Parganas, Kolkata, West Bengal</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-100">Emergency Phone</p>
                  <p className="font-mono text-slate-300">+91 8374950475 / +91 6300687808</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-100">Official Correspondence</p>
                  <p className="text-slate-300 font-mono">contact@maakalirakshak@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Operating Hours: Monday – Saturday (8:00 AM – 9:00 PM IST)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-[#0f1423] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-lg font-bold text-amber-300 font-serif-sacred mb-1">
              Send a Message to the Central Committee
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Inquiries regarding temple legal assistance, volunteer drives, or media communications will be answered within 24 hours.
            </p>

            {success ? (
              <div className="p-6 rounded-xl bg-emerald-950/80 border border-emerald-500 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-300">Pranam. Your Message is Received.</h4>
                <p className="text-xs text-slate-300">
                  Our coordinator will review your inquiry and connect via WhatsApp/Phone shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-3 text-xs text-amber-400 hover:underline"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anand Kumar"
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="anand@example.com"
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 00000"
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Inquiry Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Legal Assistance for Temple">Legal Assistance for Temple</option>
                    <option value="Volunteer Registration Query">Volunteer Registration Query</option>
                    <option value="WhatsApp Group Addition Request">WhatsApp Group Addition Request</option>
                    <option value="Donation & 80G Receipt">Donation & 80G Receipt</option>
                    <option value="Media & Press Inquiry">Media & Press Inquiry</option>
                    <option value="General Suggestion">General Suggestion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Your Detailed Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your query or temple issue..."
                    className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-red-600 text-black font-bold py-3 px-6 rounded-xl hover:from-amber-400 hover:to-red-500 transition shadow"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Transmitting to Server...' : 'Send Message'}</span>
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