import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';

// Import all 14 Homepage Sections
import SpatialHero from '../sections/home/SpatialHero';
import ArtOfSpace from '../sections/home/ArtOfSpace';
import InteractiveLivingRoom from '../sections/home/InteractiveLivingRoom';
import RoomToObjectReveal from '../sections/home/RoomToObjectReveal';
import SignatureSofaStory from '../sections/home/SignatureSofaStory';
import MaterialExperience from '../sections/home/MaterialExperience';
import DiningExperience from '../sections/home/DiningExperience';
import BedroomExperience from '../sections/home/BedroomExperience';
import SignatureObjects from '../sections/home/SignatureObjects';
import ProductConfigurator from '../sections/home/ProductConfigurator';
import CraftsmanshipStory from '../sections/home/CraftsmanshipStory';
import CollectionGallery from '../sections/home/CollectionGallery';
import ShowroomInvitation from '../sections/home/ShowroomInvitation';
import FinalInvitation from '../sections/home/FinalInvitation';

export const HomePage = () => {
  const { products, rooms, getSection, materials, showrooms } = useCMS();
  const location = useLocation();

  // Handle in-page anchor hash scrolling on load or navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  const featuredProduct = products.find(p => p.slug === 'aura-forma-sofa') || products[0];
  const livingRoom = rooms.find(r => r.room_type === 'living') || rooms[0];
  const diningRoom = rooms.find(r => r.room_type === 'dining') || rooms[1];
  const bedroom = rooms.find(r => r.room_type === 'bedroom') || rooms[2];

  return (
    <div className="relative">
      {/* S01: The Spatial Hero */}
      <SpatialHero
        sectionData={getSection('spatial_hero')}
      />

      {/* S02: The Art of Space */}
      <ArtOfSpace
        sectionData={getSection('art_of_space')}
      />

      {/* S03: Explore the Living Room */}
      <InteractiveLivingRoom
        sectionData={getSection('interactive_living_room')}
        roomScene={livingRoom}
      />

      {/* S04: The Room-to-Object Reveal (Signature Transition Engine) */}
      <RoomToObjectReveal
        sectionData={getSection('room_to_object_reveal')}
        roomScene={livingRoom}
        featuredProduct={featuredProduct}
      />

      {/* S05: The Signature Sofa Story */}
      <SignatureSofaStory
        sectionData={getSection('signature_sofa_story')}
        product={featuredProduct}
      />

      {/* S06: Materials You Can Feel */}
      <MaterialExperience
        sectionData={getSection('material_experience')}
        materials={materials}
      />

      {/* S07: The Dining Experience */}
      <DiningExperience
        sectionData={getSection('dining_experience')}
        roomScene={diningRoom}
        featuredProduct={products.find(p => p.category === 'dining')}
      />

      {/* S08: The Bedroom Experience */}
      <BedroomExperience
        sectionData={getSection('bedroom_experience')}
        roomScene={bedroom}
        featuredProduct={products.find(p => p.category === 'bedroom')}
      />

      {/* S09: Objects of Character */}
      <SignatureObjects
        sectionData={getSection('signature_objects')}
        products={products}
      />

      {/* S10: Make It Personal (Product Configurator) */}
      <ProductConfigurator
        sectionData={getSection('product_configurator')}
        product={featuredProduct}
      />

      {/* S11: Crafted with Intention */}
      <CraftsmanshipStory
        sectionData={getSection('craftsmanship_story')}
      />

      {/* S12: Discover the Collections */}
      <CollectionGallery
        sectionData={getSection('collection_gallery')}
      />

      {/* S13: Experience AURA (Showrooms) */}
      <ShowroomInvitation
        sectionData={getSection('showroom_invitation')}
        showrooms={showrooms}
      />

      {/* S14: Final Invitation */}
      <FinalInvitation
        sectionData={getSection('final_invitation')}
      />
    </div>
  );
};

export default HomePage;
