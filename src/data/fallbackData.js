export const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: 'AURA Forma Modular Sofa',
    slug: 'aura-forma-sofa',
    sku: 'AUR-LIV-001',
    category: 'living',
    collection_name: 'Spatial Series 2026',
    tagline: 'Comfort in its purest architectural form.',
    short_description: 'A low-slung, deeply proportioned modular sofa crafted with memory foam layering, down suspension, and tailored aniline leather.',
    long_description: 'Designed to anchor expansive living volumes. The Forma Modular Sofa combines Scandinavian restraint with generous Mediterranean seating depths. Each modular element connects invisibly via precision-machined magnetic steel clamps, allowing effortless spatial reconfiguration.',
    price: 6450.00,
    currency: 'USD',
    availability: 'in_stock',
    featured: true,
    display_order: 1,
    images: {
      primary: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=85',
      hero: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
      ],
      turntable_360: Array.from({ length: 24 }, (_, i) => `https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80&rot=${i * 15}`)
    },
    model_3d: {
      type: 'glb',
      glb_url: '/models/aura_forma_sofa.glb',
      scale: 1.0,
      initialRotation: [0, 0.4, 0],
      cameraPosition: [0, 1.2, 4.2]
    },
    dimensions: { width: 280, height: 72, depth: 110, seatHeight: 42, unit: 'cm' },
    features: [
      'Multi-density HR foam with recycled feather topper',
      'Solid European beech and kiln-dried birch substructure',
      'Concealed architectural shadow gap plinth in smoked walnut',
      'Seamless 360-degree upholstery suitable for free-standing room placement'
    ],
    specifications: {
      'Frame': 'FSC®-certified kiln-dried solid beech and birch plywood',
      'Suspension': 'High-tensile sinuous steel springs with sound-deadening clips',
      'Cushioning': 'Bio-based high-resilience foam core encased in channel-stitched down',
      'Warranty': '15-year structural frame guarantee'
    },
    variants: [
      { id: 1, name: 'Cognac Aniline Leather', color_name: 'Warm Cognac', color_hex: '#965737', material: 'Aniline Leather', finish: 'Matte Wax' },
      { id: 2, name: 'Ivory Wool Bouclé', color_name: 'Chalk Ivory', color_hex: '#E8E3D9', material: 'Textured Bouclé', finish: 'Soft Weave' },
      { id: 3, name: 'Graphite Heavy Linen', color_name: 'Obsidian', color_hex: '#292520', material: 'Belgian Linen', finish: 'Brushed Natural' }
    ]
  },
  {
    id: 2,
    name: 'Koto Sculptural Lounge Chair',
    slug: 'koto-lounge-chair',
    sku: 'AUR-LIV-002',
    category: 'living',
    collection_name: 'Spatial Series 2026',
    tagline: 'An inviting sanctuary of balance and organic form.',
    short_description: 'Molded organic contours clad in tactile Italian wool bouclé on a solid walnut three-point pedestal.',
    long_description: 'The Koto Chair expresses peaceful solitude. Its wrap-around wing geometry shelters the body while remaining visually weightless inside open floor plans.',
    price: 2850.00,
    currency: 'USD',
    availability: 'in_stock',
    featured: true,
    display_order: 2,
    images: {
      primary: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=85',
      hero: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1800&q=85',
      gallery: [],
      turntable_360: Array.from({ length: 24 }, (_, i) => `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80&rot=${i * 15}`)
    },
    dimensions: { width: 88, height: 82, depth: 92, seatHeight: 40, unit: 'cm' },
    features: ['Continuous curvature molding', 'Brushed brass swivel bearing', 'Virgin wool tactile weave'],
    specifications: { 'Shell': 'Reinforced fiberglass mold', 'Base': 'Solid American Walnut', 'Fabric': 'Kvadrat Fiord 2' },
    variants: [
      { id: 4, name: 'Ivory Bouclé', color_name: 'Ivory', color_hex: '#E8E3D9', material: 'Wool Bouclé' },
      { id: 5, name: 'Saddle Leather', color_name: 'Saddle', color_hex: '#965737', material: 'Leather' }
    ]
  },
  {
    id: 3,
    name: 'Calan Monolithic Dining Table',
    slug: 'calan-dining-table',
    sku: 'AUR-DIN-001',
    category: 'dining',
    collection_name: 'Dining Atelier',
    tagline: 'Made for coming together in celebration and silence.',
    short_description: 'Solid American black walnut dining table with rounded bullnose edges and sculptural columnar pedestals.',
    long_description: 'Generously sized to seat ten comfortably. Calan features hand-matched bookmatched grain planks finished with organic hardwax oil.',
    price: 5200.00,
    currency: 'USD',
    availability: 'in_stock',
    featured: true,
    display_order: 3,
    images: {
      primary: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85',
      hero: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=1800&q=85',
      gallery: [],
      turntable_360: Array.from({ length: 24 }, (_, i) => `https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80&rot=${i * 15}`)
    },
    dimensions: { width: 260, height: 75, depth: 105, unit: 'cm' },
    features: ['Solid 45mm thick walnut slab', 'Concealed expansion hardware', 'Matte satin tactile finish'],
    specifications: { 'Timber': 'FSC Appalachian Black Walnut', 'Finish': 'Natural UV vegetable-based oil' },
    variants: [
      { id: 6, name: 'Smoked Walnut', color_name: 'Walnut', color_hex: '#4A3222', material: 'Walnut' },
      { id: 7, name: 'White Oak', color_name: 'Oak', color_hex: '#B09C85', material: 'White Oak' }
    ]
  },
  {
    id: 4,
    name: 'Sol Minimalist Dining Chair',
    slug: 'sol-dining-chair',
    sku: 'AUR-DIN-002',
    category: 'dining',
    collection_name: 'Dining Atelier',
    tagline: 'Refined silhouette, ergonomic spinal support.',
    short_description: 'Steam-bent solid timber backrest integrated with a recessed saddle leather pad.',
    price: 980.00,
    currency: 'USD',
    availability: 'in_stock',
    featured: false,
    display_order: 4,
    images: {
      primary: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1600&q=85',
      hero: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1800&q=85'
    },
    dimensions: { width: 54, height: 78, depth: 52, seatHeight: 46, unit: 'cm' }
  },
  {
    id: 5,
    name: 'Elysian Low Platform Bed',
    slug: 'elysian-platform-bed',
    sku: 'AUR-BED-001',
    category: 'bedroom',
    collection_name: 'Sanctuary Suite',
    tagline: 'A place to unwind and restore stillness.',
    short_description: 'Floating platform bed framed in warm white oak with a wide cushioned linen headboard.',
    price: 4800.00,
    currency: 'USD',
    availability: 'in_stock',
    featured: true,
    display_order: 5,
    images: {
      primary: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=85',
      hero: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1800&q=85'
    },
    dimensions: { width: 220, height: 85, depth: 230, unit: 'cm' }
  },
  {
    id: 6,
    name: 'Arc Architectural Desk',
    slug: 'arc-architectural-desk',
    sku: 'AUR-WRK-001',
    category: 'workspace',
    collection_name: 'Atelier Series',
    tagline: 'Clarity of mind through precision geometry.',
    short_description: 'Cantilevered desk in brushed travertine and dark fumed oak with concealed leather-lined drawers.',
    price: 4100.00,
    currency: 'USD',
    availability: 'in_stock',
    featured: true,
    display_order: 6,
    images: {
      primary: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1600&q=85',
      hero: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1800&q=85'
    },
    dimensions: { width: 180, height: 74, depth: 80, unit: 'cm' }
  }
];

export const FALLBACK_ROOMS = [
  {
    id: 1,
    name: 'The Sunlit Travertine Living Room',
    slug: 'living-sanctuary',
    room_type: 'living',
    headline: 'Every piece has a place.',
    description: 'A high-ceilinged modern residence bathed in afternoon sunlight, showcasing low-profile seating and raw travertine stone.',
    cover_image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85',
    placements: [
      {
        id: 1,
        product: 1,
        product_details: FALLBACK_PRODUCTS[0],
        hotspot_x: 48,
        hotspot_y: 62,
        label: 'AURA Forma Modular Sofa',
        position_x: 0,
        position_y: 0,
        position_z: 0
      },
      {
        id: 2,
        product: 2,
        product_details: FALLBACK_PRODUCTS[1],
        hotspot_x: 76,
        hotspot_y: 56,
        label: 'Koto Sculptural Lounge Chair',
        position_x: 2.4,
        position_y: 0,
        position_z: 0.6
      }
    ]
  },
  {
    id: 2,
    name: 'The Architectural Dining Pavilion',
    slug: 'dining-experience',
    room_type: 'dining',
    headline: 'Made for coming together.',
    description: 'Open dining space connecting garden light with monolithic walnut joinery and sculptural seating.',
    cover_image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=2000&q=85',
    placements: [
      {
        id: 3,
        product: 3,
        product_details: FALLBACK_PRODUCTS[2],
        hotspot_x: 50,
        hotspot_y: 60,
        label: 'Calan Monolithic Dining Table'
      }
    ]
  },
  {
    id: 3,
    name: 'The Minimalist Bedroom Sanctuary',
    slug: 'bedroom-experience',
    room_type: 'bedroom',
    headline: 'A place to unwind.',
    description: 'Soft morning illumination, muted textiles, and intentional silence around a low floating bed platform.',
    cover_image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=2000&q=85',
    placements: [
      {
        id: 4,
        product: 5,
        product_details: FALLBACK_PRODUCTS[4],
        hotspot_x: 52,
        hotspot_y: 60,
        label: 'Elysian Low Platform Bed'
      }
    ]
  }
];

export const FALLBACK_MATERIALS = [
  { id: 1, name: 'Cognac Tuscan Aniline', slug: 'cognac-aniline', material_type: 'Leather', color_hex: '#965737', description: 'Full-grain Italian bull leather treated with organic vegetable oils.' },
  { id: 2, name: 'Nubuck Bouclé Ivory', slug: 'nubuck-boucle', material_type: 'Bouclé', color_hex: '#E8E3D9', description: 'Virgin wool boucle with looped yarn providing unmatched tactile depth.' },
  { id: 3, name: 'Natural Flax Linen', slug: 'flax-linen', material_type: 'Linen', color_hex: '#D9D2C5', description: 'Stone-washed Belgian linen with natural slub texture and high breathability.' },
  { id: 4, name: 'American Black Walnut', slug: 'black-walnut', material_type: 'Walnut', color_hex: '#4A3222', description: 'Deep chocolate tones with warm caramel grain, finished with matte hardwax.' },
  { id: 5, name: 'Smoked White Oak', slug: 'smoked-oak', material_type: 'Oak', color_hex: '#B09C85', description: 'Fumed European oak highlighting tight growth rings and architectural stability.' },
  { id: 6, name: 'Brushed Burnished Bronze', slug: 'burnished-bronze', material_type: 'Metal', color_hex: '#705D47', description: 'Solid brass with hand-patinated antique oxidation and wax seal.' }
];

export const FALLBACK_SHOWROOMS = [
  { id: 1, name: 'AURA Flagship Copenhagen', slug: 'copenhagen', address: 'Bredgade 42', city: 'Copenhagen', country: 'Denmark', phone: '+45 33 12 80 00', email: 'cph@aura-living.com', opening_hours: 'Mon-Sat 10:00 - 18:00', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
  { id: 2, name: 'AURA Studio London', slug: 'london', address: '18 Mount Street, Mayfair', city: 'London', country: 'United Kingdom', phone: '+44 20 7499 1200', email: 'london@aura-living.com', opening_hours: 'Mon-Sat 10:00 - 18:30', image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80' },
  { id: 3, name: 'AURA Gallery New York', slug: 'new-york', address: '94 Mercer Street, SoHo', city: 'New York', country: 'United States', phone: '+1 212 925 4300', email: 'nyc@aura-living.com', opening_hours: 'Tue-Sun 11:00 - 19:00', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80' }
];
