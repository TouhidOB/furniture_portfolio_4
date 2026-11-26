import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

export const BedroomExperience = ({ sectionData, roomScene, featuredProduct }) => {
  const headline = sectionData?.headline || 'A place to unwind.';
  const subheadline = sectionData?.subheadline || 'Low-profile architecture for deep restorative sleep.';
  const bodyText = sectionData?.body_text || 'Elysian softens acoustics and filters spatial visual noise, centering your daily retreat in natural Belgian linens and warm white oak platform joinery.';
  const imageUrl = sectionData?.image_url || 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=2000&q=85';

  return (
    <section id="bedroom" className="py-24 px-6 md:px-12 bg-[#EAE3D8]/20 border-t border-[#DED8CF]">
      <div className="max-w-editorial mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Narrative & Specifications */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block">
              08 / 14 • SERENITY SUITE
            </span>

            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#292520] leading-tight">
              {headline}
            </h2>

            <p className="text-base text-[#77716B] leading-relaxed">
              {bodyText}
            </p>

            <div className="p-4 rounded-2xl bg-white border border-[#DED8CF] space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#DED8CF]/60">
                <span className="text-[#77716B] font-mono">HEADBOARD</span>
                <span className="text-[#292520] font-medium">Channel-stitched Belgian Washed Linen</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DED8CF]/60">
                <span className="text-[#77716B] font-mono">PLATFORM BASE</span>
                <span className="text-[#292520] font-medium">European White Oak Inset Plinth</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#77716B] font-mono">ACOUSTIC RATING</span>
                <span className="text-[#292520] font-medium">Sound-dampening wool interior padding</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/collections?category=bedroom"
                className="px-6 py-3 rounded-full bg-[#AD6C4F] text-white text-xs font-medium hover:bg-[#95583E] transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>Explore Bedroom</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/products/elysian-platform-bed"
                className="px-5 py-3 rounded-full border border-[#DED8CF] bg-white text-[#292520] text-xs font-medium hover:border-[#AD6C4F] transition-colors"
              >
                <span>Bed Anatomy</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Cinematic Bedroom Imagery */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative h-[440px] sm:h-[560px] rounded-3xl overflow-hidden border border-[#DED8CF] shadow-lg group">
            <img
              src={imageUrl}
              alt="AURA Elysian Platform Bed"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292520]/50 via-transparent to-transparent pointer-events-none" />

            <div className="absolute left-[52%] top-[60%] -translate-x-1/2 -translate-y-1/2 z-10">
              <Link
                to="/products/elysian-platform-bed"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#DED8CF] text-xs font-medium text-[#292520] shadow-xl hover:border-[#AD6C4F] transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-[#AD6C4F]" />
                <span>Elysian Platform Bed • $4,800</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#AD6C4F]" />
              </Link>
            </div>

            <div className="absolute bottom-6 left-6 text-white pointer-events-none">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#EAE3D8] block mb-1">
                Sanctuary Suite No. 03
              </span>
              <h3 className="text-xl sm:text-2xl font-light">
                Elysian Bed in Natural Flax Linen
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BedroomExperience;
