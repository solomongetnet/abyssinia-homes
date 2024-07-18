import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Nav from "./_nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CustomNavigate from "@/utils/navigate";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "@/hooks/use-auth";
import LogoutButton from "../buttons/logout-btn";

const SmallDeviceMenu = () => {
  const { isLoggedIn, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex items-center justify-center">
        <Menu />
      </SheetTrigger>

      <SheetContent className="md:hidden">
        <SheetHeader className="mt-6">
          {isLoggedIn ? (
            <div className="w-full flex flex-col gap-4 items-center justify-center">
              <div className="flex flex-col items-center">
                <Avatar className="size-[100px]">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>
                    {user?.fullName && user?.fullName.at(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center text-center">
                  <h2 className="text-lg font-[700] break-words whitespace-normal overflow-hidden">
                    {user?.email}
                  </h2>
                  <p className="text-sm">{user?.role}</p>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <CustomNavigate to="/account/my-profile">
                  <Button className="w-full" variant={"outline"}>
                    Account
                  </Button>
                </CustomNavigate>
                <LogoutButton variant={"destructive"}>Logout</LogoutButton>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-6">
              <div className="w-full ">
                <h2 className="font-bold">Welcome</h2>
              </div>
              <div className="flex-col gap-2">
                <CustomNavigate className="w-full" to="/auth/login">
                  <Button className="w-full">Login</Button>
                </CustomNavigate>
                <CustomNavigate className="w-full" to="/auth/signup">
                  <Button className="w-full" variant={"outline"}>
                    Register
                  </Button>
                </CustomNavigate>
              </div>
            </div>
          )}
        </SheetHeader>

        <div className="w-fit pt-10">
          <Nav className="flex flex-col gap-4" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SmallDeviceMenu;
