export type ServiceType =
  | 'Eletricista'
  | 'Encanador'
  | 'Técnico de computador'
  | 'Fotógrafo'
  | 'Professor particular'
  | 'Designer'
  | 'Manicure'
  | 'Personal trainer'
  | 'Outros serviços';

export interface ServiceProvider {
  id: string;
  name: string;
  serviceType: ServiceType;
  rating: number;
  reviewsCount: number;
  location: string;
  distanceKm: number;
  estimatedArrivalMin: number;
  description: string;
  lat: number;
  lng: number;
  avatarUrl: string;
  startingPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
