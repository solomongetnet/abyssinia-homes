import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageContainer from "./_components/image-container";
import AgentCard from "./_components/agent-card";
import Header from "./_components/header";
import Overview from "./_components/overview";
import Description from "./_components/description";
import Detail from "./_components/detail";
import Location from "./_components/location";
import Amenities from "./_components/amenities";
import { useGetSinglePropertyQuery } from "@/api/services/property.service";
import Loader from "@/components/ui/loader";
import VideoSection from "./_components/video";

const SinglePropertyPage: any = () => {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  if (!propertyId) return navigate(-1);

  useEffect(() => {
    scrollTo(0, 0);
  }, [propertyId]);

  const { data, isLoading, isFetching, isError } = useGetSinglePropertyQuery({
    propertyId,
  });

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

  if (!data) {
    return (
      <div className="flex-1 w-full mt-32 flex justify-center ">
        <div className="text-lg">Something went wrong please try again</div>
      </div>
    ); // Show error message if fetching properties fails
  }

  return (
    <div className="min-h-screen ">
      {/* Main Container */}
      <div className=" max-sm:pt-[30px] py-[50px] px-[15px] md:px-[120px]">
        {/* Header */}
        <Header data={data} />

        {/* Image Container */}
        <div className="w-full pt-10">
          <ImageContainer images={data.images as string[]} />
        </div>

        <div className="w-full min-h-screen pt-10 max-md:flex max-md:flex-col lg:grid lg:grid-cols-[70%,30%] gap-6">
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Overview */}
            <Overview data={data} />

            {/* Description */}
            <Description description={data.description} />

            {/* Detail */}
            <Detail data={data} />

            {/* Location */}
            <Location location={data.location} />
            {/* Video */}
            {/* <VideoSection videoUrl="https://youtu.be/xgZd_vFNkUs?si=9HCxD4v6PcUWrom8" /> */}
            {data?.videoUrl && (
              <VideoSection videoUrl="https://www.youtube.com/embed/xgZd_vFNkUs?si=fxttAvXgx-_-ueex" />
            )}

            {/* Features & Amenities */}
            {!!data.amenities.length && (
              <Amenities amenities={data.amenities} />
            )}
          </div>

          <div className="flex flex-col gap-2">
            {/*Post Owner Profile  */}
            <AgentCard agent={data?.author} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePropertyPage;
