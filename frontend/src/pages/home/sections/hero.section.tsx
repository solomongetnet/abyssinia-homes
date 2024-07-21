import AdvanceSearchModal from "@/components/shared/filter/advance-search-modal";
import PropertiesLocationInput from "@/components/shared/filter/properties-location-input";
import PropertiesTypeSelector from "@/components/shared/filter/properties-type-selector";
import PropertyStatusSelector from "@/components/shared/filter/property-status-selector";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IFilterObject {
  [key: string]: any;
}

const HeroSection = () => {
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
    <section
      className="relative min-h-[80vh] grid place-content-center"
      id="home-hero"
    >
      <div className="pb-10 flex flex-col gap-8 items-center">
        {/* Text */}
        <div
          className="max-md:pt-28 text-white dark:text-black flex flex-col text-center"
          data-aos="fade-up"
          data-aos-delay={150}
        >
          <h2 className="text-white text-5xl sm:text-6xl text-pretty font-[900]">
            The Simplest way to find your
            <br className="max-sm:hidden" />
            new Home at Ethiopia{" "}
          </h2>
        </div>

        {/* Box */}
        <div
          className="max-md:w-[80vw] lg:w-full h-fit md:h-[65px] py-4 px-4 md:px-8 flex items-center bg-white  rounded-lg"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          <div className="w-full flex md:items-center max-md:flex-col gap-6 ">
            {/* Left */}
            <PropertyStatusSelector setNewValue={setFilterValues} />

            {/* Middle */}
            <div className="flex-1 flex items-center ">
              <div className="w-full flex items-center max-md:flex-col gap-4">
                <PropertiesTypeSelector
                  className="w-full bg-white text-black border-[#e0e0e0]"
                  setNewValue={setFilterValues}
                />
                <PropertiesLocationInput
                  className="w-full md:w-[150px] bg-white text-black border-[#e0e0e0]"
                  containerClassName="w-full"
                  setNewValue={setFilterValues}
                />
              </div>
            </div>

            {/* Right */}
            <div className="flex-1 flex max-md:flex-col items-center gap-2">
              <AdvanceSearchModal triggerClassname="text-black" />
              <Button className="w-full lg:w-[200px]" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
