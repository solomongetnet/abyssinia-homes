import { useParams } from "react-router-dom";
import Loader from "@/components/ui/loader";
import MainContatiner from "./_components/main-container";
import PageHeader from "./_components/_page-header";
import { useGetSingleAgentQuery } from "@/api/services/agents.service";

const SingleAgentPage = () => {
  const { agentUsername } = useParams();
  const { data, isLoading, isError } = useGetSingleAgentQuery(agentUsername);

  if (isLoading) {
    return (
      <div className="flex-1 w-full mt-32 flex justify-center ">
        <Loader className="h-[30vh]" />
      </div>
    ); // Show loading indicator while fetching agents
  }

  if (isError) {
    return (
      <div className="flex-1 w-full mt-32 flex justify-center ">
        <div className="text-lg">Something went wrong please try again</div>
      </div>
    ); // Show error message if fetching agents fails
  }

  if (!data) {
    return (
      <div className="w-full my-44 flex justify-center ">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-xl font-bold">We can't found this agent</h2>
          <p className="text-sm font-light text-pretty leading-tight">
            We Searched high and low but couldn't find what you're <br />{" "}
            looking for, Let's find better place for your go to
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="pb-10 pt-[40px] sm:pt-[80px] px-[15px] lg:px-[85px]">
        <PageHeader />

        <MainContatiner />
      </div>
    </div>
  );
};

export default SingleAgentPage;
