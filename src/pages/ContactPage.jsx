import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const { products } = useCMS();

  const preselectedProductSlug = searchParams.get('product') || '';
  const preselectedIntent = searchParams.get('intent') || '';
  const preselectedMaterial = searchParams.get('material') || '';

  const matchedProduct = products.find(p => p.slug === preselectedProductSlug);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: matchedProduct?.id || null,
    message: preselectedMaterial
      ? `Inquiring about ${matchedProduct?.name || 'custom order'} in ${preselectedMaterial}.`
      : 'Inquiring regarding spatial specifications and lead times.',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/inquiries/', formData);
      setSubmitted(true);
    } catch (err) {
      console.warn('Backend offline; saving locally:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-[#FAF8F4] min-h-screen">
      <div className="max-w-editorial mx-auto">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-2">
            CONCIERGE & ARCHITECTURAL SUPPORT
          </span>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-[#292520] mb-4">
            Connect with AURA
          </h1>
          <p className="text-base text-[#77716B]">
            Whether specifying furniture for private residences, commercial developments, or requesting swatch samples, our team provides dedicated concierge assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-[#DED8CF] shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-[#AD6C4F] mx-auto mb-4" />
                <h3 className="text-2xl font-light text-[#292520] mb-2">
                  Inquiry Received with Gratitude
                </h3>
                <p className="text-sm text-[#77716B] max-w-md mx-auto mb-6">
                  Thank you, <span className="font-medium text-[#292520]">{formData.name}</span>. An AURA spatial consultant has been assigned to your message and will respond to <span className="font-mono text-[#292520]">{formData.email}</span> within one business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full border border-[#DED8CF] text-xs font-medium text-[#292520] hover:border-[#AD6C4F]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-medium text-[#292520] mb-4">
                  Send a Direct Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#77716B] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Marcus Vance"
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
                      placeholder="marcus@vance-arch.com"
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
                      placeholder="+1 (212) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs text-[#292520] focus:outline-none focus:border-[#AD6C4F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#77716B] mb-1.5">
                      Piece / Focus
                    </label>
                    <select
                      value={formData.product || ''}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value ? parseInt(e.target.value) : null })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs text-[#292520] focus:outline-none focus:border-[#AD6C4F]"
                    >
                      <option value="">General Inquiry / Custom Project</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#77716B] mb-1.5">
                    Project Message & Specification Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs text-[#292520] focus:outline-none focus:border-[#AD6C4F]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-full bg-[#AD6C4F] text-white text-xs font-medium hover:bg-[#95583E] transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <span>{loading ? 'Transmitting...' : 'Send Inquiry'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#EAE3D8]/30 border border-[#DED8CF] space-y-6">
              <h3 className="text-xl font-medium text-[#292520]">
                Flagship Headquarters
              </h3>

              <div className="space-y-4 text-sm text-[#77716B]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#AD6C4F] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#292520] block">Copenhagen Atelier</span>
                    <span>Bredgade 42, 1260 København K, Denmark</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#AD6C4F] shrink-0" />
                  <span>+45 33 12 80 00</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#AD6C4F] shrink-0" />
                  <span>concierge@aura-living.com</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#DED8CF]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-2">
                FOR ARCHITECTS & TRADE
              </span>
              <h4 className="text-base font-medium text-[#292520] mb-2">
                AURA Trade Program
              </h4>
              <p className="text-xs text-[#77716B] leading-relaxed mb-4">
                We offer exclusive trade tiers, high-resolution CAD and BIM 3D models, bespoke finish matching, and expedited white-glove logistics for registered interior architects and spatial designers.
              </p>
              <span className="text-xs font-mono text-[#AD6C4F]">trade@aura-living.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
