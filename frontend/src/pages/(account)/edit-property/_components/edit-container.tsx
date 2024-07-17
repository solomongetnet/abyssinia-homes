import { useGetSinglePropertyQuery } from "@/api/services/property.service";
import Loader from "@/components/ui/loader";
import BasicStep from "./_basic-step";
import AdditionalStep from "./_additional-step";
import LocationStep from "./_location-step-";

const EditContainer = ({ propertyId }: { propertyId: string }) => {
  const { data, isError, isLoading } = useGetSinglePropertyQuery({
    propertyId: propertyId,
  });
  
  if (isLoading) {
    return (
      <div className="pb-[50vh] h-[100vh] w-full flex justify-center items-center ">
        <Loader />
      </div>
    ); // Show loading indicator while fetching data
  }

  if (isError) {
    return (
      <div className="flex-1 w-full mt-32 flex justify-center ">
        <div className="text-lg">Something went wrong please try again</div>
      </div>
    ); // Show error message if fetching data fails
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <BasicStep data={data} propertyId={propertyId} />
      <AdditionalStep data={data} propertyId={propertyId} />
      <LocationStep data={data} propertyId={propertyId} />
    </div>
  );
};

export default EditContainer;
