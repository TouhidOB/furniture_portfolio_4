import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MessageSquare } from 'lucide-react';

export const FinalInvitation = ({ sectionData }) => {
  const headline = sectionData?.headline || 'Live beautifully.';
  const subheadline = sectionData?.subheadline || 'Objects that shape everyday life.';
  const bodyText = sectionData?.body_text || 'Discover furniture designed to bring character, comfort, and meaning to your space.';

  return (
    <section id="final-invitation" className="py-28 px-6 md:px-12 bg-gradient-to-b from-[#FAF8F4] to-[#EAE3D8] border-t border-[#DED8CF] text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto z-10 relative">
        <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-4 bg-[#AD6C4F]/10 px-4 py-1.5 rounded-full w-fit mx-auto border border-[#AD6C4F]/20">
          14 / 14 • AURA LIVING
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#292520] mb-6 leading-tight">
          {headline}
        </h2>

        <p className="text-lg md:text-xl text-[#77716B] font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          {bodyText}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/collections"
            className="px-8 py-4 rounded-full bg-[#AD6C4F] text-white hover:bg-[#95583E] text-sm font-medium transition-all shadow-md flex items-center gap-2"
          >
            <span>Explore Furniture</span>
            <ChevronRight className="w-4 h-4" />
          </Link>

          <Link
            to="/contact"
            className="px-7 py-4 rounded-full border border-[#DED8CF] bg-white hover:border-[#AD6C4F] text-sm font-medium text-[#292520] transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#AD6C4F]" />
            <span>Speak to a Specialist</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalInvitation;
