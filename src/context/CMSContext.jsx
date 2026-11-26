import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { FALLBACK_PRODUCTS, FALLBACK_ROOMS, FALLBACK_MATERIALS, FALLBACK_SHOWROOMS } from '../data/fallbackData';

const CMSContext = createContext();

export const CMSProvider = ({ children }) => {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [rooms, setRooms] = useState(FALLBACK_ROOMS);
  const [sections, setSections] = useState([]);
  const [theme, setTheme] = useState({
    brand_name: 'AURA LIVING',
    tagline: 'Space to Live Beautifully.',
    primary_bg: '#FAF8F4',
    secondary_bg: '#EAE3D8',
    accent_color: '#AD6C4F',
    text_color: '#292520',
  });
  const [materials, setMaterials] = useState(FALLBACK_MATERIALS);
  const [showrooms, setShowrooms] = useState(FALLBACK_SHOWROOMS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [prodRes, roomRes, secRes, themeRes, matRes, showRes] = await Promise.allSettled([
        axios.get('/api/products/'),
        axios.get('/api/rooms/'),
        axios.get('/api/cms/sections/'),
        axios.get('/api/cms/theme/'),
        axios.get('/api/materials/'),
        axios.get('/api/showrooms/'),
      ]);

      if (prodRes.status === 'fulfilled' && prodRes.value.data.length > 0) {
        setProducts(prodRes.value.data);
      }
      if (roomRes.status === 'fulfilled' && roomRes.value.data.length > 0) {
        setRooms(roomRes.value.data);
      }
      if (secRes.status === 'fulfilled' && secRes.value.data.length > 0) {
        setSections(secRes.value.data);
      }
      if (themeRes.status === 'fulfilled' && themeRes.value.data) {
        setTheme(themeRes.value.data);
      }
      if (matRes.status === 'fulfilled' && matRes.value.data.length > 0) {
        setMaterials(matRes.value.data);
      }
      if (showRes.status === 'fulfilled' && showRes.value.data.length > 0) {
        setShowrooms(showRes.value.data);
      }
    } catch (err) {
      console.warn('Using local fallback data while connecting to AURA backend:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSection = (sectionId, fallbackData = {}) => {
    const found = sections.find(s => s.section_id === sectionId);
    return found || fallbackData;
  };

  const updateSectionLive = (sectionId, updatedFields) => {
    setSections(prev =>
      prev.map(s => (s.section_id === sectionId ? { ...s, ...updatedFields } : s))
    );
  };

  return (
    <CMSContext.Provider
      value={{
        products,
        rooms,
        sections,
        theme,
        materials,
        showrooms,
        loading,
        getSection,
        updateSectionLive,
        refreshData: fetchInitialData,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
