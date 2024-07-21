import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CiGrid42 } from "react-icons/ci";
import { LuListOrdered } from "react-icons/lu";
import SearchBarHeader from "./_components/search-bar-header";
import PropertiesContainer from "./_components/properties-container";
import Breadcrumb from "../../components/shared/breadcrumb/breadcrumb";

const PropertiesPage = () => {
  const [totalProperties, setTotalProperties] = useState(0);
  return (
    <div className="min-h-screen">
      <SearchBarHeader />
      <main className="py-[50px] w-full px-[15px] lg:px-[80px] xl:px-[150px]">
        <header className="w-full space-y-2">
          <div>
            <Breadcrumb />
          </div>

          <div className="w-full flex items-center justify-between">
            {/* Left title and desc */}
            <div>
              <div className="flex items-end gap-2">
                <h2 className="font-semibold text-3xl">All Properties</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Find amazing property here, a collection of top and quality
                properties.
              </p>
              <span className="md:hidden text-xs text-foreground">
                {!!totalProperties && `${totalProperties} Properties Found`}
              </span>{" "}
            </div>

            {/* Right Sort */}
            <div className="max-md:hidden h-full flex flex-col gap-2 items-end">
              <div className="flex items-center gap-2 ">
                <Button size={"icon"} variant={"outline"}>
                  <CiGrid42 className="text-xl" />
                </Button>

                <Button size={"icon"} variant={"outline"}>
                  <LuListOrdered className="text-xl" />
                </Button>

                <Button className="ml-2" variant={"outline"}>
                  Default Sort
                </Button>
              </div>
              <span className="text-xs text-foreground">
                {!!totalProperties && `${totalProperties} Properties Found`}
              </span>{" "}
            </div>
          </div>
        </header>

        {/* Render all properties here with pagination */}
        <PropertiesContainer setTotalProperties={setTotalProperties} />
      </main>
    </div>
  );
};

export default PropertiesPage;
