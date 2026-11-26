import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ChevronRight, Compass } from 'lucide-react';
import { gsap } from '../../utils/animation';
import Product3DStudio from '../../components/three/Product3DStudio';

export const SpatialHero = ({ sectionData }) => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const ctaRef = useRef(null);
  const visualRef = useRef(null);

  const eyebrow = sectionData?.eyebrow || 'AURA LIVING — COLLECTION 2026';
  const headline = sectionData?.headline || 'A Better Way to Live.';
  const subheadline = sectionData?.subheadline || 'Comfort, Beautifully Redefined.';
  const bodyText = sectionData?.body_text || 'Thoughtful furniture for spaces that feel like home.';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        visualRef.current,
        { scale: 1.08, opacity: 0.7 },
        { scale: 1.0, opacity: 1, duration: 1.6 }
      )
      .fromTo(
        headlineRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, stagger: 0.15 },
        '-=1.0'
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[95vh] md:min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 bg-[#FAF8F4] overflow-hidden"
    >
      {/* Top Architectural Subtitle & Eyebrow */}
      <div className="max-w-editorial mx-auto w-full pt-4 md:pt-8 flex items-center justify-between z-10">
        <span className="text-[11px] md:text-xs font-mono uppercase tracking-widest text-[#AD6C4F] bg-[#AD6C4F]/10 px-3.5 py-1 rounded-full border border-[#AD6C4F]/20">
          {eyebrow}
        </span>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#77716B]">
          <span>Spatial Harmony</span>
          <span>•</span>
          <span>Architectural PBR</span>
        </div>
      </div>

      {/* Center Cinematic Composition: Big Headline + Floating 3D Spatial Canvas */}
      <div className="max-w-editorial mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 py-8">
        {/* Left Column: Editorial Headline & Actions */}
        <div ref={headlineRef} className="lg:col-span-6 flex flex-col justify-center">
          <p className="text-sm font-medium uppercase tracking-wider text-[#77716B] mb-3">
            {subheadline}
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#292520] leading-[1.04] mb-6">
            A Better Way <br />
            <span className="font-normal italic text-[#AD6C4F]">to Live.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#77716B] max-w-md leading-relaxed mb-8">
            {bodyText}
          </p>

          {/* Action CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <Link
              to="/collections"
              className="px-7 py-3.5 rounded-full bg-[#AD6C4F] text-white hover:bg-[#95583E] text-sm font-medium transition-all shadow-md flex items-center gap-2"
            >
              <span>Explore the Collection</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <a
              href="#living-room"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('living-room')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-full border border-[#DED8CF] bg-white/60 hover:bg-white text-sm font-medium text-[#292520] transition-colors flex items-center gap-2"
            >
              <span>Enter the Space</span>
              <Compass className="w-4 h-4 text-[#AD6C4F]" />
            </a>
          </div>
        </div>

        {/* Right Column: 3D Stage / Architectural Hero Rendering */}
        <div ref={visualRef} className="lg:col-span-6 relative h-[360px] sm:h-[460px] md:h-[520px] rounded-3xl overflow-hidden border border-[#DED8CF] bg-gradient-to-b from-[#FAF8F4] to-[#EAE3D8] shadow-sm">
          <Product3DStudio
            modelType="sofa"
            color="#965737"
            autoRotate={true}
            className="w-full h-full"
          />

          {/* Bottom Floating Spatial Tag */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="px-3 py-1.5 rounded-full bg-[#FAF8F4]/90 backdrop-blur-md border border-[#DED8CF] text-[11px] font-mono text-[#292520] shadow-sm">
              <span className="text-[#AD6C4F] font-semibold">AURA Forma Modular Sofa</span> • 3D PBR
            </div>
            <div className="px-2.5 py-1 rounded-full bg-[#292520]/80 backdrop-blur-md text-white text-[10px] font-mono">
              360° Drag Orbit
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-editorial mx-auto w-full flex items-center justify-between text-xs text-[#77716B] font-mono border-t border-[#DED8CF]/60 pt-4 z-10">
        <div className="flex items-center gap-2">
          <span>01 / 14</span>
          <span>•</span>
          <span className="uppercase text-[#292520]">Spatial Discovery</span>
        </div>

        <a
          href="#art-of-space"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('art-of-space')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 hover:text-[#AD6C4F] transition-colors"
        >
          <span>Scroll to Explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default SpatialHero;
