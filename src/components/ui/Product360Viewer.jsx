import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCw, Compass, ArrowLeftRight } from 'lucide-react';

export const Product360Viewer = ({
  frames = [],
  title = "360° Interactive Turntable",
  aspectRatio = "aspect-[4/3]",
  className = "",
  initialFrame = 0
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialFrame);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const startIndexRef = useRef(0);
  const autoSpinTimerRef = useRef(null);

  // If no frames provided, generate standard 24 photorealistic frames
  const activeFrames = frames && frames.length > 0 ? frames : Array.from({ length: 24 }, (_, i) =>
    `https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80&rot=${i * 15}`
  );

  const totalFrames = activeFrames.length;
  const currentAngle = Math.round((currentIndex / totalFrames) * 360);

  // Preload images
  useEffect(() => {
    let count = 0;
    const preloadList = activeFrames.slice(0, 8); // Priority initial batch
    preloadList.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        count += 1;
        setLoadedCount(count);
        if (count >= Math.min(4, preloadList.length)) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        count += 1;
        setImagesLoaded(true);
      };
    });

    // Lazy load the remaining frames
    const timer = setTimeout(() => {
      activeFrames.slice(8).forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [activeFrames]);

  // Auto-spin logic
  useEffect(() => {
    if (isPlaying) {
      autoSpinTimerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalFrames);
      }, 70);
    } else {
      if (autoSpinTimerRef.current) clearInterval(autoSpinTimerRef.current);
    }
    return () => {
      if (autoSpinTimerRef.current) clearInterval(autoSpinTimerRef.current);
    };
  }, [isPlaying, totalFrames]);

  // Drag interaction handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    setIsPlaying(false);
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startIndexRef.current = currentIndex;
  };

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - startXRef.current;
    const sensitivity = 14; // pixels per frame
    const frameDelta = Math.floor(deltaX / sensitivity);

    let newIndex = (startIndexRef.current + frameDelta) % totalFrames;
    if (newIndex < 0) newIndex += totalFrames;
    setCurrentIndex(newIndex);
  }, [isDragging, totalFrames]);

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setCurrentIndex((prev) => (prev - 1 + totalFrames) % totalFrames);
    } else if (e.key === 'ArrowRight') {
      setCurrentIndex((prev) => (prev + 1) % totalFrames);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none bg-[#EAE3D8]/30 rounded-2xl overflow-hidden border border-[#DED8CF] flex flex-col ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="360 degree turntable product viewer"
    >
      {/* Viewer Canvas Area */}
      <div
        className={`relative w-full ${aspectRatio} flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden`}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        <img
          src={activeFrames[currentIndex]}
          alt={`${title} - angle ${currentAngle}°`}
          className="w-full h-full object-contain pointer-events-none transition-opacity duration-150"
          draggable="false"
        />

        {/* Top Floating Badge & Angle Gauge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF8F4]/90 backdrop-blur-md border border-[#DED8CF] text-xs font-medium text-[#292520] shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[#AD6C4F]" />
            <span>Studio Turntable</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF8F4]/90 backdrop-blur-md border border-[#DED8CF] text-xs font-mono font-medium text-[#292520] shadow-sm">
            <span className="text-[#AD6C4F]">{currentAngle}°</span>
            <span className="text-[#77716B]">/ 360°</span>
          </div>
        </div>

        {/* Drag Hint Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#292520]/80 backdrop-blur-md text-white text-[11px] tracking-wide uppercase">
            <ArrowLeftRight className="w-3 h-3 text-[#AD6C4F]" />
            <span>Drag horizontally to rotate</span>
          </div>
        </div>
      </div>

      {/* Scrub & Control Bar */}
      <div className="p-4 bg-[#FAF8F4] border-t border-[#DED8CF] flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Play/Pause & Reset Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#DED8CF] bg-white hover:border-[#AD6C4F] text-xs font-medium text-[#292520] transition-colors shadow-sm"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#AD6C4F]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#AD6C4F]" />
                <span>Auto Spin</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentIndex(0);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#DED8CF] bg-white hover:border-[#AD6C4F] text-xs font-medium text-[#77716B] hover:text-[#292520] transition-colors shadow-sm"
            title="Reset to frontal view"
          >
            <RotateCw className="w-3 h-3" />
            <span>0° Reset</span>
          </button>
        </div>

        {/* Scrubbing Range Slider */}
        <div className="flex-1 max-w-md w-full flex items-center gap-3">
          <span className="text-[11px] font-mono text-[#77716B] w-8 text-right">0°</span>
          <input
            type="range"
            min="0"
            max={totalFrames - 1}
            value={currentIndex}
            onChange={(e) => {
              setIsPlaying(false);
              setCurrentIndex(parseInt(e.target.value, 10));
            }}
            className="scrub-slider flex-1 h-1.5 bg-[#EAE3D8] rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-[11px] font-mono text-[#77716B] w-8">360°</span>
        </div>

        {/* Sequence Metadata */}
        <div className="hidden md:flex items-center gap-2 text-[11px] text-[#77716B]">
          <span>{totalFrames} Frames</span>
          <span>•</span>
          <span>Photographed Turntable</span>
        </div>
      </div>
    </div>
  );
};

export default Product360Viewer;
