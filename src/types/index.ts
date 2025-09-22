export interface CityHighlight {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
}

export interface Park {
  id: number;
  name: string;
  description: string;
  address: string;
  amenities: string[];
  images: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  hours: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
  availability: string;
  icon: string;
  details: {
    overview: string;
    howTo?: string[];
    requirements?: string[];
    schedule?: Record<string, string>;
    guidelines?: string[];
    fees?: string;
    contact: string;
  };
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
  ServiceDetail: { serviceId: number };
  ParkGallery: { parkId: number };
  ParkHistory: { parkId: number };
  QRScanner: undefined;
  ScavengerHunt: undefined;
  ParksMap: undefined;
  Search: { query?: string };
};

export type MainTabParamList = {
  Home: undefined;
  Events: undefined;
  Parks: undefined;
  Services: undefined;
  More: undefined;
};