import { twMerge } from "tailwind-merge";
const Loader = ({
  className,
  largeCircleClassName,
  smallCircleClassName,
}: {
  className?: string;
  smallCircleClassName?: string;
  largeCircleClassName?: string;
}) => {
  return (
    <div
      className={twMerge(
        `main-loader relative flex items-center justify-center ${className}`
      )}
    >
      <div
        className={twMerge(
          `loader-circle-one absolute size-[70px] bg-primary/20 rounded-full ${largeCircleClassName}`
        )}
      />
      <div
        className={twMerge(
          `loader-circle-two absolute size-[45px] bg-primary/40 rounded-full ${smallCircleClassName}`
        )}
      />
    </div>
  );
};

export default Loader;
