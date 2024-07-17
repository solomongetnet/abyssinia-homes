import { useParams } from "react-router-dom";
import { useGetSingleAgentQuery } from "@/api/services/agents.service";
import Loader from "@/components/ui/loader";
import PropertiesContainer from "./_properties-container";
import { DetailCard } from "./_detail-card";
import AboutCard from "./_about-card";
import ContactCard from "./_contact-card";
import SocialCard from "./_social-card";

const MainContatiner = () => {
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
  console.log(data);

  return (
    <main className="pt-16 w-full">
      <div className="min-h-screen w-full grid grid-flow-row md:grid-cols-[68%,28%] gap-5">
        <div className="w-full flex flex-col gap-8">
          {/* First Container or profile container avatar, profile detail */}
          <DetailCard data={data} />

          {/* About */}
          {data.description && <AboutCard description={data.description} />}

          {/* Agent Properties */}
          <div className="space-y-4">
            <header>
              <h2 className="font-bold text-xl">Properties</h2>
            </header>

            <PropertiesContainer properties={data.properties || []} />
          </div>
        </div>

        {/* Right contaier */}
        <div className=" max-md:mt-10 w-full space-y-4">
          <div className="md:sticky md:top-[100px]">
            <ContactCard />
            {!!data.socialMedia && (
              <SocialCard socialMedia={data.socialMedia} />
            )}
          </div>{" "}
        </div>
      </div>
    </main>
  );
};

export default MainContatiner;
