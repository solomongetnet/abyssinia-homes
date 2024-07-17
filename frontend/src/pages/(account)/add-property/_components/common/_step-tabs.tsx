import { Separator } from "@/components/ui/separator";
import { FC, Dispatch, SetStateAction } from "react";

interface IProps {
  currentStep: number;
  setCurrentStep?: Dispatch<SetStateAction<number>>;
}

interface ISteps {
  label: string;
  stepNumber: number;
}

const steps: ISteps[] = [
  {
    label: "Basic",
    stepNumber: 1,
  },
  {
    label: "Location",
    stepNumber: 2,
  },
  {
    label: "Additional",
    stepNumber: 3,
  },
  {
    label: "Media",
    stepNumber: 4,
  },
];

const StepTabs: FC<IProps> = ({ currentStep }) => {
  return (
    <header className="w-full outline-none cursor-pointer">
      <div className="lg:w-[80%] pb-2 h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map(({ label, stepNumber }) => (
          <div
            key={stepNumber}
            className={`h-[40px] w-full grid place-content-center grid-flow-col gap-2 text-sm rounded-md cursor-pointer ${
              stepNumber === currentStep && "bg-primary text-white"
            }`}
          >
            <span>{stepNumber}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <Separator />
    </header>
  );
};

export default StepTabs;
