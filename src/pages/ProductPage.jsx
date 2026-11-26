import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Compass, ArrowLeft, Check, ShieldCheck, Truck, RotateCcw,
  Sparkles, Layers, Sliders, ChevronRight, MessageSquare
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import Product3DStudio from '../components/three/Product3DStudio';
import Product360Viewer from '../components/ui/Product360Viewer';

export const ProductPage = () => {
  const { slug } = useParams();
  const { products } = useCMS();
  const [activeTab, setActiveTab] = useState('3d'); // '3d' | '360'
  const [selectedColor, setSelectedColor] = useState('#965737');
  const [selectedColorName, setSelectedColorName] = useState('Cognac Tuscan Aniline');

  const product = products.find((p) => p.slug === slug) || products[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product?.variants && product.variants.length > 0) {
      setSelectedColor(product.variants[0].color_hex || '#965737');
      setSelectedColorName(product.variants[0].name || 'Warm Cognac');
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center min-h-screen">
        <h2 className="text-2xl font-light">Product not found.</h2>
        <Link to="/collections" className="text-[#AD6C4F] underline mt-4 inline-block">Return to Collections</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 bg-[#FAF8F4] min-h-screen">
      <div className="max-w-editorial mx-auto">
        {/* Back breadcrumb */}
        <div className="mb-6">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#77716B] hover:text-[#AD6C4F] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Collections</span>
          </Link>
        </div>

        {/* 1. Cinematic Hero & 3D / 360 Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Interactive 3D / 360 Viewport */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative h-[420px] sm:h-[540px] rounded-3xl overflow-hidden border border-[#DED8CF] bg-gradient-to-b from-[#FAF8F4] to-[#EAE3D8] shadow-sm">
              {activeTab === '3d' ? (
                <Product3DStudio
                  modelType={product.category === 'dining' ? 'sofa' : product.slug.includes('chair') ? 'chair' : 'sofa'}
                  color={selectedColor}
                  className="w-full h-full"
                />
              ) : (
                <Product360Viewer
                  frames={product.images?.turntable_360 || []}
                  title={product.name}
                  aspectRatio="aspect-auto"
                  className="w-full h-full border-none bg-transparent"
                />
              )}

              {/* Viewport Mode Switcher */}
              <div className="absolute bottom-6 left-6 flex items-center gap-1.5 p-1 rounded-full bg-white/90 backdrop-blur-md border border-[#DED8CF] shadow-sm">
                <button
                  onClick={() => setActiveTab('3d')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeTab === '3d'
                      ? 'bg-[#AD6C4F] text-white shadow-sm'
                      : 'text-[#77716B] hover:text-[#292520]'
                  }`}
                >
                  Interactive 3D
                </button>
                <button
                  onClick={() => setActiveTab('360')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeTab === '360'
                      ? 'bg-[#AD6C4F] text-white shadow-sm'
                      : 'text-[#77716B] hover:text-[#292520]'
                  }`}
                >
                  360° Studio Turntable
                </button>
              </div>

              {/* Live Info Pill */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#DED8CF] text-[11px] font-mono text-[#292520] shadow-sm">
                <span>SKU: {product.sku}</span>
              </div>
            </div>

            {/* Thumbnail Preview Strip */}
            <div className="grid grid-cols-4 gap-3">
              <div
                onClick={() => setActiveTab('3d')}
                className={`h-20 rounded-xl overflow-hidden border cursor-pointer p-1 bg-white flex items-center justify-center ${
                  activeTab === '3d' ? 'border-[#AD6C4F] ring-1 ring-[#AD6C4F]' : 'border-[#DED8CF]'
                }`}
              >
                <span className="text-[10px] font-mono text-center text-[#292520]">3D Orbit Canvas</span>
              </div>
              <div
                onClick={() => setActiveTab('360')}
                className={`h-20 rounded-xl overflow-hidden border cursor-pointer p-1 bg-white flex items-center justify-center ${
                  activeTab === '360' ? 'border-[#AD6C4F] ring-1 ring-[#AD6C4F]' : 'border-[#DED8CF]'
                }`}
              >
                <span className="text-[10px] font-mono text-center text-[#292520]">360° Frames</span>
              </div>
              {(product.images?.gallery || []).slice(0, 2).map((img, i) => (
                <div key={i} className="h-20 rounded-xl overflow-hidden border border-[#DED8CF] bg-white">
                  <img src={img} alt="Gallery thumb" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Information, Pricing, Swatches, Purchase/Inquire Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F]">
                  {product.category} • {product.collection_name}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[#292520] mb-3">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-light text-[#292520]">
                  ${Number(product.price).toLocaleString()}
                </span>
                <span className="text-xs font-mono text-[#77716B]">USD (White-Glove Included)</span>
              </div>

              <p className="text-sm text-[#77716B] leading-relaxed mb-8">
                {product.long_description || product.short_description}
              </p>

              {/* Material Finish Swatches */}
              <div className="mb-8 p-5 rounded-2xl bg-[#EAE3D8]/30 border border-[#DED8CF]">
                <label className="block text-xs uppercase tracking-wider text-[#77716B] font-mono mb-3">
                  Selected Upholstery / Timber: <span className="text-[#292520] font-sans font-medium">{selectedColorName}</span>
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { hex: '#965737', name: 'Warm Cognac Leather' },
                    { hex: '#E8E3D9', name: 'Ivory Wool Bouclé' },
                    { hex: '#292520', name: 'Obsidian Aniline Hide' },
                    { hex: '#4A3222', name: 'Appalachian Black Walnut' },
                  ].map((mat) => (
                    <button
                      key={mat.hex}
                      onClick={() => {
                        setSelectedColor(mat.hex);
                        setSelectedColorName(mat.name);
                      }}
                      className={`relative w-9 h-9 rounded-full border-2 transition-transform ${
                        selectedColor === mat.hex ? 'border-[#AD6C4F] scale-110' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: mat.hex }}
                      title={mat.name}
                    >
                      {selectedColor === mat.hex && (
                        <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions Summary */}
              {product.dimensions && (
                <div className="p-4 rounded-2xl bg-white border border-[#DED8CF] mb-8 text-xs grid grid-cols-3 gap-2 text-center font-mono">
                  <div>
                    <span className="block text-[10px] text-[#77716B]">WIDTH</span>
                    <span className="text-[#292520] font-medium">{product.dimensions.width} cm</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#77716B]">DEPTH</span>
                    <span className="text-[#292520] font-medium">{product.dimensions.depth} cm</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#77716B]">HEIGHT</span>
                    <span className="text-[#292520] font-medium">{product.dimensions.height} cm</span>
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <Link
                  to={`/contact?intent=order&product=${product.slug}&material=${encodeURIComponent(selectedColorName)}`}
                  className="w-full py-4 px-6 rounded-full bg-[#AD6C4F] text-white text-center text-sm font-medium hover:bg-[#95583E] transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <span>Request Atelier Order</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <Link
                  to={`/showrooms?product=${product.slug}`}
                  className="w-full py-3.5 px-6 rounded-full border border-[#DED8CF] bg-white text-center text-xs font-medium text-[#292520] hover:border-[#AD6C4F] transition-colors"
                >
                  View in Showroom (Private Appointment)
                </Link>
              </div>

              {/* Guarantees */}
              <div className="mt-8 pt-6 border-t border-[#DED8CF] grid grid-cols-3 gap-4 text-center text-[11px] text-[#77716B]">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#AD6C4F]" />
                  <span>15-Year Warranty</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#AD6C4F]" />
                  <span>White-Glove Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Sparkles className="w-4 h-4 text-[#AD6C4F]" />
                  <span>Handcrafted in EU</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Architectural Features & Engineering Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16 border-t border-[#DED8CF]">
          <div>
            <h3 className="text-xl font-medium text-[#292520] mb-4">
              Architectural Intent & Features
            </h3>
            <ul className="space-y-3 text-sm text-[#77716B]">
              {(product.features || [
                'Engineered with high-resilience foam and channel-stitched down',
                'Solid European beech and birch plywood internal frame',
                'Concealed architectural shadow gap plinth in smoked walnut',
                'Seamless 360-degree upholstery suitable for open-room placement'
              ]).map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD6C4F] shrink-0 mt-2" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium text-[#292520] mb-4">
              Technical Specifications
            </h3>
            <div className="space-y-3 text-xs bg-[#EAE3D8]/30 p-5 rounded-2xl border border-[#DED8CF]">
              {Object.entries(product.specifications || {
                'Frame': 'FSC®-certified kiln-dried solid beech',
                'Suspension': 'High-tensile sinuous steel springs',
                'Cushioning': 'Bio-based high-resilience foam core',
                'Warranty': '15-year structural frame guarantee'
              }).map(([k, v]) => (
                <div key={k} className="flex justify-between py-1 border-b border-[#DED8CF]/60 last:border-none">
                  <span className="font-mono text-[#77716B]">{k}</span>
                  <span className="font-medium text-[#292520] text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Related Pieces */}
        <div className="py-16 border-t border-[#DED8CF]">
          <h3 className="text-2xl font-light text-[#292520] mb-8">
            Complementary Architectural Pieces
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.id}
                to={`/products/${rel.slug}`}
                className="group rounded-2xl overflow-hidden border border-[#DED8CF] bg-white p-4 hover:shadow-lg transition-all"
              >
                <div className="h-48 rounded-xl overflow-hidden mb-3 bg-[#EAE3D8]/40">
                  <img
                    src={rel.images?.primary || rel.images?.hero}
                    alt={rel.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <span className="text-[10px] font-mono uppercase text-[#77716B] block">
                  {rel.category}
                </span>
                <h4 className="text-sm font-medium text-[#292520] group-hover:text-[#AD6C4F] transition-colors">
                  {rel.name}
                </h4>
                <span className="text-xs font-semibold text-[#292520] mt-1 block">
                  ${Number(rel.price).toLocaleString()} USD
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
