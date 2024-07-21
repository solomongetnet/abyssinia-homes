import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { FC } from "react";
import { twMerge } from "tailwind-merge";
import { propertiesTypesList } from "@/constants/properties-types";

interface IProps {
  className?: string;
  setNewValue?: React.Dispatch<React.SetStateAction<any>>;
}

const PropertiesTypeSelector: FC<IProps> = ({ className, setNewValue }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={twMerge(`w-full justify-between ${className}`)}
        >
          {value
            ? propertiesTypesList.find((property) => property.type === value)
                ?.label
            : "Select Properties Type"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={twMerge(`w-[200px] p-0 ${className}`)}>
        <Command>
          <CommandInput placeholder="Search type..." />
          <CommandList>
            <CommandEmpty >No Propeties Type found.</CommandEmpty>
            <CommandGroup>
              {propertiesTypesList.map((itm: any) => (
                <CommandItem
                  key={itm.type}
                  value={itm.type}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setNewValue &&
                      setNewValue((prev: any) => {
                        return {
                          ...prev,
                          propertyType: currentValue,
                        };
                      });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === itm.type ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {itm.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PropertiesTypeSelector;
