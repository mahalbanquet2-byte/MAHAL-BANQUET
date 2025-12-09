import { NavItem, Venue, EventType, CateringItem, GalleryImage, Review } from './types';

// Image Optimization Helper
export const getOptimizedImage = (url: string, type: 'thumbnail' | 'medium' | 'large' | 'original' = 'large') => {
  if (!url) return url;

  // Optimize Unsplash
  if (url.includes('images.unsplash.com')) {
    const w = type === 'thumbnail' ? 400 : type === 'medium' ? 800 : type === 'large' ? 1200 : 2048;
    // Replace existing w param or append
    if (url.includes('?')) {
       return url.replace(/w=\d+/, `w=${w}`).replace(/q=\d+/, 'q=75');
    }
    return `${url}?q=75&w=${w}&auto=format&fit=crop`;
  }

  // Optimize Imgur (Append 'h' for huge thumbnail 1024px, 'l' for large 640px)
  if (url.includes('imgur.com')) {
    if (type === 'original') return url;
    
    // Simple heuristic: if it looks like a direct ID url (e.g. imgur.com/AbCdEf.jpg)
    // We insert the suffix before the extension
    const parts = url.split('.');
    if (parts.length > 1) {
       const ext = parts.pop();
       const base = parts.join('.');
       const suffix = type === 'thumbnail' ? 't' : type === 'medium' ? 'l' : 'h'; // l=640, h=1024
       // Verify it doesn't already have a suffix? Hard to know for sure, but usually safe to append for ID based
       return `${base}${suffix}.${ext}`;
    }
  }

  return url;
};

export const COMPANY_NAME = "Mahal Banquet";
export const COMPANY_ADDRESS = "Gwarko, Lalitpur, Nepal";
export const COMPANY_PHONE = "+977 9801754060";
export const COMPANY_EMAIL = "info@mahalbanquet.com";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Venues', path: '/venues' },
  { label: 'Events', path: '/events' },
  { label: 'Catering', path: '/catering' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const VENUES: Venue[] = [
  {
    id: 'raj-darbar',
    name: 'Raj Darbar Hall',
    description: 'Our signature grand ballroom featuring neo-classical architecture, 24ft ceilings with crystal chandeliers, and a royal stage for weddings.',
    capacity: '800 - 1500 Guests',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=75&w=1200&auto=format&fit=crop',
    features: ['24ft Ceilings', 'Crystal Chandeliers', 'Bridal Suite', 'Stage Rigging'],
  },
  {
    id: 'rani-garden',
    name: 'Rani Garden',
    description: 'A lush open-air sanctuary in the heart of Lalitpur, perfect for receptions under the stars with ambient lighting.',
    capacity: '400 - 1000 Guests',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=75&w=1200&auto=format&fit=crop',
    features: ['Botanical Gardens', 'Gazebo', 'Ambient Lighting', 'Open Air'],
  },
  {
    id: 'heritage-suite',
    name: 'The Heritage Suite',
    description: 'An intimate, modern space with traditional Newari gold wood-carving accents for engagement parties and executive meets.',
    capacity: '50 - 200 Guests',
    image: 'https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=75&w=1200&auto=format&fit=crop',
    features: ['Private Bar', 'AV Systems', 'Lounge Seating', 'City View'],
  },
];

export const EVENTS: EventType[] = [
  {
    id: 'weddings',
    title: 'Royal Weddings',
    description: 'We bring the grandeur of Nepal’s royal traditions to your special day with comprehensive wedding packages.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=75&w=1200&auto=format&fit=crop',
  },
  {
    id: 'corporate',
    title: 'Corporate Galas',
    description: 'Impress clients and stakeholders with world-class hospitality, high-speed connectivity, and premium catering.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=75&w=1200&auto=format&fit=crop',
  },
  {
    id: 'social',
    title: 'Social Celebrations',
    description: 'From Pasni to milestone anniversaries, we handle every cultural detail with respect and elegance.',
    image: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?q=75&w=1200&auto=format&fit=crop',
  },
];

export const CATERING: CateringItem[] = [
  {
    category: 'Traditional Nepali',
    description: 'Authentic flavors featuring Thakali sets, Newari Bhoye, and local delicacies prepared by master chefs.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=75&w=1200&auto=format&fit=crop',
  },
  {
    category: 'International Fusion',
    description: 'A global culinary journey including Pan-Asian, Italian, and Continental live counters.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=75&w=1200&auto=format&fit=crop',
  },
  {
    category: 'Premium Bar Service',
    description: 'Expert mixologists serving premium spirits and signature gold-infused cocktails.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=75&w=1200&auto=format&fit=crop',
  },
];

// Imgur images optimized with 'h' suffix for huge thumbnail (1024px) or 'l' (640px)
export const GALLERY_IMAGES: GalleryImage[] = [
  { id: '1', src: getOptimizedImage('https://i.imgur.com/5Mdhqzr.jpeg', 'large'), alt: 'Grand Hall Setup', category: 'Interior' },
  { id: '2', src: getOptimizedImage('https://i.imgur.com/Tm5NcyQ.jpeg', 'large'), alt: 'Event Celebration', category: 'Events' },
  { id: '3', src: getOptimizedImage('https://i.imgur.com/PlzPy7I.jpeg', 'large'), alt: 'Fine Dining Arrangement', category: 'Dining' },
  { id: '4', src: getOptimizedImage('https://i.imgur.com/Dr7QFnx.jpeg', 'large'), alt: 'Venue Exterior Night', category: 'Exterior' },
  { id: '5', src: getOptimizedImage('https://i.imgur.com/LWt8wSQ.jpeg', 'large'), alt: 'Wedding Ceremony', category: 'Events' },
  { id: '6', src: getOptimizedImage('https://i.imgur.com/cHdHZYK.jpg', 'large'), alt: 'Banquet Hall Lighting', category: 'Interior' },
  { id: '7', src: getOptimizedImage('https://i.imgur.com/WEWZ5AN.jpg', 'large'), alt: 'Table Setting Detail', category: 'Dining' },
  { id: '8', src: getOptimizedImage('https://i.imgur.com/NxeyHjy.jpg', 'large'), alt: 'Outdoor Garden Area', category: 'Exterior' },
  { id: '9', src: getOptimizedImage('https://i.imgur.com/9UXk4uC.jpeg', 'large'), alt: 'Decor Details', category: 'Interior' },
];

export const REVIEWS: Review[] = [
  { id: '1', name: 'Suraj Shrestha', rating: 5, text: 'The ambiance at Mahal Banquet is unmatched in Lalitpur. We hosted our daughter\'s reception here and the gold detailing amazed everyone.', date: '2 months ago' },
  { id: '2', name: 'Anjali Mahat', rating: 5, text: 'Excellent service and the food was delicious. The staff took care of everything professionally.', date: '1 month ago' },
  { id: '3', name: 'Rohan Karki', rating: 4.5, text: 'A true luxury experience in Gwarko. The hall is spacious and the lighting is perfect for photography.', date: '3 weeks ago' },
  { id: '4', name: 'Binod Tamang', rating: 5, text: 'Best banquet in Lalitpur. Parking is ample and the management is very professional. Highly recommended.', date: '4 months ago' },
  { id: '5', name: 'James Davidson', rating: 5, text: 'From decor to catering, everything was top notch. A very surprisingly high standard of hospitality.', date: '1 week ago' },
  { id: '6', name: 'Sarita Gurung', rating: 5, text: 'Beautiful venue for big weddings. The garden area is lovely in the evenings.', date: '5 months ago' },
];