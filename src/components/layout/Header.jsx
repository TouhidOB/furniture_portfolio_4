import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Compass, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // On homepage, observe which section is currently in view
      if (location.pathname === '/') {
        const sections = [
          { id: 'hero', nav: 'hero' },
          { id: 'living-room', nav: 'living' },
          { id: 'dining', nav: 'dining' },
          { id: 'bedroom', nav: 'bedroom' },
          { id: 'materials', nav: 'materials' },
          { id: 'configurator', nav: 'configurator' },
        ];

        for (const sec of sections) {
          const el = document.getElementById(sec.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              setActiveSection(sec.nav);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navItems = [
    { label: 'Collections', path: '/collections' },
    { label: 'Living', targetId: 'living-room', fallbackPath: '/collections?category=living' },
    { label: 'Dining', targetId: 'dining', fallbackPath: '/collections?category=dining' },
    { label: 'Bedroom', targetId: 'bedroom', fallbackPath: '/collections?category=bedroom' },
    { label: 'Materials', targetId: 'materials', fallbackPath: '/about' },
    { label: 'Showrooms', path: '/showrooms' },
  ];

  const handleNavClick = (e, item) => {
    if (item.targetId) {
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(item.targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(item.label.toLowerCase());
        }
      } else {
        // Navigate to home with hash
        e.preventDefault();
        navigate(`/#${item.targetId}`);
        setTimeout(() => {
          const element = document.getElementById(item.targetId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF8F4]/90 backdrop-blur-md border-b border-[#DED8CF] py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-editorial mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <span className="text-xl md:text-2xl font-light tracking-widest text-[#292520] font-sans group-hover:text-[#AD6C4F] transition-colors">
            AURA <span className="font-medium text-xs tracking-normal text-[#77716B] ml-1 uppercase">Living</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isTargetActive =
              (item.targetId && activeSection === item.label.toLowerCase()) ||
              (item.path && location.pathname === item.path);

            return (
              <a
                key={item.label}
                href={item.path || `/#${item.targetId}`}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative py-1 transition-colors ${
                  isTargetActive
                    ? 'text-[#AD6C4F] font-semibold'
                    : 'text-[#292520]/80 hover:text-[#292520]'
                }`}
              >
                {item.label}
                {isTargetActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#AD6C4F] rounded-full animate-fadeIn" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#DED8CF] bg-white/80 hover:border-[#AD6C4F] text-xs font-medium text-[#292520] transition-colors shadow-sm"
          >
            <Compass className="w-3.5 h-3.5 text-[#AD6C4F]" />
            <span>CMS Studio</span>
          </Link>

          <Link
            to="/showrooms"
            className="px-4 py-2 rounded-full bg-[#AD6C4F] text-white hover:bg-[#95583E] text-xs font-medium transition-all shadow-sm"
          >
            Book a Visit
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            to="/dashboard"
            className="px-2.5 py-1 rounded-full border border-[#DED8CF] bg-white text-[11px] font-medium text-[#292520]"
          >
            CMS
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#292520] hover:bg-[#EAE3D8]/50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F4] border-b border-[#DED8CF] px-6 py-6 flex flex-col gap-4 shadow-xl">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.path || `/#${item.targetId}`}
              onClick={(e) => handleNavClick(e, item)}
              className="text-base font-medium text-[#292520] py-2 border-b border-[#DED8CF]/40"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-center rounded-full border border-[#DED8CF] text-xs font-medium text-[#292520]"
            >
              Studio Dashboard (CMS)
            </Link>
            <Link
              to="/showrooms"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-center rounded-full bg-[#AD6C4F] text-white text-xs font-medium"
            >
              Book a Visit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
