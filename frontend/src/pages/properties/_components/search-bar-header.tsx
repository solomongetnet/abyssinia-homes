import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AdvanceSearchModal from "@/components/shared/filter/advance-search-modal";
import PropertiesLocationInput from "@/components/shared/filter/properties-location-input";
import PropertyStatusSelector from "@/components/shared/filter/property-status-selector";

interface IFilterObject {
  [key: string]: any;
}

const SearchBarHeader = () => {
  const navigate = useNavigate();
  const [filterValues, setFilterValues] = useState<IFilterObject | {}>({
    propertyStatus: "",
    propertyType: "",
    location: "",
  });

  const handleSearch = () => {
    // removing unwant object key if there is no vlaue
    const filterdValueObject: any = Object.fromEntries(
      Object.entries(filterValues).filter(([_, value]) => {
        return value !== null && value !== "" && value.length !== 0;
      })
    );

    const queryParams = new URLSearchParams({
      ...filterdValueObject,
    }).toString();

    navigate(`/properties?${queryParams}`);
    setFilterValues({});
  };

  return (
    <header
      className={`md:sticky max-md:p-[15px] top-[80px] z-40 w-full md:h-[80px]`}
    >
      <div className="shadow-lg bg-accent max-md:rounded-xl">
        <div className="flex items-center justify-center ">
          <div className="flex items-center justify-center max-md:flex-col gap-6 max-md:py-[20px] px-[15px] max-md:w-full md:w-fit h-fit md:h-[65px] ">
            {/* Left */}
            <PropertyStatusSelector
              setNewValue={setFilterValues}
              className="dark:text-white "
            />

            {/* Middle */}
            <div className="max-md:w-full flex-1 flex items-center ">
              <div className="w-full flex items-center max-md:flex-col gap-4">
                <PropertiesLocationInput
                  setNewValue={setFilterValues}
                  containerClassName="w-full "
                  className="max-md:w-full w-[230px]"
                  placeholder="Loaction (city, subcities or ሰፈር)"
                />
              </div>
            </div>

            {/* Right */}
            <div className="w-full flex-1 flex max-md:flex-col items-center gap-2">
              <AdvanceSearchModal />
              <Button className="w-full lg:w-[200px]" onClick={handleSearch}>
                Search
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SearchBarHeader;
