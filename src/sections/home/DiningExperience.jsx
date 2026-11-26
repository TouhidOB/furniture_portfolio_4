import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

export const DiningExperience = ({ sectionData, roomScene, featuredProduct }) => {
  const headline = sectionData?.headline || 'Made for coming together.';
  const subheadline = sectionData?.subheadline || 'The Calan Dining Experience.';
  const bodyText = sectionData?.body_text || 'A sculptural presence in solid black walnut that invites intimate conversation and grand celebratory gatherings. Soft bullnose edges and monolithic columnar pedestals honor the natural flow of the dining space.';
  const imageUrl = sectionData?.image_url || 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=2000&q=85';

  return (
    <section id="dining" className="py-24 px-6 md:px-12 bg-[#FAF8F4] border-t border-[#DED8CF]">
      <div className="max-w-editorial mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Cinematic Full-bleed Composition */}
          <div className="lg:col-span-7 relative h-[440px] sm:h-[560px] rounded-3xl overflow-hidden border border-[#DED8CF] shadow-lg group">
            <img
              src={imageUrl}
              alt="AURA Calan Dining Table"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292520]/50 via-transparent to-transparent pointer-events-none" />

            {/* Hotspot Floating Marker */}
            <div className="absolute left-[54%] top-[60%] -translate-x-1/2 -translate-y-1/2 z-10">
              <Link
                to="/products/calan-dining-table"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#DED8CF] text-xs font-medium text-[#292520] shadow-xl hover:border-[#AD6C4F] transition-all group/tag"
              >
                <span className="w-2 h-2 rounded-full bg-[#AD6C4F]" />
                <span>Calan Monolithic Table • $5,200</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#AD6C4F] group-hover/tag:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="absolute bottom-6 left-6 text-white pointer-events-none">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#EAE3D8] block mb-1">
                Dining Atelier No. 02
              </span>
              <h3 className="text-xl sm:text-2xl font-light">
                Calan Dining Table with Sol Chairs
              </h3>
            </div>
          </div>

          {/* Right: Editorial Narrative & Specifications */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block">
              07 / 14 • SPATIAL DINING
            </span>

            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#292520] leading-tight">
              {headline}
            </h2>

            <p className="text-base text-[#77716B] leading-relaxed">
              {bodyText}
            </p>

            {/* Architectural Details Grid */}
            <div className="grid grid-cols-2 gap-4 py-2 border-y border-[#DED8CF]">
              <div>
                <span className="block text-[11px] font-mono text-[#77716B]">PROPORTIONS</span>
                <span className="text-sm font-medium text-[#292520]">260 × 105 × 75 cm</span>
              </div>
              <div>
                <span className="block text-[11px] font-mono text-[#77716B]">SEATING CAPACITY</span>
                <span className="text-sm font-medium text-[#292520]">8 to 10 Guests</span>
              </div>
              <div>
                <span className="block text-[11px] font-mono text-[#77716B]">TIMBER</span>
                <span className="text-sm font-medium text-[#292520]">Appalachian Black Walnut</span>
              </div>
              <div>
                <span className="block text-[11px] font-mono text-[#77716B]">EDGE RADIUS</span>
                <span className="text-sm font-medium text-[#292520]">25mm Soft Bullnose</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/collections?category=dining"
                className="px-6 py-3 rounded-full bg-[#AD6C4F] text-white text-xs font-medium hover:bg-[#95583E] transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>Explore Dining Collection</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/products/calan-dining-table"
                className="px-5 py-3 rounded-full border border-[#DED8CF] bg-white text-[#292520] text-xs font-medium hover:border-[#AD6C4F] transition-colors flex items-center gap-1.5"
              >
                <span>Table Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#AD6C4F]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiningExperience;
