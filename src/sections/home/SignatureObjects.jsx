import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const SignatureObjects = ({ sectionData, products = [] }) => {
  const headline = sectionData?.headline || 'Objects of character.';
  const subheadline = sectionData?.subheadline || 'Individual expressions of sculptural utility.';
  const bodyText = sectionData?.body_text || 'From the enveloping curves of the Koto lounge chair to precision brass lighting and fumed oak consoles, each object stands with quiet authority.';

  const objects = [
    {
      name: 'Koto Sculptural Lounge Chair',
      slug: 'koto-lounge-chair',
      category: 'Living / Lounge',
      price: '$2,850',
      material: 'Virgin Wool Bouclé & Walnut',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=85',
      span: 'lg:col-span-7'
    },
    {
      name: 'Arc Architectural Desk',
      slug: 'arc-architectural-desk',
      category: 'Studio Workspace',
      price: '$4,100',
      material: 'Navona Travertine & Fumed Oak',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=85',
      span: 'lg:col-span-5'
    },
    {
      name: 'Sol Minimalist Dining Chair',
      slug: 'sol-dining-chair',
      category: 'Dining Atelier',
      price: '$980',
      material: 'Steam-Bent Oak & Saddle Leather',
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=85',
      span: 'lg:col-span-5'
    },
    {
      name: 'Calan Monolithic Dining Table',
      slug: 'calan-dining-table',
      category: 'Dining Atelier',
      price: '$5,200',
      material: 'Appalachian Black Walnut',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=85',
      span: 'lg:col-span-7'
    }
  ];

  return (
    <section id="objects" className="py-24 px-6 md:px-12 bg-[#FAF8F4] border-t border-[#DED8CF]">
      <div className="max-w-editorial mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-2">
              09 / 14 • CHARACTER PIECES
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#292520]">
              {headline}
            </h2>
          </div>
          <p className="text-[#77716B] text-sm md:text-base max-w-md">
            {bodyText}
          </p>
        </div>

        {/* Asymmetrical Editorial Product Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {objects.map((obj, idx) => (
            <Link
              key={obj.slug}
              to={`/products/${obj.slug}`}
              className={`${obj.span} group relative rounded-3xl overflow-hidden border border-[#DED8CF] bg-[#EAE3D8]/30 flex flex-col justify-between transition-all hover:shadow-xl`}
            >
              <div className="h-[340px] sm:h-[420px] w-full overflow-hidden relative">
                <img
                  src={obj.image}
                  alt={obj.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#DED8CF] text-[11px] font-mono text-[#292520]">
                  {obj.category}
                </div>
              </div>

              <div className="p-6 bg-[#FAF8F4] border-t border-[#DED8CF] flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-[#292520] group-hover:text-[#AD6C4F] transition-colors">
                    {obj.name}
                  </h3>
                  <span className="text-xs text-[#77716B] font-mono mt-0.5 block">
                    {obj.material}
                  </span>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className="text-sm font-semibold text-[#292520]">{obj.price}</span>
                  <div className="p-2 rounded-full border border-[#DED8CF] group-hover:border-[#AD6C4F] group-hover:bg-[#AD6C4F] group-hover:text-white transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureObjects;
