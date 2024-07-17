import { useState } from "react";
import Breadcrumb from "../../components/shared/breadcrumb/breadcrumb";
import PropertiesContainer from "./_components/properties-container";
import { getCurrentLocation } from "@/utils/get-current-location";
import { useNavigate } from "react-router-dom";

const PropertiesPage = () => {
  const [totalProperties, setTotalProperties] = useState(0);
  const navigate = useNavigate();
  getCurrentLocation()
    .then((res) => {
      console.log(res);
    })
    .catch(() => {
      navigate("/");
    });

  return (
    <div className="min-h-screen">
      <main className="py-[50px] w-full px-[15px] lg:px-[80px] xl:px-[150px]">
        <header className="w-full space-y-2">
          <div>
            <Breadcrumb />
          </div>

          <div className="w-full flex items-center justify-between">
            {/* Left title and desc */}
            <div>
              <div className="flex items-end gap-2">
                <h2 className="font-semibold text-3xl">
                  Find nearby properties
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Find some property around your current place here, a collection
                of top and quality properties.
              </p>
            </div>

            {/* Right Sort */}
            <div className="max-md:hidden h-full flex flex-col gap-2 items-end">
              .
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
