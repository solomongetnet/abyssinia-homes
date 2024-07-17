import { IPropertyLocation } from "@/interface/property.interface";
import { FC } from "react";

interface IProps {
  location: IPropertyLocation;
}

const Location: FC<IProps> = ({ location }) => {
  return (
    <div className="py-10 px-4 sm:px-8 w-full flex flex-col gap-8 h-fit bg-background shadow-md border rounded-xl">
      <h2 className="text-lg font-extrabold">Location</h2>
      <div className="w-full flex flex-col gap-6">
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-sm sm:text-md text-[800]">City</h2>
            <span>{location?.city || "_"}</span>
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-sm sm:text-md text-[800]">Address</h2>
            <span>{location.address || "_"}</span>
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-sm sm:text-md text-[800]">Country</h2>
            <span>{location.country || "_"}</span>
          </div>

          <div className="flex items-center gap-3">
            <h2 className="text-sm sm:text-md text-[800]">Street</h2>
            <span>{location.street || "_"}</span>
          </div>
        </div>
        <div className="w-full h-[300px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15761.424821467193!2d38.82143284513998!3d9.031234106481438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b900f68a5e9d7%3A0x5abf2170fe2bd3f4!2zS290ZWJlLCDhiqDhi7LhiLUg4Yqg4Ymg4Ymj!5e0!3m2!1sam!2set!4v1718056450409!5m2!1sam!2set"
            loading="lazy"
            className="border-0 size-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Location;
