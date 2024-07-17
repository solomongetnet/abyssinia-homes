import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const CustomNavigate = ({
  children,
  to,
  className,
}: {
  children: ReactNode;
  to: any;
  className?: string;
}) => {
  const navigate = useNavigate();

  const handleNavigate: () => void = () => {
    navigate(to);
  };
  return (
    <div
      className={twMerge(`cursor-pointer ${className}`)}
      onClick={handleNavigate}
    >
      {children}
    </div>
  );
};

export default CustomNavigate;
