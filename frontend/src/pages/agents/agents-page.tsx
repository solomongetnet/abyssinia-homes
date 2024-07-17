import PageHeader from "./_components/page-header";
import SearchContainer from "./_components/search-container";
import RecentAgents from "./_components/recent-agents";
import AgentsContainer from "./_components/agents-container";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const AgentsPage = () => {
  const [totalAgentsCount, setTotalAgentsCount] = useState(0);
  const [searchParams] = useSearchParams();
  const searchQueryParam = searchParams.get("search") || false;

  return (
    <div className="">
      <div className="pb-10 pt-[40px] sm:pt-[80px] px-[15px] lg:px-[85px]">
        <PageHeader />

        <main className="pt-16">
          <div className="max-md:flex max-md:flex-col gap-6 md:grid md:grid-cols-[25%,65%] md:gap-20">
            {/* Left Search */}
            <div className="space-y-2">
              <SearchContainer />

              <div className="max-md:hidden">
                <RecentAgents />
              </div>
            </div>

            {/* Right Agents List Container */}
            <div className="w-full space-y-10 ">
              <header className="w-full flex justify-between">
                <p className="text-md">{totalAgentsCount} Available Agents</p>
                {searchQueryParam && (
                  <div className="justify-self-end">
                    <span>Search result for </span>
                    <span className="font-bold">{searchQueryParam}</span>{" "}
                  </div>
                )}
              </header>

              {/* Agents Container */}
              <AgentsContainer setTotalAgentsCount={setTotalAgentsCount} />

              {/* Recent Agents For small screens */}
              <div className="md:hidden">
                <RecentAgents />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentsPage;
