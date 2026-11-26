import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const CollectionGallery = ({ sectionData }) => {
  const headline = sectionData?.headline || 'Discover your space.';
  const subheadline = sectionData?.subheadline || 'Living, Dining, Bedroom, Workspace.';
  const bodyText = sectionData?.body_text || 'Four distinct spatial chapters designed to harmonize across the open plan home.';

  const collections = [
    {
      title: 'Living Sanctuary',
      category: 'living',
      count: '6 Objects',
      description: 'Modular sofas, sculptural lounge chairs, and low travertine tables.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      span: 'md:col-span-8 h-[380px] sm:h-[480px]'
    },
    {
      title: 'Dining Atelier',
      category: 'dining',
      count: '4 Objects',
      description: 'Monolithic solid walnut tables and steam-bent chairs.',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=85',
      span: 'md:col-span-4 h-[380px] sm:h-[480px]'
    },
    {
      title: 'Bedroom Sanctuary',
      category: 'bedroom',
      count: '3 Objects',
      description: 'Low-profile platform beds and tactile Belgian linen headboards.',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=85',
      span: 'md:col-span-5 h-[380px] sm:h-[440px]'
    },
    {
      title: 'Studio & Workspace',
      category: 'workspace',
      count: '4 Objects',
      description: 'Cantilevered desks, credenzas, and ergonomic task seating.',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85',
      span: 'md:col-span-7 h-[380px] sm:h-[440px]'
    }
  ];

  return (
    <section id="collections" className="py-24 px-6 md:px-12 bg-[#FAF8F4] border-t border-[#DED8CF]">
      <div className="max-w-editorial mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-2">
              12 / 14 • CURATED SPACES
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#292520]">
              {headline}
            </h2>
          </div>
          <p className="text-[#77716B] text-sm md:text-base max-w-md">
            {bodyText}
          </p>
        </div>

        {/* Asymmetrical Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {collections.map((col) => (
            <Link
              key={col.category}
              to={`/collections?category=${col.category}`}
              className={`${col.span} relative rounded-3xl overflow-hidden border border-[#DED8CF] group shadow-sm flex flex-col justify-end p-8 text-white`}
            >
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201D1A]/85 via-[#201D1A]/30 to-transparent" />

              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-1">
                    {col.count}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light text-white mb-2">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#EAE3D8]/80 max-w-sm hidden sm:block">
                    {col.description}
                  </p>
                </div>

                <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/20 group-hover:bg-[#AD6C4F] group-hover:border-[#AD6C4F] transition-all">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionGallery;
