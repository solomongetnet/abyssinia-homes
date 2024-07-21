// Define interface for Property schema
export interface IProperty {
  _id?: string;
  author: string;
  title: string;
  description: string;
  propertyStatus: string;
  propertyType: string;
  price: {
    amount: number;
    currency: string;
    period?: string;
  };
  size: number;
  bedRooms?: number;
  bathRooms?: number;
  roomsSize?: number;
  builtYear: number;
  floorNumber?: number;
  constructionType?: string;
  images: string[];
  videoUrl?: string;
  amenities: string[];
  location: {
    map?: {
      longitude: 0;
      latitude: 0;
    };
    address?: string;
    country?: string;
    city?: string;
    street?: string;
    subcity?: string;
    neighborhood?: string;
    region?: string;
    zipCode?: number;
  };
  distance?: any;
  company?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface IPropertyLocation {
  map?: any;
  address?: string;
  country?: string;
  city?: string;
  street?: string;
  zipCode?: number;
  subcity?: string;
  neighborhood?: string;
  region?: string;
}
