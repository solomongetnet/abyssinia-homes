import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { FC, useState } from "react";
import { MdOutlineSettingsInputComposite } from "react-icons/md";
import PropertiesTypeSelector from "./properties-type-selector";
import PropertyStatusSelector from "./property-status-selector";
import { twMerge } from "tailwind-merge";
import { Input } from "@/components/ui/input";
import PriceRangeSlider from "./_price-range-slider";
import { AmenitiesData } from "@/constants/amenities";
import { useNavigate } from "react-router-dom";
import SizeRangeSlider from "./_size-range-slider";

export interface IPropertyQuery {
  propertyStatus?: string;
  propertyType?: string;
  minPrice?: string;
  maxPrice?: string;
  location?: string;
  amenities?: string;
  bedRooms?: string;
  bathRooms?: string;
  minSize?: string;
  maxSize?: string;
}

interface IFilterObject {
  [key: string]: any;
}

const AdvanceSearchModal: FC<{ triggerClassname?: string }> = ({
  triggerClassname,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<IFilterObject | {}>({
    propertyStatus: "",
    propertyType: "",
    minPrice: null,
    maxPrice: null,
    bedRooms: null,
    minSize: null,
    maxSize: "",
    location: "",
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFilterValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleAmenitiesChange = (amenty: string) => {
    if (selectedAmenities.includes(amenty)) {
      setSelectedAmenities(
        selectedAmenities.filter((a) => {
          return a !== amenty;
        })
      );
    } else {
      setSelectedAmenities([...selectedAmenities, amenty]);
    }
  };

  const handleSearch = () => {
    // removing unwant object key if there is no vlaue
    const filterdValueObject: any = Object.fromEntries(
      Object.entries(filterValues).filter(([_, value]) => {
        return value !== null && value !== "" && value.length !== 0;
      })
    );

    let queryParams;

    if (selectedAmenities.length === 0) {
      queryParams = new URLSearchParams({
        ...filterdValueObject,
      }).toString();
    } else {
      queryParams = new URLSearchParams({
        ...filterdValueObject,
        amenities: selectedAmenities.join(),
      }).toString();
    }
    navigate(`/properties?${queryParams}`);
    setSelectedAmenities([]);
    setFilterValues({});
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div
          className={twMerge(
            `w-full lg:w-[100px] flex gap-1 items-center ${triggerClassname!}`
          )}
        >
          <MdOutlineSettingsInputComposite />
          <span className="">Advance</span>
        </div>
      </DialogTrigger>
      <DialogContent className="px-4 sm:px-6 max-sm:h-[95vh] md:w-[60vw]">
        <div>
          <DialogHeader className="pb-4">
            <DialogTitle>Advance Search</DialogTitle>
            <DialogDescription>
              Power your search to find what do u want 💙
            </DialogDescription>
          </DialogHeader>

          <div className="pt-4 px-2 flex flex-col gap-8 h-[75vh] sm:h-[450px] overflow-y-scroll">
            <div className="flex flex-col gap-6 w-full pb-5">
              <div className="flex flex-col gap-2">
                <DialogTitle className="text-sm">Properties Status</DialogTitle>
                <PropertyStatusSelector
                  setNewValue={setFilterValues}
                  className="w-fit dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <DialogTitle className="text-sm">Properties Type</DialogTitle>
                <PropertiesTypeSelector
                  setNewValue={setFilterValues}
                  className="w-full dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <DialogTitle className="text-sm">
                  Properties Location
                </DialogTitle>
                <Input
                  type="text"
                  placeholder="city, subcitiy, region or country (Addis ababa, 4kilo, amhara...)"
                  onChange={handleInputChange}
                  name="location"
                />
              </div>

              <div className="flex flex-col gap-2">
                <DialogTitle className="text-sm">Properties Size</DialogTitle>
                <SizeRangeSlider setNewValue={setFilterValues} />
              </div>

              <div className="flex flex-col gap-2">
                <DialogTitle className="text-sm">Bedrooms</DialogTitle>
                <Input
                  type="number"
                  placeholder="2"
                  onChange={handleInputChange}
                  name="bedRooms"
                />
              </div>

              <div className="flex flex-col gap-2">
                <DialogTitle className="text-sm">Bathrooms</DialogTitle>
                <Input
                  type="number"
                  placeholder="2"
                  onChange={handleInputChange}
                  name="bathRooms"
                />
              </div>

              <div className="flex flex-col gap-2">
                <DialogTitle className="text-sm">Properties Price</DialogTitle>
                <PriceRangeSlider setNewValue={setFilterValues} />
              </div>

              <div className="flex flex-col gap-2 w-full h-full">
                <DialogTitle className="text-md">
                  Properties Amenties
                </DialogTitle>
                <ul className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 ">
                  {AmenitiesData.map((a, idx) => (
                    <li className="flex sm:items-center gap-1" key={a + idx + Math.random() * 200}>
                      <input
                        checked={selectedAmenities.includes(a)}
                        type="checkbox"
                        className="form-checkbox rounded-full h-4 w-4 transition duration-150 ease-in-out"
                        name={a}
                        value={a}
                        onChange={() => handleAmenitiesChange(a)}
                      />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSearch}>Search</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvanceSearchModal;
