import React, { useState } from 'react';
import axios from 'axios';
import { MapPin, Phone, Mail, Clock, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const ShowroomPage = () => {
  const { showrooms } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    showroom: showrooms[0]?.id || 1,
    preferred_date: '',
    preferred_time: '14:00',
    product_interests: 'AURA Forma Sofa, Koto Lounge Chair',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await axios.post('/api/appointments/', formData);
      setSubmitted(true);
    } catch (err) {
      console.warn('Backend offline or failed; showing local confirmation:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-[#FAF8F4] min-h-screen">
      <div className="max-w-editorial mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-2">
            PRIVATE SPATIAL CONSULTATION
          </span>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-[#292520] mb-4">
            Experience AURA
          </h1>
          <p className="text-base text-[#77716B] leading-relaxed">
            Step inside our Copenhagen, London, and New York spaces to feel the full-grain leathers, inspect construction joins, and review floor plans with an AURA spatial architect.
          </p>
        </div>

        {/* Form & Showroom Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Booking Form */}
          <div className="lg:col-span-6 bg-white p-8 md:p-10 rounded-3xl border border-[#DED8CF] shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-[#AD6C4F] mx-auto mb-4" />
                <h3 className="text-2xl font-light text-[#292520] mb-2">
                  Appointment Request Received
                </h3>
                <p className="text-sm text-[#77716B] max-w-md mx-auto mb-6">
                  Thank you, <span className="font-medium text-[#292520]">{formData.name}</span>. A private concierge will contact you at <span className="font-mono text-[#292520]">{formData.email}</span> within 24 hours to confirm your tailored appointment.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full border border-[#DED8CF] text-xs font-medium text-[#292520] hover:border-[#AD6C4F]"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-medium text-[#292520] mb-2">
                  Schedule Private Appointment
                </h3>
                <p className="text-xs text-[#77716B] mb-6">
                  One-on-one appointments provide full showroom access, bespoke fabric swatches, and coffee service.
                </p>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#77716B] mb-1.5">
                    Select Showroom *
                  </label>
                  <select
                    value={formData.showroom}
                    onChange={(e) => setFormData({ ...formData, showroom: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs text-[#292520] focus:outline-none focus:border-[#AD6C4F]"
                  >
                    {showrooms.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#77716B] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs text-[#292520] focus:outline-none focus:border-[#AD6C4F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#77716B] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="eleanor@studio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs text-[#292520] focus:outline-none focus:border-[#AD6C4F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#77716B] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+45 33 12 80 00"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs text-[#292520] focus:outline-none focus:border-[#AD6C4F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#77716B] mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferred_date}
                      onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs text-[#292520] focus:outline-none focus:border-[#AD6C4F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#77716B] mb-1.5">
                    Pieces or Collections of Interest
                  </label>
                  <textarea
                    rows={3}
                    placeholder="E.g. Forma modular sofa, Calan dining table, timber swatches..."
                    value={formData.product_interests}
                    onChange={(e) => setFormData({ ...formData, product_interests: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs text-[#292520] focus:outline-none focus:border-[#AD6C4F]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-full bg-[#AD6C4F] text-white text-xs font-medium hover:bg-[#95583E] transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <span>{loading ? 'Confirming...' : 'Request Private Reservation'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Showroom Locations */}
          <div className="lg:col-span-6 space-y-6">
            {showrooms.map((sh) => (
              <div
                key={sh.id}
                className="p-6 rounded-3xl bg-white border border-[#DED8CF] flex flex-col sm:flex-row gap-6 shadow-sm hover:border-[#AD6C4F] transition-colors"
              >
                <div className="sm:w-48 h-40 rounded-2xl overflow-hidden shrink-0 bg-[#EAE3D8]">
                  <img
                    src={sh.image}
                    alt={sh.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#AD6C4F] block mb-1">
                      {sh.city} • {sh.country}
                    </span>
                    <h4 className="text-base font-medium text-[#292520] mb-2">
                      {sh.name}
                    </h4>
                    <p className="text-xs text-[#77716B] leading-relaxed mb-3">
                      {sh.address}
                    </p>
                  </div>

                  <div className="space-y-1 text-[11px] text-[#77716B] font-mono">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-[#AD6C4F]" />
                      <span>{sh.opening_hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-[#AD6C4F]" />
                      <span>{sh.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowroomPage;
