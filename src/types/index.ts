export type RootStackParamList = {
  MainTabs: undefined;
  QRScanner: undefined;
  ScavengerHunt: undefined;
  ServiceDetail: { serviceId: string };
  SearchResults: { query: string };
  ParkGallery: undefined;
  ParkHistory: undefined;
  ParksMap: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Events: undefined;
  Parks: undefined;
  Services: undefined;
  More: undefined;
};

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  availability?: string;
  url?: string;
}

export interface Park {
  id: string;
  name: string;
  description: string;
  images: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  amenities: string[];
}

export interface CityHighlight {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  type: 'news' | 'event' | 'announcement';
}