import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '../../utils/animation';

export const ArtOfSpace = ({ sectionData }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  const headline = sectionData?.headline || 'Space shapes how we feel.';
  const subheadline = sectionData?.subheadline || 'The dialogue between light, material, and human pause.';
  const bodyText = sectionData?.body_text || 'Furniture should never interrupt the room. It should invite the atmosphere inwards, holding presence through disciplined proportion and serene weight.';
  const imageUrl = sectionData?.image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax zoom
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1 },
        {
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Text stagger reveal
      gsap.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="art-of-space"
      ref={containerRef}
      className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center px-6 md:px-12 py-24 bg-[#292520] text-white overflow-hidden"
    >
      {/* Background Architectural Canvas with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Architectural dialogue with space"
          className="w-full h-full object-cover opacity-45 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#201D1A] via-[#201D1A]/50 to-[#201D1A]/80" />
      </div>

      {/* Editorial Text Overlay */}
      <div ref={textRef} className="relative z-10 max-w-4xl mx-auto text-center">
        <span className="text-xs uppercase tracking-widest font-mono text-[#EAE3D8] mb-4 inline-block bg-white/10 px-3.5 py-1 rounded-full backdrop-blur-md">
          {sectionData?.eyebrow || 'Architectural Essence'}
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white mb-6 leading-tight">
          {headline}
        </h2>

        <p className="text-lg md:text-xl text-[#EAE3D8] font-light max-w-2xl mx-auto mb-4 leading-relaxed">
          {subheadline}
        </p>

        <p className="text-sm md:text-base text-[#FAF8F4]/80 max-w-xl mx-auto mb-10 leading-relaxed font-light">
          {bodyText}
        </p>

        <Link
          to="/about"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF8F4] text-[#292520] text-xs font-medium hover:bg-white transition-all shadow-lg"
        >
          <span>Explore Architectural Philosophy</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#AD6C4F]" />
        </Link>
      </div>

      {/* Floating Section Index */}
      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-xs font-mono text-white/50 pointer-events-none z-10">
        <span>02 / 14</span>
        <span>THE ART OF SPACE</span>
      </div>
    </section>
  );
};

export default ArtOfSpace;
