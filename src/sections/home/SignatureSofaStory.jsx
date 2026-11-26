import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Layers, Sliders, Check } from 'lucide-react';
import Product3DStudio from '../../components/three/Product3DStudio';

export const SignatureSofaStory = ({ sectionData, product }) => {
  const [activeStage, setActiveStage] = useState(0);
  const containerRef = useRef(null);

  const headline = sectionData?.headline || 'Comfort in its purest form.';
  const subheadline = sectionData?.subheadline || 'Forma Modular Sofa — 5 Stages of Construction.';
  const bodyText = sectionData?.body_text || 'Engineered with dual-density high-resilience memory cushioning, hand-stitched aniline hides, and concealed hardwood joins designed to endure generations.';

  const stages = [
    {
      step: '01',
      title: 'Full Architectural Silhouette',
      description: 'Generous 280cm monolithic baseline proportioned to anchor open-plan living rooms without obstructing floor-to-ceiling glass views.',
      cameraAngle: 0,
      focus: 'Proportion & Geometry'
    },
    {
      step: '02',
      title: 'Ergonomic Low Profile',
      description: 'Calculated 42cm seat height paired with 110cm depth encourages natural reclined relaxation and spinal lumbar support.',
      cameraAngle: 0.8,
      focus: 'Ergonomics'
    },
    {
      step: '03',
      title: 'Tuscan Full-Grain Aniline',
      description: 'Uncorrected hides enriched with natural tallow waxes. Breathable cellular pores age with a luminous amber patina.',
      cameraAngle: 1.5,
      focus: 'Materiality'
    },
    {
      step: '04',
      title: 'Concealed Shadow Gap Plinth',
      description: 'Solid FSC European beech and smoked walnut plinth inset by 8cm creates the floating visual suspension.',
      cameraAngle: 2.4,
      focus: 'Substructure'
    },
    {
      step: '05',
      title: 'Modular Reconfigurability',
      description: 'Heavy-duty magnetic alignment pins allow modules to be disconnected or expanded into L-shapes in seconds.',
      cameraAngle: 3.14,
      focus: 'Modularity'
    }
  ];

  return (
    <section id="sofa-story" ref={containerRef} className="py-24 px-6 md:px-12 bg-[#EAE3D8]/30 border-t border-[#DED8CF]">
      <div className="max-w-editorial mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-2">
              05 / 14 • SIGNATURE SOFA STORY
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#292520]">
              {headline}
            </h2>
          </div>
          <p className="text-[#77716B] text-sm md:text-base max-w-md">
            {bodyText}
          </p>
        </div>

        {/* 5-Stage Interactive Story Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F4] p-6 md:p-10 rounded-3xl border border-[#DED8CF] shadow-sm">
          {/* Left Column: 3D Stage Rotating with Stage Scrub */}
          <div className="lg:col-span-7 relative h-[380px] sm:h-[480px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#FAF8F4] to-[#EAE3D8] border border-[#DED8CF]">
            <Product3DStudio
              modelType="sofa"
              color="#965737"
              rotationY={stages[activeStage].cameraAngle}
              className="w-full h-full"
            />

            {/* Stage Indicator Pill */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#DED8CF] text-xs font-mono text-[#292520] shadow-sm">
              <span className="text-[#AD6C4F] font-bold">STAGE {stages[activeStage].step}</span>
              <span>•</span>
              <span>{stages[activeStage].focus}</span>
            </div>
          </div>

          {/* Right Column: Stage List & Specifications */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-3">
              {stages.map((stg, idx) => (
                <div
                  key={stg.step}
                  onClick={() => setActiveStage(idx)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    activeStage === idx
                      ? 'bg-white border-[#AD6C4F] shadow-md'
                      : 'bg-transparent border-transparent hover:bg-white/50 hover:border-[#DED8CF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-mono font-medium ${activeStage === idx ? 'text-[#AD6C4F]' : 'text-[#77716B]'}`}>
                      {stg.step} — {stg.focus}
                    </span>
                    {activeStage === idx && (
                      <span className="w-2 h-2 rounded-full bg-[#AD6C4F]" />
                    )}
                  </div>
                  <h4 className="text-base font-medium text-[#292520] mb-1">
                    {stg.title}
                  </h4>
                  <p className="text-xs text-[#77716B] leading-relaxed">
                    {stg.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-[#DED8CF] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#77716B] block">From $6,450 USD</span>
                <span className="text-xs font-mono text-[#AD6C4F]">FSC® Beech Frame</span>
              </div>
              <Link
                to="/products/aura-forma-sofa"
                className="px-6 py-2.5 rounded-full bg-[#AD6C4F] text-white text-xs font-medium hover:bg-[#95583E] transition-colors flex items-center gap-1.5"
              >
                <span>View Full Anatomy</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureSofaStory;
