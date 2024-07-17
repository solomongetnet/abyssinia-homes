import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { twMerge } from "tailwind-merge";
import { FC } from "react";

interface IProps {
  className?: string;
  setNewValue?: React.Dispatch<React.SetStateAction<any>>;
}

const PropertyStatusSelector: FC<IProps> = ({ className, setNewValue }) => {
  const onStatusChange = (value: string) => {
    if (value && setNewValue) {
      setNewValue((prev: any) => {
        return { ...prev, propertyStatus: value };
      });
    }
  };

  return (
    <div className={twMerge(` text-black  ${className}`)}>
      <div className="flex justify-center items-center gap-6">
        <div className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            name="property-status-radio"
            id="for-sale"
            value={"for sale"}
            onChange={(e) => onStatusChange(e.target.value)}
          />
          <Label htmlFor="for-sale" className="cursor-pointer">
            For Sale
          </Label>
        </div>
        <Separator orientation="vertical" />
        <div className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            name="property-status-radio"
            id="for-rent"
            value={"for rent"}
            onChange={(e) => onStatusChange(e.target.value)}
          />
          <Label htmlFor="for-rent" className="cursor-pointer">
            For Rent
          </Label>
        </div>
      </div>
    </div>
  );
};

export default PropertyStatusSelector;
