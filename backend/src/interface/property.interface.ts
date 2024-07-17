import { Types } from "mongoose";

// Define interface for Property schema
export interface IProperty {
  author: Types.ObjectId;
  title: string;
  description: string;
  propertyStatus: string;
  propertyType: string;
  price?: {
    amount?: number;
    currency?: string;
  };
  size: number;
  bedRooms?: number;
  bathRooms?: number;
  roomsSize?: number;
  builtYear: number;
  floorNumber?: number;
  constructionType?: string;
  images: string[];
  videoUrl: string;
  amenities: string[];
  location: {
    map: {
      longitude: 0;
      latitude: 0;
    };
    address: string;
    country: string;
    city: string;
    street?: string;
    zipCode?: number;
  };
}

// Query Interface
export interface IPropertyQuery {
  propertyStatus?: string;
  propertyType?: string;
  minPrice?: string;
  maxPrice?: string;
  city?: string;
  amenities?: string;
  bedRooms?: string;
  bathRooms?: string;
  minSize?: string;
  maxSize?: string;
  page?: string;
  limit?: string;
  map?: {
    longitude: 0;
    latitude: 0;
  };
}
