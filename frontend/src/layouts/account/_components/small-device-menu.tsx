import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import useAuth from "@/hooks/use-auth";
import AgentSidebar from "./agent-sidebar";
import UserSidebar from "./user-sidebar";

const MenuDrawer = () => {
  const { role } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <Menu />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader></DrawerHeader>
        <div className="h-fit">
          {role === "agent" && <AgentSidebar className="w-full h-fit" />}
          {role === "user" && <UserSidebar className="w-full h-fit" />}
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuDrawer;
