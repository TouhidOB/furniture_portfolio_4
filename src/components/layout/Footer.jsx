import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#EAE3D8] text-[#292520] pt-20 pb-12 border-t border-[#DED8CF]">
      <div className="max-w-editorial mx-auto px-6 md:px-12">
        {/* Top Architectural Invitation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#DED8CF]">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-widest font-mono text-[#AD6C4F] block mb-3">
              AURA LIVING • COPENHAGEN • LONDON • NEW YORK
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#292520] leading-tight mb-6">
              Space shapes how we feel.
            </h2>
            <p className="text-[#77716B] text-base md:text-lg max-w-lg leading-relaxed">
              Quiet architectural furniture designed to hold presence through proportion, tactile materials, and honest form.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="p-8 rounded-2xl bg-[#FAF8F4] border border-[#DED8CF] max-w-md ml-auto w-full">
              <span className="text-xs uppercase tracking-wider text-[#77716B] font-mono block mb-2">
                Private Consultation
              </span>
              <p className="text-sm text-[#292520] mb-4">
                Schedule a 1-on-1 spatial consultation with an AURA architect at our flagship showrooms.
              </p>
              <Link
                to="/showrooms"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#AD6C4F] text-white text-xs font-medium hover:bg-[#95583E] transition-colors"
              >
                <span>Book Appointment</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#77716B] mb-4">
              Spaces
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/collections?category=living" className="hover:text-[#AD6C4F] transition-colors">Living Room</Link></li>
              <li><Link to="/collections?category=dining" className="hover:text-[#AD6C4F] transition-colors">Dining Atelier</Link></li>
              <li><Link to="/collections?category=bedroom" className="hover:text-[#AD6C4F] transition-colors">Bedroom Sanctuary</Link></li>
              <li><Link to="/collections?category=workspace" className="hover:text-[#AD6C4F] transition-colors">Creative Workspace</Link></li>
              <li><Link to="/collections" className="hover:text-[#AD6C4F] transition-colors">All Collections</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#77716B] mb-4">
              Materiality & Atelier
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-[#AD6C4F] transition-colors">Aniline Leathers</Link></li>
              <li><Link to="/about" className="hover:text-[#AD6C4F] transition-colors">Appalachian Walnut</Link></li>
              <li><Link to="/about" className="hover:text-[#AD6C4F] transition-colors">Textured Wool Bouclé</Link></li>
              <li><Link to="/about" className="hover:text-[#AD6C4F] transition-colors">Craftsmanship Standards</Link></li>
              <li><Link to="/contact?type=swatches" className="hover:text-[#AD6C4F] transition-colors">Order Material Swatches</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#77716B] mb-4">
              Showrooms
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/showrooms" className="hover:text-[#AD6C4F] transition-colors">Copenhagen Flagship</Link></li>
              <li><Link to="/showrooms" className="hover:text-[#AD6C4F] transition-colors">London Studio — Mayfair</Link></li>
              <li><Link to="/showrooms" className="hover:text-[#AD6C4F] transition-colors">New York Gallery — SoHo</Link></li>
              <li><Link to="/contact" className="hover:text-[#AD6C4F] transition-colors">Architectural Inquiries</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#77716B] mb-4">
              Studio & Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/dashboard" className="text-[#AD6C4F] font-medium hover:underline flex items-center gap-1"><span>CMS Studio Dashboard</span> <Compass className="w-3.5 h-3.5" /></Link></li>
              <li><a href="/admin/" target="_blank" rel="noreferrer" className="hover:text-[#AD6C4F] transition-colors">Django Administration</a></li>
              <li><a href="/api/health/" target="_blank" rel="noreferrer" className="hover:text-[#AD6C4F] transition-colors">API Health Check</a></li>
              <li><Link to="/contact" className="hover:text-[#AD6C4F] transition-colors">Press & Media Assets</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#DED8CF] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#77716B]">
          <p>© {new Date().getFullYear()} AURA LIVING Inc. All rights reserved. Designed to be felt.</p>
          <div className="flex items-center gap-6">
            <span>Spatial Engine v1.0.0</span>
            <span>•</span>
            <span>Production PBR Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
