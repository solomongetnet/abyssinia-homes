import darkLogo from "@/assets/images/black-logo.png";
import whiteLogo from "@/assets/images/white-logo.png";
import { useTheme } from "@/providers/theme-providers";
import { twMerge } from "tailwind-merge";

const LogoCard = ({ className }: { className?: string }) => {
  const { theme } = useTheme();
  return (
    <img
      className={twMerge(`${className}`)}
      src={theme === "dark" ? whiteLogo : darkLogo}
      alt="Logo Image"
    />
  );
};

export default LogoCard;
