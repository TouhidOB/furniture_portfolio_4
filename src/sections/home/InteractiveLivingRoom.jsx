import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ChevronRight, Compass, ArrowRight } from 'lucide-react';

export const InteractiveLivingRoom = ({ sectionData, roomScene, onSelectProduct }) => {
  const [activeHotspot, setActiveHotspot] = useState(null);

  const headline = sectionData?.headline || 'Every piece has a place.';
  const subheadline = sectionData?.subheadline || 'Explore our living sanctuary in spatial context.';
  const bodyText = sectionData?.body_text || 'Discover each bespoke element in its native architectural environment. Select any marker to inspect its geometry, scale, and materiality.';

  const hotspots = [
    {
      id: 1,
      x: 48,
      y: 62,
      name: 'AURA Forma Modular Sofa',
      category: 'Living',
      price: '$6,450',
      slug: 'aura-forma-sofa',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
      description: 'Aniline leather modular sofa with low-slung shadow-gap base.'
    },
    {
      id: 2,
      x: 78,
      y: 56,
      name: 'Koto Sculptural Lounge Chair',
      category: 'Lounge',
      price: '$2,850',
      slug: 'koto-lounge-chair',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80',
      description: 'Molded wool bouclé wing chair on solid American walnut pedestal.'
    },
    {
      id: 3,
      x: 32,
      y: 74,
      name: 'Mesa Low Travertine Table',
      category: 'Occasional',
      price: '$1,950',
      slug: 'mesa-travertine-table',
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=80',
      description: 'Honed Navona travertine block with curved monolithic corners.'
    }
  ];

  return (
    <section id="living-room" className="py-24 px-6 md:px-12 bg-[#FAF8F4] overflow-hidden">
      <div className="max-w-editorial mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-2">
              03 / 14 • ROOM DISCOVERY
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#292520]">
              {headline}
            </h2>
          </div>
          <p className="text-[#77716B] text-sm md:text-base max-w-md">
            {bodyText}
          </p>
        </div>

        {/* Interactive Room Canvas */}
        <div className="relative w-full h-[480px] sm:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden border border-[#DED8CF] shadow-lg group">
          <img
            src={roomScene?.cover_image || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85"}
            alt="AURA Living Room"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#292520]/50 via-transparent to-transparent pointer-events-none" />

          {/* Interactive Hotspots */}
          {hotspots.map((item) => (
            <div
              key={item.id}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot?.id === item.id ? null : item)}
                className="relative flex items-center justify-center p-2 group/spot"
                aria-label={`Inspect ${item.name}`}
              >
                <div className="w-10 h-10 rounded-full bg-[#AD6C4F]/25 hotspot-beacon flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-[#AD6C4F] flex items-center justify-center text-white text-xs font-bold shadow-md group-hover/spot:scale-110 transition-transform">
                    ✦
                  </div>
                </div>
              </button>

              {/* Popover Card */}
              {activeHotspot?.id === item.id && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 bg-[#FAF8F4]/95 backdrop-blur-md rounded-2xl border border-[#DED8CF] shadow-xl z-30 animate-fadeIn">
                  <div className="flex gap-3 items-center mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover border border-[#DED8CF]"
                    />
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#AD6C4F] block">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-medium text-[#292520] line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#292520] mt-0.5">
                        {item.price}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#77716B] leading-snug mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <a
                      href="#reveal-engine"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('reveal-engine')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex-1 py-1.5 px-3 rounded-full bg-[#AD6C4F] text-white text-center text-[11px] font-medium hover:bg-[#95583E] transition-colors"
                    >
                      Isolate Object
                    </a>
                    <Link
                      to={`/products/${item.slug}`}
                      className="p-1.5 rounded-full border border-[#DED8CF] bg-white hover:border-[#AD6C4F] text-[#292520] transition-colors"
                      title="View Product Page"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Bottom Room Meta */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white pointer-events-none">
            <div className="flex items-center gap-2 text-xs font-mono bg-[#292520]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#AD6C4F]" />
              <span>Living Sanctuary No. 01</span>
            </div>
            <div className="text-xs text-[#EAE3D8] font-mono hidden sm:block">
              Click beacons to discover products
            </div>
          </div>
        </div>

        {/* Accessible Product Links List below Canvas */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {hotspots.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-[#EAE3D8]/40 border border-[#DED8CF] flex items-center justify-between hover:bg-[#EAE3D8]/70 transition-colors"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-[#77716B]">
                  {item.category}
                </span>
                <h4 className="text-sm font-medium text-[#292520]">
                  {item.name}
                </h4>
                <span className="text-xs font-semibold text-[#AD6C4F] mt-0.5 block">
                  {item.price}
                </span>
              </div>
              <Link
                to={`/products/${item.slug}`}
                className="p-2 rounded-full bg-white border border-[#DED8CF] hover:border-[#AD6C4F] text-[#292520] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveLivingRoom;
