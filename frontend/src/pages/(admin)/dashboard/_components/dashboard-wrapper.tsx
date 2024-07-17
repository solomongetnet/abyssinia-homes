import { LucideMessageCircle, Users } from "lucide-react";
import { CiCircleList,  } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa6";
import ChartContainer from "./_charts-container";
import DashboardLoader from "./_dashboard-loader";
import { useFetchAdminDashboardQuery } from "@/api/services/admin.service";

const DashboardWrapper = () => {
  const { data, isLoading, isError } = useFetchAdminDashboardQuery();

  if (isLoading) {
    return <DashboardLoader />;
  }
  if (isError) {
    return <div>Some Error Occured</div>;
  }

  return (
    <main className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          data-aos="fade-up"
          data-aos-delay={200}
          className="h-[150px] w-full flex gap-4 items-center cursor-pointer rounded-lg bg-background px-6 group hover:bg-primary transition"
        >
          <div className="size-[70px] grid place-content-center rounded-full bg-primary/10 group-hover:bg-muted transition">
            <CiCircleList className="text-4xl text-primary" />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-[700] text-xl group-hover:text-white transition">
              Total Properties
            </h2>
            <p className="font-[300] group-hover:text-white transition">
              {data?.propertiesCount}
            </p>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay={300}
          className="h-[150px] w-full flex gap-4 items-center cursor-pointer rounded-lg bg-background px-6 group hover:bg-primary transition"
        >
          <div className="size-[70px] grid place-content-center rounded-full bg-primary/10 group-hover:bg-muted transition">
            <Users className="text-4xl text-primary" />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-[700] text-xl group-hover:text-white transition">
              Total Users
            </h2>
            <p className="font-[300] group-hover:text-white transition">
              {data?.usersCount}
            </p>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay={400}
          className="h-[150px] w-full flex gap-4 items-center cursor-pointer rounded-lg bg-background px-6 group hover:bg-primary transition"
        >
          <div className="size-[70px] grid place-content-center rounded-full bg-primary/10 group-hover:bg-muted transition">
            <FaRegHeart className="text-4xl text-primary" />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-[700] text-xl group-hover:text-white transition">
              Total Admins
            </h2>
            <p className="font-[300] group-hover:text-white transition">
              {data?.adminsCount}
            </p>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay={500}
          className="h-[150px] w-full flex gap-4 items-center cursor-pointer rounded-lg bg-background px-6 group hover:bg-primary transition"
        >
          <div className="size-[70px] grid place-content-center rounded-full bg-primary/10 group-hover:bg-muted transition">
            <LucideMessageCircle className="text-4xl text-primary" />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-[700] text-xl group-hover:text-white transition">
              Total Agents
            </h2>
            <p className="font-[300] group-hover:text-white transition">
              {data?.agentsCount}
            </p>
          </div>
        </div>
      </div>

      <ChartContainer />
    </main>
  );
};

export default DashboardWrapper;
