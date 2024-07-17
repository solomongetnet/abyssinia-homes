import cityOne from "@/assets/images/addis-ababa-img2.jpeg";
import cityTwo from "@/assets/images/addis-ababa-img3.jpg";
import cityThree from "@/assets/images/addis-ababa-img2.jpeg";
import cityFour from "@/assets/images/ethiopia-2.jfif";
import cityFive from "@/assets/images/Ethiopia-img.jpg";
import citySix from "@/assets/images/addis-ababa-img2.jpeg";

interface TPropertiesType {
  address: string;
  properties: string;
  img: string;
}

export const propertiesLocation: TPropertiesType[] = [
  {
    address: "Adiss Ababa, Bole",
    properties: "400",
    img: cityOne,
  },
  {
    address: "Adiss Ababa, CMC",
    properties: "4300",
    img: cityTwo,
  },
  {
    address: "Addis Ababa, Kotebe",
    properties: "400",
    img: cityThree,
  },
  {
    address: "Addis Ababa, Abado",
    properties: "400",
    img: cityFour,
  },
  {
    address: "Adiss Ababa, 4 Kilo",
    properties: "400",
    img: citySix,
  },
  {
    address: "Addis Ababa, Gerji",
    properties: "400",
    img: cityTwo,
  },
  {
    address: "Adiss Ababa, Gurd Shola",
    properties: "400",
    img: citySix,
  },
  {
    address: "Addis Ababa, Semit",
    properties: "400",
    img: cityFive,
  },
];
