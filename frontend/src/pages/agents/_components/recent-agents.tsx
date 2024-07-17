import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loader from "@/components/ui/loader";
import NavigateToAgentBtn from "@/components/shared/buttons/navigate-to-agent-btn";
import { useGetRecentAgentsQuery } from "@/api/services/agents.service";

const SearchContainer = () => {
  const { data, isLoading, isError } = useGetRecentAgentsQuery({ limit: 5 });
  return (
    <div className="md:sticky top-[130px] flex flex-col gap-3 w-full h-fit bg-muted py-6  rounded-lg">
      <header className="md:text-center px-6">
        <h2>Recent Agents</h2>
      </header>

      {isError ? (
        <h2 className="text-center py-10">Sorry some error occured</h2>
      ) : isLoading ? (
        <div className="w-full flex justify-center py-10">
          <Loader />
        </div>
      ) : data && data?.length === 0 ? (
        <h2 className="text-center pt-6">There is no recent agents</h2>
      ) : (
        <div className="w-full pt-4 flex flex-col">
          {data &&
            data.map((agent) => (
              <NavigateToAgentBtn
                key={agent._id}
                fullName={agent.fullName?.split(" ").join("-")}
                username={agent?.username}
              >
                <div
                  key={agent._id}
                  className="px-6 py-2 flex items-center gap-4 rounded hover:bg-background/70 transition cursor-pointer"
                >
                  <Avatar className="size-[50px] sm:size-[60px]">
                    <AvatarImage src={agent.avatar} />
                    <AvatarFallback>{agent.fullName.at(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h2 className="font-[600] text-md cursor-pointer hover:text-primary transition">
                      {agent.fullName}
                    </h2>
                    <p className="font-[100] text-sm">
                      {agent.properties.length} Properties
                    </p>
                  </div>
                </div>
              </NavigateToAgentBtn>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchContainer;
