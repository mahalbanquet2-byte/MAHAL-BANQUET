export interface NavItem {
  label: string;
  path: string;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  capacity: string;
  image: string;
  features: string[];
}

export interface EventType {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface CateringItem {
  category: string;
  description: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date?: string;
}