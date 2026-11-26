import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

export const MaterialExperience = ({ sectionData, materials = [] }) => {
  const [selectedMaterial, setSelectedMaterial] = useState(0);

  const headline = sectionData?.headline || 'Beautiful down to the details.';
  const subheadline = sectionData?.subheadline || 'Natural leathers, raw bouclés, solid Appalachian timbers.';
  const bodyText = sectionData?.body_text || 'We reject synthetic finishes in favor of living materials that acquire a soulful patina with time and care.';

  const materialList = materials && materials.length > 0 ? materials : [
    {
      id: 1,
      name: 'Tuscan Full-Grain Aniline Leather',
      material_type: 'Leather',
      color_hex: '#965737',
      description: 'Hand-selected European bull hides tanned using plant polyphenols. Zero plastic topcoats ensure natural thermal breathability and a velvety touch.',
      origin: 'Florence, Italy',
      tactility: 'Warm, supple, responsive',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 2,
      name: 'Nubuck Virgin Wool Bouclé',
      material_type: 'Bouclé',
      color_hex: '#E8E3D9',
      description: 'Heavyweight loop-pile weave using pure unbleached New Zealand wool. Rich three-dimensional depth with extreme abrasion resistance.',
      origin: 'Biella, Italy',
      tactility: 'Cloud-soft, structured, insulating',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 3,
      name: 'Heavy Belgian Washed Linen',
      material_type: 'Linen',
      color_hex: '#D9D2C5',
      description: '100% natural flax harvested along the Lys river valley. Pre-washed with pumice stones for a casual, lived-in drape that stays cool in summer.',
      origin: 'Flanders, Belgium',
      tactility: 'Crisp, airy, textured slub',
      image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 4,
      name: 'Appalachian Black Walnut',
      material_type: 'Walnut',
      color_hex: '#4A3222',
      description: 'Slow-grown sustainably harvested American timber featuring deep espresso heartwood and amber caramel figuring, sealed with natural carnauba wax.',
      origin: 'Pennsylvania, USA',
      tactility: 'Silky, dense, organically fragrant',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 5,
      name: 'Fumed European White Oak',
      material_type: 'Oak',
      color_hex: '#B09C85',
      description: 'Subjected to controlled ammonia vapor chamber fuming that reacts with native wood tannins, creating deep grey-brown tones without dyes.',
      origin: 'Bavaria, Germany',
      tactility: 'Firm, open-pore, architectural',
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 6,
      name: 'Patinated Burnished Bronze',
      material_type: 'Metal',
      color_hex: '#705D47',
      description: 'Solid machined brass alloy chemically darkened with liver of sulfur and brushed with steel wool to reveal golden highlights along corners.',
      origin: 'Birmingham, UK',
      tactility: 'Substantial, cool, hand-finished',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85'
    }
  ];

  const current = materialList[selectedMaterial];

  return (
    <section id="materials" className="py-24 px-6 md:px-12 bg-[#FAF8F4] border-t border-[#DED8CF]">
      <div className="max-w-editorial mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-2">
              06 / 14 • TACTILE SPECIFICATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#292520]">
              {headline}
            </h2>
          </div>
          <p className="text-[#77716B] text-sm md:text-base max-w-md">
            {bodyText}
          </p>
        </div>

        {/* 6 Material Category Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-[#DED8CF]">
          {materialList.map((mat, idx) => (
            <button
              key={mat.id || idx}
              onClick={() => setSelectedMaterial(idx)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedMaterial === idx
                  ? 'bg-[#292520] text-white shadow-md'
                  : 'bg-white border border-[#DED8CF] text-[#292520] hover:border-[#AD6C4F]'
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/20"
                style={{ backgroundColor: mat.color_hex }}
              />
              <span>{mat.material_type}</span>
            </button>
          ))}
        </div>

        {/* Showcase Arena: Macro High-Res Preview + Technical Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#EAE3D8]/30 p-6 md:p-10 rounded-3xl border border-[#DED8CF]">
          {/* Left: High-Res Macro Image */}
          <div className="lg:col-span-7 h-[360px] sm:h-[460px] rounded-2xl overflow-hidden border border-[#DED8CF] relative shadow-sm group">
            <img
              src={current.image}
              alt={current.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#DED8CF] text-xs font-mono text-[#292520]">
              Macro Detail • {current.material_type}
            </div>
          </div>

          {/* Right: Technical Attributes */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-2">
                Origin: {current.origin}
              </span>
              <h3 className="text-2xl sm:text-3xl font-light text-[#292520] mb-3">
                {current.name}
              </h3>
              <p className="text-sm text-[#77716B] leading-relaxed mb-6">
                {current.description}
              </p>

              {/* Spec Highlights */}
              <div className="space-y-3 p-4 rounded-2xl bg-white border border-[#DED8CF] text-xs">
                <div className="flex justify-between py-1 border-b border-[#DED8CF]/60">
                  <span className="text-[#77716B] font-mono">TACTILITY</span>
                  <span className="text-[#292520] font-medium">{current.tactility}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#DED8CF]/60">
                  <span className="text-[#77716B] font-mono">FINISH TREATMENT</span>
                  <span className="text-[#292520] font-medium">Organic Solvent-Free Wax</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#77716B] font-mono">CERTIFICATION</span>
                  <span className="text-[#292520] font-medium">OEKO-TEX® & FSC® Certified</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/contact?type=swatches"
              className="w-full py-3.5 px-6 rounded-full bg-[#AD6C4F] text-white text-center text-xs font-medium hover:bg-[#95583E] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Order Complimentary Swatch Box</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialExperience;
