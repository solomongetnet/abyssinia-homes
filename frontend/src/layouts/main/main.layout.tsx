import Footer from "@/components/shared/footer/footer";
import Header from "@/components/shared/header/header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col">
      <Header className={`fixed top-0 left-0 right-0 transition-5`} />
      <div className="min-h-screen pt-[80px]">
        <Outlet />
      </div>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
