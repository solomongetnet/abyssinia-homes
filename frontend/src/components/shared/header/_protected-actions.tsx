import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NavLink, useLocation } from "react-router-dom";
import useAuth from "@/hooks/use-auth";
import LogoutButton from "../buttons/logout-btn";
import { useEffect, useState } from "react";

type Tlinks = {
  href: string;
  label: string;
};

const links: Tlinks[] = [
  {
    href: "/account/my-profile",
    label: "Account",
  },
];

const Profile = () => {
  const { user, isLoading } = useAuth();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  if (isLoading && !user) {
    return <div>Loading...</div>;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <div className="md:w-[150px] overflow-hidden md:mr-4 flex items-center gap-2 cursor-pointer bg">
          <Avatar>
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="uppercase">
              {user?.fullName?.at(0)}
            </AvatarFallback>
          </Avatar>

          <div className="max-md:hidden flex flex-col items-start text-start">
            <h2 className="text-sm font-[700] line-clamp-1">
              {user?.fullName && user?.fullName?.length > 10
                ? user?.fullName?.slice(0, 10) + "..."
                : user?.fullName}
            </h2>
            <p className="text-xs">{user?.role}</p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] space-y-3 px-0">
        <div className="flex flex-col justify-center items-center gap-2 cursor-pointer ">
          <Avatar className="size-[70px]">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="uppercase">
              {user?.fullName?.at(0)}
            </AvatarFallback>{" "}
          </Avatar>

          <div className="max-w-[100%] flex flex-col text-center px-2">
            <h2 className="text-sm font-[700] break-words whitespace-normal overflow-hidden">
              {user?.email}
            </h2>
            <p className="text-xs">{user?.role}</p>
          </div>
        </div>
        <div className="relative flex flex-col gap-1 px-2">
          {links.map(({ label, href }, idx) => (
            <NavLink
              key={label + idx}
              to={href}
              className={`relative py-2 flex items-center justify-center gap-2  text-center w-full border p rounded-md cursor-pointer`}
            >
              <span className="text-sm">{label}</span>
            </NavLink>
          ))}
        </div>
        <div className="w-full px-2">
          <LogoutButton className="w-full" variant={"destructive"}>
            Logout
          </LogoutButton>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
