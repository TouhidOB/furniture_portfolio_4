import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

export const ShowroomInvitation = ({ sectionData, showrooms = [] }) => {
  const [activeCity, setActiveCity] = useState(0);

  const headline = sectionData?.headline || 'Experience the difference.';
  const subheadline = sectionData?.subheadline || 'Step inside our Copenhagen, London, and New York spaces.';
  const bodyText = sectionData?.body_text || 'Schedule an individual consultation with an AURA spatial architect to review floor plans, finishes, and custom dimensions.';

  const showroomList = showrooms && showrooms.length > 0 ? showrooms : [
    {
      name: 'AURA Flagship Copenhagen',
      city: 'Copenhagen',
      country: 'Denmark',
      address: 'Bredgade 42',
      phone: '+45 33 12 80 00',
      email: 'cph@aura-living.com',
      opening_hours: 'Mon-Sat 10:00 - 18:00',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      name: 'AURA Studio London',
      city: 'London',
      country: 'United Kingdom',
      address: '18 Mount Street, Mayfair',
      phone: '+44 20 7499 1200',
      email: 'london@aura-living.com',
      opening_hours: 'Mon-Sat 10:00 - 18:30',
      image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80'
    },
    {
      name: 'AURA Gallery New York',
      city: 'New York',
      country: 'United States',
      address: '94 Mercer Street, SoHo',
      phone: '+1 212 925 4300',
      email: 'nyc@aura-living.com',
      opening_hours: 'Tue-Sun 11:00 - 19:00',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const current = showroomList[activeCity] || showroomList[0];

  return (
    <section id="showrooms" className="py-24 px-6 md:px-12 bg-[#FAF8F4] border-t border-[#DED8CF]">
      <div className="max-w-editorial mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-2">
              13 / 14 • PRIVATE APPOINTMENT
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#292520]">
              {headline}
            </h2>
          </div>
          <p className="text-[#77716B] text-sm md:text-base max-w-md">
            {bodyText}
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-3 mb-8">
          {showroomList.map((sh, idx) => (
            <button
              key={sh.city}
              onClick={() => setActiveCity(idx)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeCity === idx
                  ? 'bg-[#292520] text-white shadow-sm'
                  : 'bg-white border border-[#DED8CF] text-[#292520] hover:border-[#AD6C4F]'
              }`}
            >
              {sh.city} Flagship
            </button>
          ))}
        </div>

        {/* Selected Showroom Presentation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#EAE3D8]/30 p-6 md:p-10 rounded-3xl border border-[#DED8CF]">
          <div className="lg:col-span-7 h-[360px] sm:h-[460px] rounded-2xl overflow-hidden border border-[#DED8CF] relative shadow-sm">
            <img
              src={current.image}
              alt={current.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#DED8CF] text-xs font-mono text-[#292520]">
              {current.city} • {current.country}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-1">
                Sanctuary Showroom
              </span>
              <h3 className="text-2xl sm:text-3xl font-light text-[#292520] mb-6">
                {current.name}
              </h3>

              <div className="space-y-4 text-sm text-[#77716B]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#AD6C4F] shrink-0 mt-0.5" />
                  <span>{current.address}, {current.city}, {current.country}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#AD6C4F] shrink-0" />
                  <span>{current.opening_hours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#AD6C4F] shrink-0" />
                  <span>{current.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#AD6C4F] shrink-0" />
                  <span>{current.email}</span>
                </div>
              </div>
            </div>

            <Link
              to={`/showrooms?city=${current.city.toLowerCase()}`}
              className="w-full py-3.5 px-6 rounded-full bg-[#AD6C4F] text-white text-center text-xs font-medium hover:bg-[#95583E] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Book Private Consultation in {current.city}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowroomInvitation;
