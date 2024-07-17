import React, { FC, useState } from "react";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import { Minus, Plus } from "lucide-react";

interface IProps {
  setNewValue: React.Dispatch<React.SetStateAction<any>>;
}

const SizeRangeSlider: FC<IProps> = ({ setNewValue }) => {
  const [value, setValue] = useState([0, 900]);

  const handleSliderChange = (newValue: any) => {
    setValue(newValue);
    setNewValue((prev: any) => {
      return { ...prev, ...{ minSize: newValue[0], maxSize: newValue[1] } };
    });
  };

  const handleMinus = () => {
    if (value[1] <= 0) return;
    setValue([value[0], value[1] - 100]);
  };
  const handlePlus = () => {
    setValue([value[0], value[1] + 100]);
  };
  return (
    <div>
      <Slider
        min={0}
        max={10000}
        value={value}
        onChange={handleSliderChange}
        range
        step={10}
        trackStyle={[{ backgroundColor: "rgb(236,99,37)" }]}
        handleStyle={[
          { borderColor: "rgb(236,99,37)", backgroundColor: "#ffffff" },
          { borderColor: "rgb(236,99,37)", backgroundColor: "#ffffff" },
        ]}
      />
      <div className="flex justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="cursor-pointer" onClick={handleMinus}>
            <Minus />
          </span>
          <span className="font-semibold">
            {value[0].toLocaleString()} <span>SqFt</span>
          </span>
        </div>
        <div className="flex items-center gap-2 ">
          <span className="font-semibold">
            {value[1].toLocaleString()} <span>SqFt</span>
          </span>
          <span className="cursor-pointer" onClick={handlePlus}>
            <Plus />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SizeRangeSlider;
