import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Printer } from "lucide-react";
import { CiLocationOn } from "react-icons/ci";
import SharePopover from "@/components/shared/share-popover";
import Breadcrumb from "@/components/shared/breadcrumb/breadcrumb";
import { IProperty } from "@/interface/property.interface";
import { format } from "date-fns";
import FavoriteBtn from "@/components/shared/buttons/favorite-btn";

const Header = ({ data }: { data: IProperty }) => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <header className="w-full flex max-md:flex-col max-md:gap-4 md:justify-between">
      {/* left */}
      <div className="flex flex-col gap-3">
        <Breadcrumb />

        <h2 className="text-2xl md:text-3xl font-extrabold ">{data?.title}</h2>
        <div className="flex gap-2 max-md:flex-col md:items-center">
          <div className="flex items-center gap-2">
            <CiLocationOn />
            <span className="line-clamp-1 text-sm">
              {data.location?.country}
              {", "}
              {data?.location?.city}
              {", "}
              {data.location?.street}
            </span>
          </div>
          <Separator orientation="vertical" className="max-sm:hidden" />
          <div className="flex gap-2 items-center">
            <h2 className="text-sm font-[900] capitalize">
              {data.propertyStatus}
            </h2>
            <Separator orientation="vertical" />
            <div className="flex items-center gap-1">
              <Clock className="w-[15px]" />
              <span className="text-sm">
                {format(data.createdAt!, "yyyy-MM-dd")}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="flex flex-col md:items-end gap-3">
        <div className="flex items-center gap-1">
          <SharePopover
            url={
              import.meta.env.VITE_PRODUCTION_URL + "/properties/" + data._id
            }
          />

          <FavoriteBtn propertyId={data._id} />

          <Button size={"icon"} variant={"outline"} onClick={handlePrint}>
            <Printer className="w-[20px] text-muted-foreground" />
          </Button>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold">
            {data.price?.amount} {data.price?.currency}{" "}
            {(data.propertyStatus === "for rent" && "/" + data.price?.period) ||
              "month"}
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
