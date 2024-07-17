import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  error: any;
  className?: string;
}

const ErrorMessage: FC<IProps> = ({ error, className }) => {
  if (!error) return;
  return (
    <span className={twMerge(`text-red-500 text-sm ${className}`)}>
      {error}
    </span>
  );
};

export default ErrorMessage;
