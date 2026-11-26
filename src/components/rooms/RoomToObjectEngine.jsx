import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Compass, Eye, Check, ChevronRight } from 'lucide-react';
import Product3DStudio from '../three/Product3DStudio';
import Product360Viewer from '../ui/Product360Viewer';

// State Machine Constants
export const ROOM_STATES = {
  ROOM_IDLE: 'ROOM_IDLE',
  ROOM_EXPLORING: 'ROOM_EXPLORING',
  PRODUCT_SELECTED: 'PRODUCT_SELECTED',
  CAMERA_APPROACH: 'CAMERA_APPROACH',
  OBJECT_ISOLATION: 'OBJECT_ISOLATION',
  PRODUCT_STUDIO: 'PRODUCT_STUDIO',
  PRODUCT_INTERACTIVE: 'PRODUCT_INTERACTIVE',
  RETURNING_TO_ROOM: 'RETURNING_TO_ROOM',
};

export const RoomToObjectEngine = ({
  roomScene,
  initialProductId = null,
  onProductSelect = () => {},
  className = ""
}) => {
  const [engineState, setEngineState] = useState(ROOM_STATES.ROOM_IDLE);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('3d'); // '3d' | '360'
  const [activeColor, setActiveColor] = useState('#965737');
  const [activeColorName, setActiveColorName] = useState('Cognac Leather');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Placements with hotspots
  const placements = roomScene?.placements || [];

  // Handle Hotspot Click
  const handleSelectHotspot = (placement) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setEngineState(ROOM_STATES.PRODUCT_SELECTED);
    setSelectedProduct(placement.product_details || placement);

    // Progression of state machine
    setTimeout(() => {
      setEngineState(ROOM_STATES.CAMERA_APPROACH);
    }, 300);

    setTimeout(() => {
      setEngineState(ROOM_STATES.OBJECT_ISOLATION);
    }, 700);

    setTimeout(() => {
      setEngineState(ROOM_STATES.PRODUCT_STUDIO);
      setIsTransitioning(false);
    }, 1200);

    onProductSelect(placement.product_details || placement);
  };

  // Return to Room Context
  const handleReturnToRoom = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setEngineState(ROOM_STATES.RETURNING_TO_ROOM);

    setTimeout(() => {
      setSelectedProduct(null);
      setEngineState(ROOM_STATES.ROOM_IDLE);
      setIsTransitioning(false);
    }, 800);
  };

  const isStudioMode = [
    ROOM_STATES.OBJECT_ISOLATION,
    ROOM_STATES.PRODUCT_STUDIO,
    ROOM_STATES.PRODUCT_INTERACTIVE
  ].includes(engineState);

  return (
    <div className={`relative w-full overflow-hidden rounded-3xl border border-[#DED8CF] bg-[#FAF8F4] ${className}`}>
      {/* Top Status & Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          {isStudioMode ? (
            <button
              onClick={handleReturnToRoom}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F4]/95 backdrop-blur-md border border-[#DED8CF] text-xs font-medium text-[#292520] hover:border-[#AD6C4F] hover:text-[#AD6C4F] transition-all shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Room</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF8F4]/90 backdrop-blur-md border border-[#DED8CF] text-xs font-medium text-[#292520] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#AD6C4F] animate-pulse" />
              <span>Room Exploration • Select Hotspots</span>
            </div>
          )}
        </div>

        {/* State Machine Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF8F4]/90 backdrop-blur-md border border-[#DED8CF] text-[11px] font-mono text-[#77716B] shadow-sm pointer-events-auto">
          <span className="text-[#AD6C4F]">{engineState}</span>
        </div>
      </div>

      {/* Main Visual Arena (Switching between Architectural Room and Isolated Studio) */}
      <div className="relative w-full h-[540px] md:h-[680px] overflow-hidden bg-[#EAE3D8]">
        {/* ROOM STAGE */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            isStudioMode ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          <img
            src={roomScene?.cover_image || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85"}
            alt={roomScene?.name || "Architectural Living Room"}
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#292520]/60 via-transparent to-[#292520]/20 pointer-events-none" />

          {/* Interactive Room Hotspots */}
          {placements.map((placement, idx) => {
            const posX = placement.hotspot_x || (idx === 0 ? 48 : 76);
            const posY = placement.hotspot_y || (idx === 0 ? 62 : 56);
            const label = placement.product_details?.name || placement.label || "AURA Piece";

            return (
              <div
                key={placement.id || idx}
                style={{ left: `${posX}%`, top: `${posY}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
                onClick={() => handleSelectHotspot(placement)}
              >
                {/* Pulsing Beacon */}
                <div className="relative flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#AD6C4F]/30 hotspot-beacon flex items-center justify-center transition-transform group-hover:scale-125">
                    <div className="w-5 h-5 rounded-full bg-[#AD6C4F] flex items-center justify-center text-white text-[11px] font-medium shadow-md">
                      ✦
                    </div>
                  </div>

                  {/* Hover Tag */}
                  <div className="absolute left-1/2 bottom-full -translate-x-1/2 mb-3 hidden group-hover:flex flex-col items-center whitespace-nowrap z-30">
                    <div className="px-3 py-1.5 rounded-xl bg-[#292520]/95 backdrop-blur-md text-white text-xs font-medium shadow-xl border border-white/10 flex items-center gap-2">
                      <span>{label}</span>
                      <ChevronRight className="w-3 h-3 text-[#AD6C4F]" />
                    </div>
                    <div className="w-2 h-2 bg-[#292520] rotate-45 -mt-1" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bottom Room Headline Overlay */}
          <div className="absolute bottom-8 left-8 right-8 z-10 text-white flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#EAE3D8] mb-1 font-mono">
                {roomScene?.room_type || 'Living Sanctuary'}
              </p>
              <h3 className="text-2xl md:text-4xl font-light tracking-tight">
                {roomScene?.headline || 'Every piece has a place.'}
              </h3>
            </div>
            <p className="text-sm text-[#EAE3D8]/80 max-w-sm">
              Click any spatial beacon to isolate the furniture into studio view.
            </p>
          </div>
        </div>

        {/* ISOLATED STUDIO STAGE */}
        <div
          className={`absolute inset-0 bg-[#FAF8F4] transition-all duration-1000 ease-in-out flex flex-col md:flex-row ${
            isStudioMode ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          {/* Studio Left: 3D WebGL / 360 Turntable Viewport */}
          <div className="relative flex-1 h-[340px] md:h-full flex items-center justify-center p-4">
            {activeTab === '3d' ? (
              <Product3DStudio
                modelType={selectedProduct?.category === 'dining' ? 'sofa' : selectedProduct?.category === 'living' && selectedProduct?.slug.includes('chair') ? 'chair' : 'sofa'}
                color={activeColor}
                className="w-full h-full"
              />
            ) : (
              <Product360Viewer
                frames={selectedProduct?.images?.turntable_360 || []}
                title={selectedProduct?.name || "AURA Piece"}
                aspectRatio="aspect-auto"
                className="w-full h-full border-none bg-transparent"
              />
            )}

            {/* Toggle Switch between 3D Real-time and 360 Turntable */}
            <div className="absolute bottom-6 left-6 flex items-center gap-1.5 p-1 rounded-full bg-[#EAE3D8]/80 backdrop-blur-md border border-[#DED8CF]">
              <button
                onClick={() => setActiveTab('3d')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeTab === '3d'
                    ? 'bg-white text-[#292520] shadow-sm'
                    : 'text-[#77716B] hover:text-[#292520]'
                }`}
              >
                Interactive 3D
              </button>
              <button
                onClick={() => setActiveTab('360')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeTab === '360'
                    ? 'bg-white text-[#292520] shadow-sm'
                    : 'text-[#77716B] hover:text-[#292520]'
                }`}
              >
                360° Studio Photos
              </button>
            </div>
          </div>

          {/* Studio Right: Product Info & Configuration Tray */}
          <div className="w-full md:w-[380px] lg:w-[420px] bg-[#FAF8F4] border-t md:border-t-0 md:border-l border-[#DED8CF] p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#AD6C4F] bg-[#AD6C4F]/10 px-2.5 py-0.5 rounded-full">
                  Isolated Object
                </span>
                <span className="text-xs text-[#77716B] font-mono">
                  {selectedProduct?.sku || 'AUR-2026'}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[#292520] mb-2">
                {selectedProduct?.name || 'AURA Forma Modular Sofa'}
              </h3>

              <p className="text-xl font-light text-[#292520] mb-4">
                ${Number(selectedProduct?.price || 6450).toLocaleString()}
                <span className="text-xs text-[#77716B] ml-1 font-mono">USD</span>
              </p>

              <p className="text-sm text-[#77716B] leading-relaxed mb-6">
                {selectedProduct?.short_description || selectedProduct?.tagline || 'Sculptural proportion crafted with tactile natural materials.'}
              </p>

              {/* Material Finish Swatches */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-wider text-[#77716B] font-mono mb-2">
                  Material Finish: <span className="text-[#292520] font-sans font-medium">{activeColorName}</span>
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { hex: '#965737', name: 'Warm Cognac Leather' },
                    { hex: '#E8E3D9', name: 'Ivory Wool Bouclé' },
                    { hex: '#292520', name: 'Obsidian Brushed Hide' },
                    { hex: '#7D8879', name: 'Sage Velvet' },
                  ].map((mat) => (
                    <button
                      key={mat.hex}
                      onClick={() => {
                        setActiveColor(mat.hex);
                        setActiveColorName(mat.name);
                      }}
                      className={`relative w-8 h-8 rounded-full border-2 transition-transform ${
                        activeColor === mat.hex ? 'border-[#AD6C4F] scale-110' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: mat.hex }}
                      title={mat.name}
                    >
                      {activeColor === mat.hex && (
                        <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions Snapshot */}
              {selectedProduct?.dimensions && (
                <div className="p-3.5 rounded-xl bg-[#EAE3D8]/30 border border-[#DED8CF] mb-6 text-xs text-[#77716B] grid grid-cols-3 gap-2 text-center font-mono">
                  <div>
                    <span className="block text-[10px] text-[#77716B]">WIDTH</span>
                    <span className="text-[#292520] font-medium">{selectedProduct.dimensions.width || 280} cm</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#77716B]">DEPTH</span>
                    <span className="text-[#292520] font-medium">{selectedProduct.dimensions.depth || 110} cm</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#77716B]">HEIGHT</span>
                    <span className="text-[#292520] font-medium">{selectedProduct.dimensions.height || 72} cm</span>
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2.5 pt-4 border-t border-[#DED8CF]">
              <Link
                to={`/products/${selectedProduct?.slug || 'aura-forma-sofa'}`}
                className="w-full py-3 px-4 rounded-full bg-[#AD6C4F] text-white text-center text-sm font-medium hover:bg-[#95583E] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>View Full Product Page</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <button
                onClick={handleReturnToRoom}
                className="w-full py-2.5 px-4 rounded-full border border-[#DED8CF] text-[#292520] text-center text-xs font-medium hover:border-[#AD6C4F] transition-colors"
              >
                Return to Living Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomToObjectEngine;
