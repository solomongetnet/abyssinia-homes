import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Input } from "@/components/ui/input";

interface IProps {
  className?: string;
  setNewValue?: React.Dispatch<React.SetStateAction<any>>;
  placeholder?: string;
  containerClassName?: string;
}

const LocationInput: FC<IProps> = ({
  className,
  setNewValue,
  placeholder = "City, region or search any loaction here",
  containerClassName,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue &&
      setNewValue((prev: any) => {
        return { ...prev, location: e.target.value.split(" ").join() };
      });
  };

  return (
    <div className={twMerge(`h-full w-fit ${containerClassName}`)}>
      <Input
        className={twMerge(`w-[150px ${className}`)}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default LocationInput;
