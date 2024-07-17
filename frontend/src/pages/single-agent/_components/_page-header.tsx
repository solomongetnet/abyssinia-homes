import { useLocation } from "react-router-dom";
import Breadcrumb from "@/components/shared/breadcrumb/breadcrumb";

const PageHeader = () => {
  const location = useLocation();
  const fullName = location.search.split("=")[1].split("-").join(" "); // extracting fullName from query
  return (
    <header className="w-full flex ">
      <div className="flex flex-col gap-2 ">
        <div className="">
          <h2 className="font-semibold text-3xl">
            {fullName || "Agent profile"}
          </h2>
        </div>
        <Breadcrumb />
      </div>
    </header>
  );
};

export default PageHeader;
