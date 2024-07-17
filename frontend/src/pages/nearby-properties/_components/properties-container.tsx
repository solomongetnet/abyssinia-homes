import { useEffect, useState } from "react";
import PropertyCard from "@/components/shared/cards/property-card";
import Loader from "@/components/ui/loader";
import { useGetNearbyPropertiesQuery } from "@/api/services/property.service";
import { getCurrentLocation } from "@/utils/get-current-location";

const PropertiesContainer = ({
  setTotalProperties,
}: {
  setTotalProperties: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [error, setError] = useState(false);

  const { data, isLoading, isFetching, isError } = useGetNearbyPropertiesQuery({
    latitude: latitude,
    longitude: longitude,
    maxDistance: 30000,
  });

  getCurrentLocation()
    .then(({ latitude: _latitude, longitude: _longitude }) => {
      setLatitude(_latitude);
      setLongitude(_longitude);
    })
    .catch(() => {
      setError(true);
    });

  useEffect(() => {
    if (data) {
      setTotalProperties(data.length);
    }
  }, [data]);

  const properties = data;

  if (isLoading || isFetching) {
    return (
      <div className="flex-1 w-full mt-32 flex justify-center ">
        <Loader className="h-[30vh]" />
      </div>
    ); // Show loading indicator while fetching properties
  }

  if (isError || error) {
    return (
      <div className="flex-1 w-full mt-32 flex justify-center ">
        <div className="text-lg">Something went wrong please try again</div>
      </div>
    ); // Show error message if fetching properties fails
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="w-full my-44 flex justify-center ">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-xl font-bold">
            Oops! There is no near property around your place
          </h2>
          <p className="text-sm font-light text-pretty leading-tight">
            We Searched high and low but couldn't find what you're <br />{" "}
            looking for, Let's find better place for your go to
          </p>
        </div>
      </div>
    ); // Show error message if fetching properties fails
  }

  return (
    <div className="pt-10 flex flex-col gap-10">
      <div className="min-h-[90vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {[...properties].map((property) => (
          <PropertyCard
            key={property._id}
            className="w-full h-fit p-2 rounded-lg shadow-md"
            data={property}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertiesContainer;
