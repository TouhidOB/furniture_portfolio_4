import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, ShieldCheck, Sparkles, Feather } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-[#FAF8F4] min-h-screen">
      <div className="max-w-editorial mx-auto">
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-2">
            THE AURA MANIFESTO
          </span>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-[#292520] mb-6">
            Proportion. Stillness. Tactility.
          </h1>
          <p className="text-lg text-[#77716B] leading-relaxed">
            Founded with the belief that domestic spaces fundamentally dictate how we breathe, think, and gather. AURA designs quiet luxury objects engineered to endure generations.
          </p>
        </div>

        {/* Visual Spread */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 items-center">
          <div className="md:col-span-7 h-[420px] rounded-3xl overflow-hidden border border-[#DED8CF] shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
              alt="AURA Architectural Residence"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-5 h-[420px] rounded-3xl overflow-hidden border border-[#DED8CF] shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=85"
              alt="Timber craftsman joinery"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 3 Core Philosophical Tenets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-y border-[#DED8CF] mb-16">
          <div className="space-y-3">
            <span className="text-xs font-mono text-[#AD6C4F] block">PRINCIPLE 01</span>
            <h3 className="text-xl font-medium text-[#292520]">Subservient to Light</h3>
            <p className="text-sm text-[#77716B] leading-relaxed">
              Furniture should never shout. By keeping silhouettes disciplined and low-slung, our pieces allow natural daylight to wash continuously across open floor planes.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono text-[#AD6C4F] block">PRINCIPLE 02</span>
            <h3 className="text-xl font-medium text-[#292520]">Living Material Honesty</h3>
            <p className="text-sm text-[#77716B] leading-relaxed">
              We prohibit plastic polyurethanes. Tuscan full-grain leathers, Belgian linens, and slow-grown Appalachian walnut are nourished solely with natural plant waxes and oils.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono text-[#AD6C4F] block">PRINCIPLE 03</span>
            <h3 className="text-xl font-medium text-[#292520]">Generational Durability</h3>
            <p className="text-sm text-[#77716B] leading-relaxed">
              Each frame is constructed from FSC®-certified kiln-dried beech and birch with double-dowelled joints and sinuous tempered springs backed by our 15-year warranty.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-10 rounded-3xl bg-[#EAE3D8]/40 border border-[#DED8CF] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-light text-[#292520] mb-2">
              Ready to explore our architectural collections?
            </h3>
            <p className="text-sm text-[#77716B]">
              Discover modular seating, dining pavilions, and sanctuary beds.
            </p>
          </div>
          <Link
            to="/collections"
            className="px-6 py-3.5 rounded-full bg-[#AD6C4F] text-white text-xs font-medium hover:bg-[#95583E] transition-colors shrink-0 shadow-sm"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
