import {
  PiBathtubLight,
  PiBedLight,
  PiCalendarThin,
  PiGarageThin,
  PiHouseLight,
} from "react-icons/pi";
import { CiRuler } from "react-icons/ci";
import { IProperty } from "@/interface/property.interface";

const Overview = ({ data }: { data: IProperty }) => {
  return (
    <div className="py-10 px-4 sm:px-8 w-full flex flex-col gap-8 h-fit bg-background shadow-md border rounded-xl">
      <h2 className="text-lg font-extrabold">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex gap-2">
          <div className="p-3 border rounded-md">
            <PiBathtubLight />
          </div>
          <div className="flex flex-col ">
            <h2 className="font-[700] text-sm sm:text-md">Bath</h2>
            <span className="text-muted-foreground font-mono text-sm">
              {data.bathRooms}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="p-3 border rounded-md">
            <PiBedLight className="text-xl" />
          </div>
          <div className="flex flex-col ">
            <h2 className="font-[700] text-sm sm:text-md">Bedrooms</h2>
            <span className="text-muted-foreground font-mono text-sm">
              {data.bedRooms}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="p-3 border rounded-md">
            <PiHouseLight className="text-xl" />
          </div>
          <div className="flex flex-col ">
            <h2 className="font-[700] text-sm sm:text-md">Property Type</h2>
            <span className="text-muted-foreground font-mono text-sm">
              {data.propertyType}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="p-3 border rounded-md">
            <CiRuler className="text-xl" />
          </div>
          <div className="flex flex-col ">
            <h2 className="font-[700] text-sm sm:text-md">Sqft</h2>
            <span className="text-muted-foreground font-mono text-sm">
              {data?.size || '_'}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="p-3 border rounded-md">
            <PiGarageThin className="text-xl" />
          </div>
          <div className="flex flex-col ">
            <h2 className="font-[700] text-sm sm:text-md">Garage</h2>
            <span className="text-muted-foreground font-mono text-sm">{0}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="p-3 border rounded-md">
            <PiCalendarThin className="text-xl" />
          </div>
          <div className="flex flex-col ">
            <h2 className="font-[700] text-sm sm:text-md">Year Built</h2>
            <span className="text-muted-foreground font-mono text-sm">
              {data?.builtYear || "_"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
