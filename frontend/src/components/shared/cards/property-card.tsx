import { IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { CiLocationOn, CiRuler } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { FC, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { IProperty } from "@/interface/property.interface";
import FavoriteBtn from "../buttons/favorite-btn";
import CustomNavigate from "@/utils/navigate";

interface ICardProps {
  data: IProperty;
  className?: string;
  orientation?: "vertical" | "horizontal";
}
const PropertyCard: FC<ICardProps> = ({
  data,
  className,
  orientation = "vertical",
  ...props
}) => {
  const [isHorizontal, setIsHorizontal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (orientation === "horizontal") {
      setIsHorizontal(true);
    } else {
      setIsHorizontal(false);
    }
  }, [orientation]);

  const handleViewClick: () => void = () => {
    navigate(`/properties/${data._id}`);
  };

  return (
    <div
      {...props}
      className={twMerge(
        `flex w-full shadow  ${!isHorizontal ? "flex-col h-full" : "h-[220px] "}
          ${className}`
      )}
    >
      <div
        className={`relative overflow-hidden rounded-xl cursor-pointer group group-hover:rounded-tl-3xl group-hover:rounded-br-3xl ${
          isHorizontal ? "w-[35%] h-full" : "w-full h-[250px]"
        }`}
      >
        {!isHorizontal && (
          <div className="px-2 py-2 w-full flex justify-between items-center">
            <div className="z-20 flex gap-1 items-center">
              <div className=" capitalize shadow-xl bg-black/50 text-primary backdrop-blur-2xl text-sm font-bold px-2 py-1 rounded-sm">
                {data.propertyStatus}
              </div>
              <div className="shadow-xl bg-black/50 text-primary backdrop-blur-2xl text-sm font-bold px-2 py-1 rounded-sm">
                {data.propertyType}
              </div>
            </div>

            <FavoriteBtn propertyId={data._id} />
          </div>
        )}

        {/* Display Distance by condition */}
        {data.distance && (
          <div className="z-20 absolute bottom-0 px-2 py-2 text-white text-sm font-extrabold bg-primary rounded-tr-xl">
            Around {data.distance.toLocaleString()} m
          </div>
        )}

        <CustomNavigate to={"/properties/" + data._id}>
          <img
            src={data.images[0]!}
            className="absolute inset-0 size-full object-cover group-hover:scale-125 transition-4"
            alt="Property Image"
            loading="lazy"
          />
        </CustomNavigate>
      </div>

      {/* /Bottom  */}
      <div
        className={`px-4 flex flex-col ${
          isHorizontal ? "flex-1 pt-2 justify-between" : "pt-6 "
        }`}
      >
        <div className="flex flex-col">
          <h2 className="text-lg font-[700] line-clamp-1">{data.title}</h2>
          <div className=" flex items-center gap-2">
            <CiLocationOn />
            <span className="line-clamp-1 text-sm">
              {data.location?.country}
              {", "}
              {data.location?.city}
              {", "}
              {data.location?.street}
            </span>
          </div>
        </div>

        {isHorizontal && (
          <div className="flex gap-2">
            <div className="capitalize text-xs shadow bg-primary/10 text-primary backdrop-blur-2xl font-bold px-2 py-1 rounded-sm">
              {data.propertyStatus}
            </div>
            <div className="shadow-xl bg-primary/10 text-primary backdrop-blur-2xl text-xs font-bold px-2 py-1 rounded-sm">
              {data.propertyType}
            </div>
          </div>
        )}

        <div className="pt-4 grid grid-cols-3 gap-2 w-full">
          <div className="flex items-center justify-center gap-1 py-1 bg-primary/10 rounded-sm ">
            <IoBedOutline />
            <span>Beds</span>
            <span>{data.bedRooms}</span>
          </div>

          <div className="flex items-center justify-center gap-1 py-1 bg-primary/10 rounded-sm ">
            <LuBath />
            <span>Bath</span>
            <span>{data.bathRooms}</span>
          </div>

          <div className="flex items-center justify-center gap-1 py-1 bg-primary/10 rounded-sm ">
            <CiRuler />
            <span>Sqft</span>
            <span>{data.size}</span>
          </div>
        </div>

        {/* Action and price */}
        <div className="py-4 flex justify-between items-center">
          <div className="flex items-end">
            <h2 className="font-[700]">
              {data.price?.amount} {data.price?.currency}
            </h2>
            {data.propertyStatus === "for rent" && (
              <span className="text-muted-foreground text-sm">
                /{data.price?.period || "month"}
              </span>
            )}
          </div>
          <Button variant={"outline"} onClick={handleViewClick}>
            View Detail
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
