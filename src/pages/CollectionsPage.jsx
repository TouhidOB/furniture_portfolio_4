import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowUpRight, Compass, Filter } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export const CollectionsPage = () => {
  const { products } = useCMS();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Pieces' },
    { id: 'living', label: 'Living Sanctuary' },
    { id: 'dining', label: 'Dining Atelier' },
    { id: 'bedroom', label: 'Bedroom Suite' },
    { id: 'workspace', label: 'Creative Workspace' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-[#FAF8F4] min-h-screen">
      <div className="max-w-editorial mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] block mb-2">
            AURA ARCHITECTURAL CATALOGUE
          </span>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-[#292520] mb-4">
            Curated Spaces
          </h1>
          <p className="text-base text-[#77716B] max-w-xl">
            Proportioned furniture tailored to quiet luxury, architectural clarity, and tactile material honesties.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#DED8CF]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  if (c.id === 'all') {
                    searchParams.delete('category');
                    setSearchParams(searchParams);
                  } else {
                    setSearchParams({ category: c.id });
                  }
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  currentCategory === c.id
                    ? 'bg-[#292520] text-white shadow-sm'
                    : 'bg-white border border-[#DED8CF] text-[#292520] hover:border-[#AD6C4F]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#77716B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by piece or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#DED8CF] text-xs focus:outline-none focus:border-[#AD6C4F]"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#EAE3D8]/30 rounded-3xl border border-[#DED8CF]">
            <Compass className="w-8 h-8 text-[#AD6C4F] mx-auto mb-3" />
            <h3 className="text-lg font-medium text-[#292520] mb-1">No pieces found</h3>
            <p className="text-xs text-[#77716B]">Try adjusting your search criteria or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.slug}`}
                className="group rounded-3xl overflow-hidden border border-[#DED8CF] bg-[#EAE3D8]/30 flex flex-col justify-between hover:shadow-xl transition-all"
              >
                {/* Image Container */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-white">
                  <img
                    src={p.images?.primary || p.images?.hero}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#DED8CF] text-[10px] font-mono uppercase text-[#292520]">
                    {p.category}
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-6 bg-[#FAF8F4] border-t border-[#DED8CF]">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-mono text-[#77716B] block">
                        {p.sku}
                      </span>
                      <h3 className="text-lg font-medium text-[#292520] group-hover:text-[#AD6C4F] transition-colors">
                        {p.name}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base font-semibold text-[#292520]">
                        ${Number(p.price).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-[#77716B] font-mono block">USD</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#77716B] line-clamp-2 mb-4 leading-relaxed">
                    {p.tagline || p.short_description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#DED8CF]/60 text-xs">
                    <span className="text-[11px] font-mono text-[#77716B]">
                      {p.dimensions ? `${p.dimensions.width}×${p.dimensions.depth}×${p.dimensions.height} cm` : 'Custom Dimensions'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#AD6C4F] font-medium group-hover:translate-x-0.5 transition-transform">
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionsPage;
