import React from 'react';
import RoomToObjectEngine from '../../components/rooms/RoomToObjectEngine';

export const RoomToObjectReveal = ({ sectionData, roomScene, featuredProduct }) => {
  const headline = sectionData?.headline || 'Designed to stand apart.';
  const subheadline = sectionData?.subheadline || 'From architectural context into isolated product focus.';
  const bodyText = sectionData?.body_text || 'Seamlessly transition between room harmony and granular craftsmanship. Experience the Forma Modular Sofa isolated in 360-degree studio inspection.';

  return (
    <section id="reveal-engine" className="py-24 px-6 md:px-12 bg-[#FAF8F4] border-t border-[#DED8CF]">
      <div className="max-w-editorial mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-2 bg-[#AD6C4F]/10 px-3.5 py-1 rounded-full w-fit mx-auto border border-[#AD6C4F]/20">
            04 / 14 • THE ROOM-TO-OBJECT ENGINE
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#292520] mb-4">
            {headline}
          </h2>
          <p className="text-base sm:text-lg text-[#77716B] leading-relaxed">
            {bodyText}
          </p>
        </div>

        {/* Room-To-Object Interactive Engine Container */}
        <div className="shadow-xl rounded-3xl">
          <RoomToObjectEngine
            roomScene={roomScene}
            initialProductId={featuredProduct?.id}
          />
        </div>
      </div>
    </section>
  );
};

export default RoomToObjectReveal;
