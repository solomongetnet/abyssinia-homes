import { FC } from "react";

const Description: FC<{ description?: string }> = ({ description }) => {
  return (
    <div className="py-10 px-4 sm:px-8 w-full flex flex-col gap-8 h-fit bg-background shadow-md border rounded-xl">
      <h2 className="text-lg font-extrabold">Property Description</h2>
      <p className="text-[400] text-sm">{description}</p>
    </div>
  );
};

export default Description;
