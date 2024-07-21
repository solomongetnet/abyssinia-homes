import { useGetFeatureAgentsQuery } from "@/api/services/agents.service";
import NavigateToAgentBtn from "@/components/shared/buttons/navigate-to-agent-btn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";

const AgentSection = () => {
  const {
    data: agents,
    isLoading,
    isError,
  } = useGetFeatureAgentsQuery({ limit: 10 });

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

  if (!agents || agents.length === 0) {
    return (
      <div className="w-full my-44 flex justify-center ">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-xl font-bold">Oops! No Properties</h2>
          <p className="text-sm font-light text-pretty leading-tight">
            We Searched high and low but couldn't find what you're <br />{" "}
            looking for, Let's find better place for your go to
          </p>
        </div>
      </div>
    ); // Show error message if fetching agents fails
  }

  return (
    <section className="min-h-[50dvh] bg-accent dark:bg-black rounded-t-3xl">
      <div className="">
        <div className="flex flex-col gap-20 py-[60px] px-[20px] sm:px-[100px]">
          <header className="w-full flex flex-col items-center text-center">
            <h2 className="font-semibold text-3xl">Explore Featured Agents</h2>
            <p className="sm:w-[70%] text-center text-sm text-muted-foreground">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
            </p>
          </header>

          <main className="w-full">
            <div className="grid gap-6 sm:gap-10 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
              {agents.map((a, idx) => (
                <div
                  className="w-full p-3 pt-6 rounded-lg shadow-sm border bg-background hover:bg-primary/5 transition"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-delay="50"
                  data-aos-duration="1000"
                  key={a._id + idx}
                >
                  <div className="w-full flex flex-col items-center gap-2">
                    <Avatar className="size-[90px] sm:size-[120px] border ring-offset-2">
                      <AvatarImage src={a?.avatar} loading="lazy" />
                      <AvatarFallback>{a?.fullName[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col items-center text-center">
                      <h2 className="text-md font-[700]">{a.name}</h2>
                      <h2 className="text-xs font-[300]">
                        {a?.properties.length} Properties
                      </h2>
                    </div>

                    <div className="px-3 w-full flex justify-center items-center">
                      <NavigateToAgentBtn
                        fullName={a.fullName?.split(" ").join("-")}
                        username={a?.username}
                      >
                        <Button variant={"link"} className="w-full">
                          See Detail
                        </Button>
                      </NavigateToAgentBtn>{" "}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>{" "}
    </section>
  );
};

export default AgentSection;
