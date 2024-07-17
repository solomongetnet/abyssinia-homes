import { FC } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
interface IProps {
  amenities: string[];
}
const Amenities: FC<IProps> = ({ amenities }) => {
  return (
    <div className="py-10 px-4 sm:px-8 w-full flex flex-col gap-8 h-fit bg-background shadow-md border  rounded-xl">
      <h2 className="text-lg font-extrabold">Features & Amenities</h2>
      <div className="grid  grid-cols-2 md:grid-cols-3 gap-y-4">
        {amenities.map((amenty, idx) => (
          <div
            key={amenty + idx.toString()}
            className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition"
          >
            <IoIosCheckmarkCircle className="text-lg text-primary" />
            <h2 className="text-sm">{amenty}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
