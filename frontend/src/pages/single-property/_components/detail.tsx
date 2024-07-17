import { IProperty } from "@/interface/property.interface";

const Detail = ({ data }: { data: IProperty }) => {
  return (
    <div className="py-10 px-4 sm:px-8 w-full flex flex-col gap-8 h-fit bg-background shadow-md border rounded-xl">
      <h2 className="text-lg font-extrabold">Property Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full md:w-[80%] gap-x-32 gap-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-[600] text-sm sm:text-md">Property Id</h2>
          <span className="text-sm line-clamp-1">{data._id}</span>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-[600] text-sm sm:text-md">Price</h2>
          <span className="text-sm">
            {data.price?.amount} {data.price?.currency}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-[600] text-sm sm:text-md">Property Size</h2>
          <span className="text-sm">{data.size} Sq Ft</span>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-[600] text-sm sm:text-md">Bedrooms</h2>
          <span className="text-sm">{data.bedRooms}</span>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-[600] text-sm sm:text-md">Bathrooms</h2>
          <span className="text-sm">{data.bathRooms}</span>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-[600] text-sm sm:text-md">Year Built</h2>
          <span className="text-sm">{data.builtYear}</span>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-[600] text-sm sm:text-md">Property Status</h2>
          <span className="text-sm capitalize">{data.propertyStatus}</span>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-[600] text-sm sm:text-md">Property Type</h2>
          <span className="text-sm">{data.propertyType}</span>
        </div>
      </div>
    </div>
  );
};

export default Detail;
