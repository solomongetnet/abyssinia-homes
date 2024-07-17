import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { agents } from "@/constants/agents";

const AgentSection = () => {
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
                  key={a.name + idx}
                >
                  <div className="w-full flex flex-col items-center gap-2">
                    <Avatar className="size-[90px] sm:size-[120px] border ring-offset-2">
                      <AvatarImage src={a.img} />
                      <AvatarFallback>{a.name[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col items-center text-center">
                      <h2 className="text-md font-[700]">{a.name}</h2>
                      <h2 className="text-xs font-[300]">
                        {a.properties} Properties
                      </h2>
                    </div>

                    <div className="px-3 w-full flex justify-between items-center">
                      <Button variant={"link"} className="w-full">
                        See Detail
                      </Button>
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
