import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';
import Product3DStudio from '../../components/three/Product3DStudio';

export const ProductConfigurator = ({ sectionData, product }) => {
  const [selectedMaterial, setSelectedMaterial] = useState('aniline_leather');
  const [selectedColor, setSelectedColor] = useState('#965737');
  const [selectedColorName, setSelectedColorName] = useState('Cognac Tuscan Hide');
  const [selectedSize, setSelectedSize] = useState('3-module');
  const [selectedBase, setSelectedBase] = useState('walnut');

  const headline = sectionData?.headline || 'Made personal.';
  const subheadline = sectionData?.subheadline || 'Interactive Material and Size Studio.';
  const bodyText = sectionData?.body_text || 'Select finishes, upholstery textures, and modular configurations tailored precisely to your architectural scale.';

  const materials = [
    { id: 'aniline_leather', label: 'Tuscan Aniline Leather', hex: '#965737', priceDelta: 0 },
    { id: 'wool_boucle', label: 'Nubuck Wool Bouclé', hex: '#E8E3D9', priceDelta: -400 },
    { id: 'heavy_linen', label: 'Heavy Belgian Linen', hex: '#D9D2C5', priceDelta: -750 },
    { id: 'obsidian_leather', label: 'Obsidian Black Aniline', hex: '#292520', priceDelta: 200 },
  ];

  const sizes = [
    { id: '2-module', label: '2-Module Compact', dimensions: '200 × 110 cm', price: 5400 },
    { id: '3-module', label: '3-Module Classic', dimensions: '280 × 110 cm', price: 6450 },
    { id: '4-module-l', label: '4-Module Corner L', dimensions: '360 × 210 cm', price: 8200 },
  ];

  const currentSizeObj = sizes.find(s => s.id === selectedSize) || sizes[1];
  const currentMatObj = materials.find(m => m.id === selectedMaterial) || materials[0];
  const finalPrice = currentSizeObj.price + currentMatObj.priceDelta;

  return (
    <section id="configurator" className="py-24 px-6 md:px-12 bg-[#FAF8F4] border-t border-[#DED8CF]">
      <div className="max-w-editorial mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-2">
              10 / 14 • BESPOKE TAILORING
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#292520]">
              {headline}
            </h2>
          </div>
          <p className="text-[#77716B] text-sm md:text-base max-w-md">
            {bodyText}
          </p>
        </div>

        {/* Interactive Configurator Suite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#EAE3D8]/30 p-6 md:p-10 rounded-3xl border border-[#DED8CF] shadow-sm">
          {/* Left: Live 3D Studio reflecting the chosen color and size */}
          <div className="lg:col-span-7 relative h-[380px] sm:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#FAF8F4] to-[#EAE3D8] border border-[#DED8CF]">
            <Product3DStudio
              modelType="sofa"
              color={selectedColor}
              className="w-full h-full"
            />

            {/* Live Config Overlay Tag */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#DED8CF] text-xs font-mono text-[#292520] shadow-sm">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedColor }} />
              <span>{selectedColorName}</span>
              <span>•</span>
              <span className="text-[#AD6C4F] font-semibold">{currentSizeObj.dimensions}</span>
            </div>
          </div>

          {/* Right: Configuration Controls */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#DED8CF] flex flex-col justify-between space-y-6">
            <div>
              {/* Product Title & Dynamic Price */}
              <div className="flex items-start justify-between pb-4 border-b border-[#DED8CF]/60 mb-6">
                <div>
                  <h3 className="text-xl font-medium text-[#292520]">
                    AURA Forma Configurator
                  </h3>
                  <span className="text-xs text-[#77716B] font-mono">
                    Custom Hand-Crafted in Copenhagen
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-light text-[#292520]">
                    ${finalPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#77716B] font-mono block">USD (Taxes incl.)</span>
                </div>
              </div>

              {/* 1. Size Selection */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-wider text-[#77716B] font-mono mb-2.5">
                  1. Architectural Scale
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSize(s.id)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        selectedSize === s.id
                          ? 'border-[#AD6C4F] bg-[#AD6C4F]/5 shadow-sm'
                          : 'border-[#DED8CF] hover:border-[#AD6C4F]/50'
                      }`}
                    >
                      <span className="block text-xs font-medium text-[#292520] mb-0.5">{s.label}</span>
                      <span className="block text-[10px] text-[#77716B] font-mono">{s.dimensions}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Material & Color Selection */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-wider text-[#77716B] font-mono mb-2.5">
                  2. Material & Swatch: <span className="text-[#292520] font-sans font-medium">{selectedColorName}</span>
                </label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {materials.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedMaterial(m.id);
                        setSelectedColor(m.hex);
                        setSelectedColorName(m.label);
                      }}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                        selectedMaterial === m.id
                          ? 'border-[#AD6C4F] bg-[#AD6C4F]/5 font-medium'
                          : 'border-[#DED8CF] hover:border-[#AD6C4F]/40'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: m.hex }}
                      />
                      <span className="text-xs text-[#292520] truncate">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Plinth Shadow Gap Timber */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#77716B] font-mono mb-2.5">
                  3. Inset Shadow Plinth Base
                </label>
                <div className="flex gap-3">
                  {[
                    { id: 'walnut', name: 'Smoked Walnut' },
                    { id: 'oak', name: 'Fumed White Oak' },
                    { id: 'eisen', name: 'Matte Charcoal Steel' }
                  ].map((base) => (
                    <button
                      key={base.id}
                      onClick={() => setSelectedBase(base.id)}
                      className={`flex-1 py-2 px-3 rounded-xl border text-xs text-center transition-all ${
                        selectedBase === base.id
                          ? 'border-[#292520] bg-[#292520] text-white font-medium'
                          : 'border-[#DED8CF] text-[#292520] hover:border-[#292520]'
                      }`}
                    >
                      {base.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submission CTA */}
            <div className="pt-4 border-t border-[#DED8CF] flex flex-col gap-2">
              <Link
                to={`/contact?intent=config&product=aura-forma-sofa&material=${selectedMaterial}&size=${selectedSize}&price=${finalPrice}`}
                className="w-full py-3.5 px-6 rounded-full bg-[#AD6C4F] text-white text-center text-xs font-medium hover:bg-[#95583E] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Request This Configuration</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] text-center text-[#77716B]">
                Includes complimentary white-glove spatial delivery and 15-year warranty.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductConfigurator;
