import { FC, Dispatch, SetStateAction, useEffect } from "react";
import AgentCard from "./agent-card";
import Loader from "@/components/ui/loader";
import { useSearchParams } from "react-router-dom";
import { useGetAgentsQuery } from "@/api/services/agents.service";

interface IProps {
  setTotalAgentsCount: Dispatch<SetStateAction<number>>;
}

const AgentsContainer: FC<IProps> = ({ setTotalAgentsCount }) => {
  const [searchParams] = useSearchParams();
  const searchQueryParam = searchParams.get("search") || "";
  const { data, isLoading, isError, isFetching } = useGetAgentsQuery({
    limit: 10,
    page: 1,
    sort: -1,
    search: searchQueryParam,
  });

  useEffect(() => {
    if (data?.totalCount) {
      setTotalAgentsCount(data.totalCount);
    }
  }, [data]);

  if (isLoading || isFetching) {
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

  if (!data?.agents || data?.agents.length === 0) {
    return (
      <div className="w-full py-24 flex justify-center ">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-xl font-bold">Oops! No Agents</h2>
          <p className="text-sm font-light text-pretty leading-tight">
            We Searched high and low but couldn't find what you're <br />{" "}
            looking for, Let's find better place for your go to
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-10 flex flex-col gap-6">
      {data.agents.map((agent) => (
        <AgentCard key={agent._id} agent={agent} />
      ))}
    </div>
  );
};

export default AgentsContainer;
