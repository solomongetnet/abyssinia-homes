import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  to: any;
  className?: string;
}

const CustomNavigate = ({ children, to, className, ...props }: IProps) => {
  const navigate = useNavigate();

  const handleNavigate: () => void = () => {
    navigate(to);
  };
  return (
    <div
      {...props}
      className={twMerge(`cursor-pointer ${className}`)}
      onClick={handleNavigate}
    >
      {children}
    </div>
  );
};

export default CustomNavigate;
