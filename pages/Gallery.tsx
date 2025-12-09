
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_IMAGES, getOptimizedImage } from '../constants';
import { X, ZoomIn, MapPin, Loader2, Image as ImageIcon, RefreshCw, Info, Aperture } from 'lucide-react';

// Extend Window interface to include google
declare global {
  interface Window {
    google: any;
  }
}

// --- TYPES ---
interface GalleryPhoto {
  id: string;
  src: string;
  width: number;
  height: number;
  category: string; // 'Interior' | 'Exterior' | 'Events' | 'Dining'
  attribution?: string;
  alt: string;
  originalSrc?: string; // Add original source for lightbox
}

const PLACE_QUERY = "Mahal Banquet, Gwarko, Lalitpur";

// --- GOOGLE MAPS HOOK ---
const useGooglePlacesGallery = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Helper to safely get API Key without crashing in different environments
    const getApiKey = () => {
      try {
        // Check for Vite
        // @ts-ignore
        if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
          // @ts-ignore
          return import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        }
        // Check for Create React App / Webpack
        // @ts-ignore
        if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
          // @ts-ignore
          return process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        }
      } catch (e) {
        console.warn("Could not retrieve API key from environment.");
      }
      return "";
    };

    const apiKey = getApiKey();

    const loadStaticPhotos = () => {
      const staticPhotos: GalleryPhoto[] = GALLERY_IMAGES.map((img, idx) => ({
        id: `static-${idx}`,
        // Use optimized src from constants (which is 1024px) for grid
        src: img.src,
        // Keep a reference to original high-res for lightbox if we had it, but for now use same
        originalSrc: img.src.replace('h.jpeg', '.jpeg').replace('l.jpeg', '.jpeg'), 
        width: 800,
        height: idx % 3 === 0 ? 1000 : 700,
        category: img.category || 'Events',
        alt: img.alt,
      }));
      setPhotos(staticPhotos);
      setLoading(false);
    };

    // 1. Fallback to static images immediately if no API key is present
    if (!apiKey) {
      console.log("No Google Maps API Key found (or environment access failed). Using static gallery.");
      loadStaticPhotos();
      return;
    }

    setLoading(true);

    const getPlaceDetails = (service: any, placeId: string) => {
      service.getDetails(
        {
          placeId: placeId,
          fields: ['photos', 'name']
        },
        (place: any, status: any) => {
          if (
            window.google && 
            window.google.maps && 
            window.google.maps.places && 
            status === window.google.maps.places.PlacesServiceStatus.OK && 
            place && 
            place.photos && 
            place.photos.length > 0
          ) {
            
            const fetchedPhotos: GalleryPhoto[] = place.photos.map((photo: any, index: number) => {
              const categories = ['Interior', 'Events', 'Dining', 'Exterior', 'Interior', 'Events'];
              
              return {
                id: `google-${index}`,
                src: photo.getUrl({ maxWidth: 1024, maxHeight: 1024 }), // Limit grid size
                originalSrc: photo.getUrl({ maxWidth: 1600, maxHeight: 1600 }), // Higher res for lightbox
                width: photo.width,
                height: photo.height,
                category: categories[index % categories.length],
                attribution: photo.html_attributions?.[0] || 'Mahal Banquet Google Listing',
                alt: `Mahal Banquet Photo ${index + 1}`
              };
            });

            if (fetchedPhotos.length < 6) {
              const extraStatic = GALLERY_IMAGES.slice(0, 6 - fetchedPhotos.length).map((img, idx) => ({
                id: `static-extra-${idx}`,
                src: img.src,
                originalSrc: img.src.replace('h.jpeg', '.jpeg'),
                width: 800,
                height: 800,
                category: img.category,
                alt: img.alt
              }));
              setPhotos([...fetchedPhotos, ...extraStatic]);
            } else {
              setPhotos(fetchedPhotos);
            }
            setLoading(false);
          } else {
            console.warn("Google Places API: No photos found in details.");
            loadStaticPhotos();
          }
        }
      );
    };

    const fetchPlacesData = () => {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        loadStaticPhotos();
        return;
      }

      try {
        const service = new window.google.maps.places.PlacesService(mapDivRef.current || document.createElement('div'));
        const request = { query: PLACE_QUERY };

        service.textSearch(request, (results: any, status: any) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK && 
            results && 
            results.length > 0
          ) {
            const placeId = results[0].place_id;
            getPlaceDetails(service, placeId);
          } else {
            console.warn("Google Places API: Place not found. Status:", status);
            loadStaticPhotos();
          }
        });
      } catch (err) {
        console.error("Error utilizing PlacesService:", err);
        loadStaticPhotos();
      }
    };

    const loadScript = () => {
      if (window.google?.maps?.places) {
        fetchPlacesData();
        return;
      }
      
      if (document.getElementById('google-maps-script')) {
        const checkGoogle = setInterval(() => {
          if (window.google?.maps?.places) {
            clearInterval(checkGoogle);
            fetchPlacesData();
          }
        }, 100);
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = fetchPlacesData;
      script.onerror = () => {
        console.error("Failed to load Google Maps API script");
        loadStaticPhotos();
      };
      document.head.appendChild(script);
    };

    loadScript();
  }, []);

  return { photos, loading, error, mapDivRef };
};

const Gallery = () => {
  const { photos, loading, mapDivRef } = useGooglePlacesGallery();
  const [selectedImage, setSelectedImage] = useState<GalleryPhoto | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Interior', 'Exterior', 'Events', 'Dining'];
  
  const filteredPhotos = activeFilter === 'All' 
    ? photos 
    : photos.filter(p => p.category === activeFilter);

  return (
    <div className="bg-onyx min-h-screen relative font-sans text-ivory">
      {/* Hidden div for Google Places Attribution */}
      <div ref={mapDivRef} style={{ display: 'none' }}></div>

      {/* Dynamic Background Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>

      {/* Hero Section */}
      <div className="pt-32 pb-16 relative z-10">
        <div className="container mx-auto px-6 text-center">

           {/* Royal 3D Emblem */}
           <div className="relative w-20 h-20 mx-auto mb-6 perspective-1000">
             <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-xl animate-pulse"></div>
             <div className="w-full h-full relative transform-style-3d animate-[spin_15s_linear_infinite]">
                <div className="absolute inset-0 rounded-full border border-gold-500/40 border-t-gold-500 border-b-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.2)]"></div>
                <div className="absolute inset-3 rounded-full border border-gold-500/20 border-l-gold-500 rotate-45"></div>
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
               <Aperture size={28} className="text-gold-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-float" />
             </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <ImageIcon size={14} className="text-gold-500" />
            <span className="text-gold-400 text-xs font-bold uppercase tracking-[0.25em] font-cinzel">Visual Journey</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-cinzel text-ivory mb-6 drop-shadow-2xl"
          >
            The Gallery
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto text-lg font-light font-serif italic"
          >
            Explore the architectural elegance, exquisite decor, and vibrant moments captured at Mahal Banquet.
          </motion.p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="sticky top-24 z-30 mb-12 backdrop-blur-xl bg-onyx/80 border-y border-white/5 py-4">
        <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
          <div className="flex justify-center min-w-max gap-4">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeFilter === cat 
                    ? 'bg-gold-500 text-onyx border-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                    : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid - Masonry */}
      <div className="container mx-auto px-6 pb-32 min-h-[50vh]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-gold-500">
            <Loader2 size={48} className="animate-spin mb-4" />
            <span className="font-cinzel text-sm uppercase tracking-widest">Curating Collection...</span>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredPhotos.length > 0 ? (
                filteredPhotos.map((photo, idx) => (
                  <motion.div
                    layout
                    key={photo.id}
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="break-inside-avoid"
                  >
                    {/* Glassmorphic Card - Updated for Crystal Clear effect & Interactivity */}
                    <div 
                      className="group relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-xl cursor-zoom-in hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.2)] hover:border-gold-500/30 transition-all duration-500"
                      onClick={() => setSelectedImage(photo)}
                    >
                      {/* Image with Hover Zoom Effect */}
                      <div className="relative overflow-hidden w-full h-auto">
                        <img 
                          src={photo.src} 
                          alt={photo.alt}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        {/* Gradient Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                        {/* Gold Tint on Hover */}
                        <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                      </div>

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-gold-500 text-[10px] uppercase tracking-widest border border-white/10 shadow-lg">
                          {photo.category}
                        </span>
                      </div>

                      {/* Hover Expand Icon */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-onyx/80 backdrop-blur-md p-3 rounded-full border border-gold-500/50 text-gold-500 shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <ZoomIn size={24} />
                        </div>
                      </div>

                      {/* Bottom Caption Info - Subtle & Readable */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-white text-sm font-serif italic truncate drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
                          {photo.alt}
                        </p>
                        <div className="h-0.5 w-0 group-hover:w-12 bg-gold-500 mt-2 transition-all duration-500 rounded-full"></div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-white/40">
                  <RefreshCw size={48} className="mb-4 opacity-50" />
                  <p className="font-cinzel text-lg">No images found in this category.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-onyx/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-gold-500 hover:text-onyx p-3 rounded-full border border-white/10 z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            
            <div 
              className="relative max-w-7xl max-h-full w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={selectedImage.originalSrc || selectedImage.src} 
                alt={selectedImage.alt} 
                className="max-h-[70vh] md:max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl border border-white/10" 
              />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl w-full md:w-auto"
              >
                <div className="flex flex-col items-center gap-2">
                   <span className="text-gold-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 bg-gold-500/10 rounded-full border border-gold-500/20">
                     {selectedImage.category} Collection
                   </span>
                   <h3 className="text-xl md:text-2xl font-cinzel text-ivory mt-2">{selectedImage.alt}</h3>
                </div>

                {selectedImage.attribution && (
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-white/40 text-xs">
                    <Info size={12} />
                    <span dangerouslySetInnerHTML={{ __html: `Source: ${selectedImage.attribution}` }} />
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;