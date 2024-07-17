import { FaHouse } from "react-icons/fa6";
import { MdOutlineHolidayVillage } from "react-icons/md";
import { PiBuildingApartment } from "react-icons/pi";

interface TPropertiesType {
  type: string;
  properties: string;
  icon: JSX.Element;
}

export const propertiesTypes: TPropertiesType[] = [
  {
    type: "House",
    properties: "400",
    icon: <FaHouse />,
  },
  {
    type: "Apartment",
    properties: "4300",
    icon: <PiBuildingApartment />,
  },
  {
    type: "Townhouse",
    properties: "400",
    icon: <PiBuildingApartment />,
  },
  {
    type: "Villa",
    properties: "400",
    icon: <MdOutlineHolidayVillage />,
  },
  {
    type: "Offices",
    properties: "400",
    icon: <PiBuildingApartment />,
  },
  {
    type: "Shop",
    properties: "400",
    icon: <PiBuildingApartment />,
  },
]?.sort((a: any, b: any) => a.type.localeCompare(b.type));

export const propertiesTypesList = [
  {
    type: "house",
    label: "Private House",
  },
  {
    type: "villa",
    label: "Villa",
  },
  {
    type: "townhouse",
    label: "Townhouse",
  },
  {
    type: "office",
    label: "office",
  },
  {
    type: "shop",
    label: "Shop",
  },
  {
    type: "apartment",
    label: "Apartment",
  },
].sort((a: any, b: any) => a.type.localeCompare(b.type));
