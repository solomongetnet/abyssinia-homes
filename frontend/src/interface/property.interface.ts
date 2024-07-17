// Define interface for Property schema
export interface IProperty {
  _id?: string;
  author: string;
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
  videoUrl?: string;
  amenities: string[];
  location: {
    address?: string;
    country?: string;
    city?: string;
    street?: string;
    zipCode?: number;
    map: {
      longitude: 0;
      latitude: 0;
    };
  };
  distance?: any;
  createdAt?: number;
  updatedAt?: number;
}

export interface IPropertyLocation {
  coordinates?: number[];
  address?: string;
  country?: string;
  city?: string;
  street?: string;
  zipCode?: number;
}
