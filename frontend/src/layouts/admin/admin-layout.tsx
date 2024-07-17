import { Outlet } from "react-router-dom";
// import useAuth from "@/hooks/use-auth";
import Sidebar from "./_components/sidebar";

const AdminLayout = () => {
  return (
    <div className="overflow-x-hidden">
      <Sidebar className="max-lg:hidden z-10 fixed top-0 pt-[30px] md:pt-[50px] left-0 bottom-0 h-screen w-[18%]" />

      <div className="">
        <div className="ml-0 lg:ml-[18%] pt-[30px] md:pt-[50px] bg-muted">
          <div className="w-full px-[15px] md:px-6">
            <div className="fixed bottom-4 right-4 z-30 lg:hidden w-full flex justify-end">
              {/* <MenuDrawer /> */}
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

export default AdminLayout;
