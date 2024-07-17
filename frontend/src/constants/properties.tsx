import img1 from "@/assets/images/hero-1.jpg";
import img2 from "@/assets/images/hero-2.jpg";
import img3 from "@/assets/images/hero-3.jpg";
import img4 from "@/assets/images/hero-4.jpg";
import img5 from "@/assets/images/hero-5.jpg";
import img6 from "@/assets/images/hero-7.webp";
export interface IProperties {
  _id: number;
  title: string;
  description: string;
  propertyType:
    | "Apartment"
    | "house"
    | "condo"
    | "townhouse"
    | "land"
    | "shop"
    | "office"
    | "warehouse"
    | "villa"
    | "realState";
  propertyStatus: "sale" | "rent";
  location: {
    address: string;
    country?: string;
    state?: string;
    city?: string;
    street?: string;
  };
  zipCode?: number;
  price: number;
  size: number;
  bedrooms?: number;
  bathrooms?: number;
  yearBuilt: number;
  floorNumber?: number;
  agent: string;
  images: string[];
  amenties: string[];
  parking?: boolean;
  heating?: boolean;
  cooling?: boolean;
}

export const properties: IProperties[] = [
  {
    _id: 1,
    title: "Amzing Home At center of ethiopia",
    description: "Properties Description Here",
    propertyType: "Apartment",
    propertyStatus: "sale",
    location: {
      address: "somewhere",
      country: "Ethiopia",
      state: "Adiss Ababa",
      street: "Edna Mole",
      city: "Bole",
    },
    price: 24000000,
    zipCode: 1000,
    size: 600,
    bedrooms: 4,
    bathrooms: 2,
    yearBuilt: 2023,
    floorNumber: 2,
    agent: "solamon",
    images: [img1, img3, img2],
    amenties: [""],
    parking: true,
    heating: true,
    cooling: true,
  },
  {
    _id: 2,
    title: "Amzing Home At center of ethiopia",
    description: "Properties Description Here",
    propertyType: "Apartment",
    propertyStatus: "sale",
    location: {
      address: "somewhere",
      country: "Ethiopia",
      state: "Adiss Ababa",
      street: "tantos tower",
      city: "CMC",
    },
    price: 90220090,
    zipCode: 1000,
    size: 600,
    bedrooms: 4,
    bathrooms: 2,
    yearBuilt: 2023,
    floorNumber: 2,
    agent: "solamon",
    images: [img2],
    amenties: [""],
    parking: true,
    heating: true,
    cooling: true,
  },
  {
    _id: 3,
    title: "Amzing Home At center of ethiopia",
    description: "Properties Description Here",
    propertyType: "Apartment",
    propertyStatus: "sale",
    location: {
      address: "somewhere",
      country: "Ethiopia",
      state: "Adiss Ababa",
      city: "Kotebe",
      street: "02",
    },
    price: 1749200,
    zipCode: 1000,
    size: 600,
    bedrooms: 4,
    bathrooms: 2,
    yearBuilt: 2023,
    floorNumber: 2,
    agent: "solamon",
    images: [img3, img6, img5],
    amenties: [""],
    parking: true,
    heating: true,
    cooling: true,
  },
  {
    _id: 4,
    title: "Amzing Home At center of ethiopia",
    description: "Properties Description Here",
    propertyType: "Apartment",
    propertyStatus: "sale",
    location: {
      address: "somewhere",
      country: "Ethiopia",
      state: "Gonder",
      city: "Adiss Sefer",
      street: "49",
    },
    price: 9084000,
    zipCode: 1000,
    size: 600,
    bedrooms: 4,
    bathrooms: 2,
    yearBuilt: 2023,
    floorNumber: 2,
    agent: "solamon",
    images: [img4, img3, img2],
    amenties: [""],
    parking: true,
    heating: true,
    cooling: true,
  },
  {
    _id: 5,
    title: "Amzing Home At center of ethiopia",
    description: "Properties Description Here",
    propertyType: "Apartment",
    propertyStatus: "sale",
    location: {
      address: "somewhere",
      country: "Ethiopia",
      state: "Tigray",
      city: "Adigrat",
      street: "01 Sefer",
    },
    price: 47000000,
    zipCode: 1000,
    size: 600,
    bedrooms: 4,
    bathrooms: 2,
    yearBuilt: 2023,
    floorNumber: 2,
    agent: "solamon",
    images: [img5, img6, img2],
    amenties: [""],
    parking: true,
    heating: true,
    cooling: true,
  },
  {
    _id: 6,
    title: "Amzing Home At center of ethiopia",
    description: "Properties Description Here",
    propertyType: "Apartment",
    propertyStatus: "sale",
    location: {
      address: "somewhere",
      country: "Ethiopia",
      state: "Adiss Ababa",
      city: "Bole",
      street: "Aday Ababa Stadium",
    },
    price: 94000000,
    zipCode: 1000,
    size: 600,
    bedrooms: 4,
    bathrooms: 2,
    yearBuilt: 2023,
    floorNumber: 2,
    agent: "solamon",
    images: [img6, img1, img3],
    amenties: [""],
    parking: true,
    heating: true,
    cooling: true,
  },
];
