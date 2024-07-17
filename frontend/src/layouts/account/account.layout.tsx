import Header from "@/components/shared/header/header";
import { Outlet } from "react-router-dom";
import MenuDrawer from "./_components/small-device-menu";
import useAuth from "@/hooks/use-auth";
import AgentSidebar from "./_components/agent-sidebar";
import UserSidebar from "./_components/user-sidebar";
import AdminSidebar from "./_components/admin-sidebar";

const AccountLayout = () => {
  const { role } = useAuth();

  return (
    <div className="overflow-x-hidden">
      <Header className="fixed z-40 shadow-sm border-b-2" />

      {role === "user" && (
        <UserSidebar className="max-lg:hidden z-10 fixed top-0 pt-[130px] left-0 bottom-0 h-screen w-[18%]" />
      )}
      {role === "agent" && (
        <AgentSidebar className="max-lg:hidden z-10 fixed top-0 pt-[130px] left-0 bottom-0 h-screen w-[18%]" />
      )}
      {role === "admin" && (
        <AdminSidebar className="max-lg:hidden z-10 fixed top-0 pt-[130px] left-0 bottom-0 h-screen w-[18%]" />
      )}

      <div className="">
        <div className="ml-0 lg:ml-[18%] pt-[120px] md:pt-[150px] bg-muted">
          <div className="w-full px-[15px] md:px-6">
            <div className="fixed bottom-4 right-4 z-30 lg:hidden w-full flex justify-end">
              <MenuDrawer />
            </div>

            <Outlet />
          </div>
          <footer className="mt-10 bg-background w-full flex justify-center py-2">
            Abisinya Homes 2024
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
