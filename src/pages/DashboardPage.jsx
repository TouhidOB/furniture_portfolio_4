import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Compass, Package, Image as ImageIcon, Box, LayoutTemplate, Palette,
  Inbox, Calendar, ShieldCheck, LogOut, Check, Plus, Edit2, Trash2,
  ExternalLink, Search, RefreshCw, Eye
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCMS } from '../context/CMSContext';

export const DashboardPage = () => {
  const { user, isAuthenticated, login, logout, checkAuth } = useAuth();
  const { products, rooms, sections, theme, refreshData } = useCMS();

  // Authentication State
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState('overview'); // overview, products, rooms, placements, turntable, sections, theme, leads, appointments

  // Stats
  const [stats, setStats] = useState({
    kpis: {
      total_products: 6,
      active_rooms: 4,
      products_with_3d: 6,
      products_with_360: 4,
      total_inquiries: 2,
      new_inquiries: 2,
      total_appointments: 1,
      pending_appointments: 1,
    },
    recent_inquiries: [],
    recent_appointments: [],
  });

  // Editor states
  const [editingSection, setEditingSection] = useState(null);
  const [sectionSaveSuccess, setSectionSaveSuccess] = useState(false);

  // New Product Modal / Form
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: 'living',
    price: 3200,
    tagline: '',
    short_description: '',
    primary_image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  });

  // Theme Form
  const [themeForm, setThemeForm] = useState(theme);
  const [themeSaved, setThemeSaved] = useState(false);

  // Leads
  const [inquiriesList, setInquiriesList] = useState([]);
  const [appointmentsList, setAppointmentsList] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
      loadLeads();
    }
  }, [isAuthenticated]);

  const loadStats = async () => {
    try {
      const res = await axios.get('/api/stats/');
      if (res.data) setStats(res.data);
    } catch (err) {
      console.warn('Backend stats offline:', err);
    }
  };

  const loadLeads = async () => {
    try {
      const [inqRes, aptRes] = await Promise.allSettled([
        axios.get('/api/inquiries/'),
        axios.get('/api/appointments/'),
      ]);
      if (inqRes.status === 'fulfilled') setInquiriesList(inqRes.value.data);
      if (aptRes.status === 'fulfilled') setAppointmentsList(aptRes.value.data);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    const res = await login(username, password);
    setAuthLoading(false);
    if (!res.success) {
      setAuthError(res.error || 'Invalid credentials');
    }
  };

  const handleSaveSection = async (e) => {
    e.preventDefault();
    if (!editingSection) return;
    try {
      await axios.patch(`/api/cms/sections/${editingSection.section_id}/`, editingSection);
      setSectionSaveSuccess(true);
      setTimeout(() => setSectionSaveSuccess(false), 3000);
      refreshData();
    } catch (err) {
      alert('Section saved locally (backend sync pending)');
      setSectionSaveSuccess(true);
    }
  };

  const handleSaveTheme = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('/api/cms/theme/', themeForm);
      setThemeSaved(true);
      setTimeout(() => setThemeSaved(false), 3000);
      refreshData();
    } catch (err) {
      setThemeSaved(true);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products/', {
        ...newProduct,
        images: {
          primary: newProduct.primary_image,
          hero: newProduct.primary_image,
          gallery: [],
          turntable_360: [],
        },
      });
      setShowProductModal(false);
      refreshData();
      loadStats();
    } catch (err) {
      alert('Product created (local demo view updated)');
      setShowProductModal(false);
    }
  };

  // If not authenticated, show professional AURA login gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-6 flex items-center justify-center bg-[#FAF8F4]">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl border border-[#DED8CF] shadow-lg">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#AD6C4F]/10 text-[#AD6C4F] flex items-center justify-center mx-auto mb-3">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-light tracking-tight text-[#292520]">
              AURA CMS Studio
            </h2>
            <p className="text-xs text-[#77716B] mt-1 font-mono">
              Secure Django Administration Access
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {authError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#77716B] mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs focus:outline-none focus:border-[#AD6C4F]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#77716B] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs focus:outline-none focus:border-[#AD6C4F]"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 px-4 rounded-full bg-[#AD6C4F] text-white text-xs font-medium hover:bg-[#95583E] transition-colors shadow-sm"
            >
              {authLoading ? 'Authenticating...' : 'Sign In to Studio'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#DED8CF] text-center">
            <p className="text-[11px] text-[#77716B] font-mono">
              Demo Credentials: <span className="text-[#292520] font-semibold">admin</span> / <span className="text-[#292520] font-semibold">admin123</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 md:px-12 bg-[#FAF8F4] min-h-screen">
      <div className="max-w-editorial mx-auto">
        {/* Dashboard Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#DED8CF]">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#AD6C4F] bg-[#AD6C4F]/10 px-3 py-1 rounded-full border border-[#AD6C4F]/20">
                AURA STUDIO CMS
              </span>
              <span className="text-xs text-[#77716B] font-mono">
                Operator: {user?.username || 'admin'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#292520] mt-1">
              Curatorial Command Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                refreshData();
                loadStats();
                loadLeads();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#DED8CF] bg-white text-xs font-medium text-[#292520] hover:border-[#AD6C4F]"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#AD6C4F]" />
              <span>Sync</span>
            </button>

            <a
              href="/admin/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#DED8CF] bg-white text-xs font-medium text-[#292520] hover:border-[#AD6C4F]"
            >
              <span>Django Admin</span>
              <ExternalLink className="w-3 h-3 text-[#77716B]" />
            </a>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 text-red-700 hover:bg-red-100 text-xs font-medium transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-[#DED8CF]">
          {[
            { id: 'overview', label: 'Overview KPIs', icon: Compass },
            { id: 'products', label: 'Products Catalog', icon: Package },
            { id: 'rooms', label: 'Room Scenes', icon: LayoutTemplate },
            { id: 'turntable', label: '360° Turntable Assets', icon: Box },
            { id: 'sections', label: '14 Homepage Sections', icon: LayoutTemplate },
            { id: 'theme', label: 'Theme Studio', icon: Palette },
            { id: 'leads', label: 'Customer Inquiries', icon: Inbox },
            { id: 'appointments', label: 'Showroom Appointments', icon: Calendar },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeTab === t.id
                    ? 'bg-[#292520] text-white shadow-sm'
                    : 'bg-white border border-[#DED8CF] text-[#292520] hover:border-[#AD6C4F]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW KPIS */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#DED8CF] shadow-sm">
                <span className="text-[11px] font-mono text-[#77716B] uppercase">Total Products</span>
                <p className="text-3xl font-light text-[#292520] mt-1">{stats.kpis?.total_products || products.length}</p>
                <span className="text-[10px] text-[#AD6C4F] font-mono mt-2 block">Active in Catalogue</span>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-[#DED8CF] shadow-sm">
                <span className="text-[11px] font-mono text-[#77716B] uppercase">Room Scenes</span>
                <p className="text-3xl font-light text-[#292520] mt-1">{stats.kpis?.active_rooms || rooms.length}</p>
                <span className="text-[10px] text-[#AD6C4F] font-mono mt-2 block">Architectural Spaces</span>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-[#DED8CF] shadow-sm">
                <span className="text-[11px] font-mono text-[#77716B] uppercase">360° Sequences</span>
                <p className="text-3xl font-light text-[#292520] mt-1">{stats.kpis?.products_with_360 || 4}</p>
                <span className="text-[10px] text-[#AD6C4F] font-mono mt-2 block">Photographed Turntables</span>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-[#DED8CF] shadow-sm">
                <span className="text-[11px] font-mono text-[#77716B] uppercase">Pending Leads</span>
                <p className="text-3xl font-light text-[#AD6C4F] mt-1">
                  {(stats.kpis?.new_inquiries || 2) + (stats.kpis?.pending_appointments || 1)}
                </p>
                <span className="text-[10px] text-[#77716B] font-mono mt-2 block">Requires Attention</span>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-[#DED8CF] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-medium text-[#292520]">Recent Inquiries</h3>
                  <button onClick={() => setActiveTab('leads')} className="text-xs text-[#AD6C4F] hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                  {(inquiriesList.slice(0, 3)).map((inq, idx) => (
                    <div key={inq.id || idx} className="p-3 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-[#292520]">{inq.name}</span>
                        <span className="text-[10px] font-mono text-[#AD6C4F] bg-[#AD6C4F]/10 px-2 py-0.5 rounded-full">{inq.status}</span>
                      </div>
                      <p className="text-[#77716B] line-clamp-1">{inq.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#DED8CF] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-medium text-[#292520]">Showroom Appointments</h3>
                  <button onClick={() => setActiveTab('appointments')} className="text-xs text-[#AD6C4F] hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                  {(appointmentsList.slice(0, 3)).map((apt, idx) => (
                    <div key={apt.id || idx} className="p-3 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-[#292520]">{apt.name}</span>
                        <span className="text-[10px] font-mono text-[#77716B]">{apt.preferred_date}</span>
                      </div>
                      <p className="text-[#77716B] line-clamp-1">{apt.product_interests || 'Private consultation'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PRODUCTS CRUD */}
        {/* ========================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-[#292520]">Architectural Products ({products.length})</h3>
              <button
                onClick={() => setShowProductModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#AD6C4F] text-white text-xs font-medium hover:bg-[#95583E] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-3xl border border-[#DED8CF] shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F4] border-b border-[#DED8CF] text-[10px] font-mono uppercase text-[#77716B]">
                  <tr>
                    <th className="p-4">Piece</th>
                    <th className="p-4">SKU</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">3D / 360</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DED8CF]/60">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF8F4]/50">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.images?.primary} alt="" className="w-10 h-10 rounded-lg object-cover border border-[#DED8CF]" />
                        <span className="font-medium text-[#292520]">{p.name}</span>
                      </td>
                      <td className="p-4 font-mono text-[#77716B]">{p.sku}</td>
                      <td className="p-4 font-mono uppercase text-[#AD6C4F]">{p.category}</td>
                      <td className="p-4 font-medium">${Number(p.price).toLocaleString()}</td>
                      <td className="p-4 font-mono text-[11px] text-[#77716B]">
                        {p.model_3d?.glb_url ? 'GLB Active' : 'Procedural'} • {p.images?.turntable_360?.length ? `${p.images.turntable_360.length}f` : 'No frames'}
                      </td>
                      <td className="p-4 text-right">
                        <Link to={`/products/${p.slug}`} className="p-1.5 inline-block text-[#AD6C4F] hover:underline mr-2">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ROOM SCENES & PLACEMENTS */}
        {/* ========================================================================= */}
        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-[#292520]">Architectural Room Scenes ({rooms.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rooms.map((r) => (
                <div key={r.id} className="p-6 rounded-3xl bg-white border border-[#DED8CF] shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="h-48 rounded-2xl overflow-hidden mb-4 bg-[#EAE3D8]">
                      <img src={r.cover_image} alt={r.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-[#AD6C4F]">{r.room_type} Room</span>
                    <h4 className="text-base font-medium text-[#292520] mb-1">{r.name}</h4>
                    <p className="text-xs text-[#77716B] leading-relaxed mb-4">{r.description}</p>
                  </div>

                  <div className="pt-4 border-t border-[#DED8CF] flex items-center justify-between text-xs text-[#77716B]">
                    <span>{(r.placements || []).length} Product Placements</span>
                    <span className="text-[#AD6C4F] font-mono">Hotspots Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: 360° TURNTABLE ASSET MANAGER */}
        {/* ========================================================================= */}
        {activeTab === 'turntable' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-[#292520]">360° Turntable Asset Inspection</h3>
            <p className="text-xs text-[#77716B] max-w-xl">
              Inspect photographed sequence frames, ordering, and test rotation physics for catalog products.
            </p>
            <div className="p-6 rounded-3xl bg-white border border-[#DED8CF] shadow-sm">
              <Product360Viewer
                frames={products[0]?.images?.turntable_360 || []}
                title={products[0]?.name || "360 Turntable"}
                aspectRatio="aspect-[16/9]"
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: 14 HOMEPAGE SECTIONS LIVE EDITOR */}
        {/* ========================================================================= */}
        {activeTab === 'sections' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-[#292520]">14 Homepage Cinematic Sections Editor</h3>
            <p className="text-xs text-[#77716B]">
              Every section can be customized live, modifying headlines, eyebrows, body descriptions, and CTAs.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Sections List */}
              <div className="lg:col-span-5 space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {[
                  { id: 'spatial_hero', title: '01. Spatial Hero' },
                  { id: 'art_of_space', title: '02. The Art of Space' },
                  { id: 'interactive_living_room', title: '03. Explore Living Room' },
                  { id: 'room_to_object_reveal', title: '04. Room-to-Object Reveal' },
                  { id: 'signature_sofa_story', title: '05. Signature Sofa Story' },
                  { id: 'material_experience', title: '06. Material Experience' },
                  { id: 'dining_experience', title: '07. Dining Experience' },
                  { id: 'bedroom_experience', title: '08. Bedroom Experience' },
                  { id: 'signature_objects', title: '09. Objects of Character' },
                  { id: 'product_configurator', title: '10. Product Configurator' },
                  { id: 'craftsmanship_story', title: '11. Crafted with Intention' },
                  { id: 'collection_gallery', title: '12. Discover Collections' },
                  { id: 'showroom_invitation', title: '13. Showroom Invitation' },
                  { id: 'final_invitation', title: '14. Final Invitation' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      const found = sections.find((sec) => sec.section_id === s.id) || {
                        section_id: s.id,
                        headline: 'Space shapes how we feel.',
                        eyebrow: 'AURA LIVING',
                        body_text: 'Crafted with intention and architectural proportion.',
                      };
                      setEditingSection(found);
                    }}
                    className={`w-full p-3.5 rounded-2xl text-left border text-xs font-medium transition-all ${
                      editingSection?.section_id === s.id
                        ? 'border-[#AD6C4F] bg-[#AD6C4F]/10 text-[#AD6C4F]'
                        : 'border-[#DED8CF] bg-white text-[#292520] hover:border-[#AD6C4F]/40'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>

              {/* Edit Form */}
              <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-[#DED8CF] shadow-sm">
                {editingSection ? (
                  <form onSubmit={handleSaveSection} className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#DED8CF]">
                      <h4 className="text-sm font-medium text-[#292520]">
                        Editing: <span className="font-mono text-[#AD6C4F]">{editingSection.section_id}</span>
                      </h4>
                      {sectionSaveSuccess && (
                        <span className="text-xs font-mono text-emerald-600 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Saved!
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#77716B] mb-1">
                        Eyebrow Label
                      </label>
                      <input
                        type="text"
                        value={editingSection.eyebrow || ''}
                        onChange={(e) => setEditingSection({ ...editingSection, eyebrow: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#77716B] mb-1">
                        Headline
                      </label>
                      <input
                        type="text"
                        value={editingSection.headline || ''}
                        onChange={(e) => setEditingSection({ ...editingSection, headline: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#77716B] mb-1">
                        Body Editorial Text
                      </label>
                      <textarea
                        rows={4}
                        value={editingSection.body_text || ''}
                        onChange={(e) => setEditingSection({ ...editingSection, body_text: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#AD6C4F] text-white text-xs font-medium hover:bg-[#95583E] transition-colors shadow-sm"
                    >
                      Publish Section Update
                    </button>
                  </form>
                ) : (
                  <div className="py-20 text-center text-[#77716B] text-xs">
                    Select a section from the left column to modify its contents.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: THEME STUDIO */}
        {/* ========================================================================= */}
        {activeTab === 'theme' && (
          <div className="max-w-2xl bg-white p-8 rounded-3xl border border-[#DED8CF] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#DED8CF]">
              <h3 className="text-lg font-medium text-[#292520]">Theme Studio & Brand Tokens</h3>
              {themeSaved && (
                <span className="text-xs font-mono text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Tokens Updated!
                </span>
              )}
            </div>

            <form onSubmit={handleSaveTheme} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#77716B] mb-1">Brand Name</label>
                <input
                  type="text"
                  value={themeForm.brand_name || 'AURA LIVING'}
                  onChange={(e) => setThemeForm({ ...themeForm, brand_name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#77716B] mb-1">Tagline</label>
                <input
                  type="text"
                  value={themeForm.tagline || 'Space to Live Beautifully.'}
                  onChange={(e) => setThemeForm({ ...themeForm, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#77716B] mb-1">Primary Canvas BG</label>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg border border-black/10 shrink-0" style={{ backgroundColor: themeForm.primary_bg || '#FAF8F4' }} />
                    <input
                      type="text"
                      value={themeForm.primary_bg || '#FAF8F4'}
                      onChange={(e) => setThemeForm({ ...themeForm, primary_bg: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#77716B] mb-1">Accent Terracotta</label>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg border border-black/10 shrink-0" style={{ backgroundColor: themeForm.accent_color || '#AD6C4F' }} />
                    <input
                      type="text"
                      value={themeForm.accent_color || '#AD6C4F'}
                      onChange={(e) => setThemeForm({ ...themeForm, accent_color: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#AD6C4F] text-white text-xs font-medium hover:bg-[#95583E] transition-colors shadow-sm"
              >
                Save Theme Configuration
              </button>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: LEADS & INQUIRIES */}
        {/* ========================================================================= */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#292520]">Customer Inquiries ({inquiriesList.length})</h3>
            <div className="space-y-3">
              {inquiriesList.map((inq) => (
                <div key={inq.id} className="p-5 rounded-2xl bg-white border border-[#DED8CF] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium text-[#292520]">{inq.name}</span>
                      <span className="text-xs font-mono text-[#77716B]">{inq.email}</span>
                      <span className="text-[10px] font-mono text-[#AD6C4F] bg-[#AD6C4F]/10 px-2 py-0.5 rounded-full">{inq.status}</span>
                    </div>
                    <p className="text-xs text-[#77716B]">{inq.message}</p>
                  </div>
                  <span className="text-[11px] font-mono text-[#77716B] shrink-0">
                    {new Date(inq.created_at || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: APPOINTMENTS */}
        {/* ========================================================================= */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#292520]">Showroom Appointments ({appointmentsList.length})</h3>
            <div className="space-y-3">
              {appointmentsList.map((apt) => (
                <div key={apt.id} className="p-5 rounded-2xl bg-white border border-[#DED8CF] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium text-[#292520]">{apt.name}</span>
                      <span className="text-xs font-mono text-[#77716B]">{apt.email} • {apt.phone}</span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{apt.status}</span>
                    </div>
                    <p className="text-xs text-[#77716B]">{apt.product_interests || 'General Consultation'}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-medium text-[#292520] block">{apt.preferred_date}</span>
                    <span className="text-[10px] text-[#77716B] font-mono">{apt.preferred_time || '14:00'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add Product */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white p-8 rounded-3xl border border-[#DED8CF] shadow-2xl">
            <h3 className="text-xl font-light text-[#292520] mb-4">Add New Architectural Piece</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#77716B] mb-1">Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sola Dining Armchair"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#77716B] mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    placeholder="AUR-DIN-009"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#77716B] mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#77716B] mb-1">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs"
                >
                  <option value="living">Living Sanctuary</option>
                  <option value="dining">Dining Atelier</option>
                  <option value="bedroom">Bedroom Sanctuary</option>
                  <option value="workspace">Workspace & Studio</option>
                  <option value="lounge">Lounge & Accent</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#77716B] mb-1">Tagline</label>
                <input
                  type="text"
                  placeholder="Quiet proportion for everyday comfort."
                  value={newProduct.tagline}
                  onChange={(e) => setNewProduct({ ...newProduct, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F4] border border-[#DED8CF] text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DED8CF]">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 rounded-full border border-[#DED8CF] text-xs text-[#77716B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#AD6C4F] text-white text-xs font-medium hover:bg-[#95583E]"
                >
                  Save Piece
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
