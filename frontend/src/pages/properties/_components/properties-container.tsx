import { useEffect } from "react";
import PropertyCard from "@/components/shared/cards/property-card";
import Loader from "@/components/ui/loader";
import Pagination from "@/components/shared/pagination/pagination";
import { useSearchParams } from "react-router-dom";
import { useGetPropertiesQuery } from "@/api/services/property.service";

const PropertiesContainer = ({
  setTotalProperties,
}: {
  setTotalProperties: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const filters = Object.fromEntries([...searchParams]);
  delete filters.page; // remove page param to prevent duplicate submit to api

  const { data, isLoading, isFetching, isError } = useGetPropertiesQuery({
    page,
    limit: 12,
    filtersQuery: filters,
  });

  useEffect(() => {
    if (data?.totalCount) {
      setTotalProperties(data.totalCount);
    }
  }, [data]);

  const properties = data?.properties;

  const handlePageChange = (newPage: number) => {
    window.scrollTo(0, 0);
    setSearchParams((prev: URLSearchParams) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex-1 w-full mt-32 flex justify-center ">
        <Loader className="h-[30vh]" />
      </div>
    ); // Show loading indicator while fetching properties
  }

  if (isError) {
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
          <h2 className="text-xl font-bold">Oops! No Properties</h2>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...properties].map((property) => (
          <PropertyCard
            key={property._id}
            className="w-full p-2 rounded-lg shadow-md"
            data={property}
          />
        ))}
      </div>
      <Pagination
        totalPages={data.totalPages}
        currentPage={data.currentPage}
        onPageChange={handlePageChange}
      />{" "}
    </div>
  );
};

export default PropertiesContainer;
