import { FC } from "react";
import { twMerge } from "tailwind-merge";
import Nav from "./_nav";
import ProtectedActions from "./_protected-actions";
import PublicActions from "./_public-actions";
import CustomNavigate from "@/utils/navigate";
import SmallDeviceMenu from "./_small-device-menu";
import { ModeToggle } from "../mode-toggle";
import useAuth from "@/hooks/use-auth";
import LogoCard from "../logo";

interface HeaderProps {
  className?: string;
}

const Header: FC<HeaderProps> = ({ className }) => {
  const { isLoggedIn } = useAuth();

  return (
    <header
      className={twMerge(
        `bg-muted px-[25px] lg:px-[80px] w-full h-[80px] flex justify-between items-center z-40  ${className}`
      )}
    >
      <CustomNavigate to="/">
        <LogoCard className="w-[60px] sm:w-[75px]" />
      </CustomNavigate>

      {/* Nav Links */}
      <Nav className="max-lg:hidden flex items-center gap-10" />

      {/* Right Content */}
      <div className="flex items-center gap-4">
        <div>
          <ModeToggle />
        </div>
        {isLoggedIn ? <ProtectedActions /> : <PublicActions />}
        <div className="lg:hidden">
          <SmallDeviceMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
