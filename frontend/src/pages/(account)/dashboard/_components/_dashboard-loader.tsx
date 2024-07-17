import Loader from "@/components/ui/loader";

const DashboardLoader = () => {
  return (
    <div className="flex-1 w-full mt-32 flex justify-center ">
      <Loader className="h-[30vh]" />
    </div>
  );
};

export default DashboardLoader;
