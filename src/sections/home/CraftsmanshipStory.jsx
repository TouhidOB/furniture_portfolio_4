import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Compass, Sparkles, Hammer } from 'lucide-react';

export const CraftsmanshipStory = ({ sectionData }) => {
  const headline = sectionData?.headline || 'Crafted with intention.';
  const subheadline = sectionData?.subheadline || 'Mortise and tenon joinery, master upholstery, hand-rubbed vegetable oils.';
  const bodyText = sectionData?.body_text || 'Every AURA creation is built by second-generation joiners and leather artisans dedicated to unhurried perfection. We honor slow craftsmanship over mass fabrication.';

  const pillars = [
    {
      num: '01',
      title: 'Structural Joinery',
      description: 'Kiln-dried European beech and birch plywood frames connected via traditional mortise and tenon joints, backed by a 15-year guarantee.'
    },
    {
      num: '02',
      title: 'Channel-Stitched Suspension',
      description: 'Sinuous tempered steel springs paired with dual-density high-resilience memory foam that recovers its volume instantly.'
    },
    {
      num: '03',
      title: 'Unhurried Hand Finishing',
      description: 'Four coats of organic hardwax oil buffed between cycles to enhance natural wood fibers without plastic film coatings.'
    }
  ];

  return (
    <section id="craftsmanship" className="py-24 px-6 md:px-12 bg-[#201D1A] text-white overflow-hidden border-t border-[#332E2A]">
      <div className="max-w-editorial mx-auto">
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7">
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-2">
              11 / 14 • ATELIER STANDARDS
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-tight">
              {headline}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[#EAE3D8]/80 text-sm md:text-base leading-relaxed">
              {bodyText}
            </p>
          </div>
        </div>

        {/* Cinematic Atelier Imagery Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/10 relative group">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
              alt="Timber joinery hand finishing"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs font-mono text-[#EAE3D8]">
              Joinery Precision
            </span>
          </div>

          <div className="h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/10 relative group">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
              alt="Hand stitched aniline leather"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs font-mono text-[#EAE3D8]">
              Leather Saddle Stitching
            </span>
          </div>

          <div className="h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/10 relative group">
            <img
              src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80"
              alt="Final wax polishing"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs font-mono text-[#EAE3D8]">
              Natural Hardwax Buffing
            </span>
          </div>
        </div>

        {/* 3 Pillar Statements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
          {pillars.map((p) => (
            <div key={p.num} className="space-y-2">
              <span className="text-xs font-mono text-[#AD6C4F] block">
                {p.num}
              </span>
              <h4 className="text-lg font-medium text-white">
                {p.title}
              </h4>
              <p className="text-xs text-[#EAE3D8]/70 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipStory;
