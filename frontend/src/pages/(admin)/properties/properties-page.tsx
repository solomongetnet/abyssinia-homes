import { useState } from "react";
import PropertiesContainer from "./_components/properties-container";

const Admin_Properties = () => {
  const [totalPropertiesCount, setTotalPropertiesCount] = useState(0);

  return (
    <div className="space-y-10">
      <header
        className="flex items-center justify-between"
        data-aos="fade-left"
      >
        <h2 className="text-2xl font-semibold">All Properties</h2>
        <p className="text-sm text-muted-foreground">
          {totalPropertiesCount} Properties Found
        </p>
      </header>

      <main
        className="space-y-4 h-fit w-full bg-background rounded-lg p-3 pb-6"
        data-aos="fade-up"
      >
        <PropertiesContainer
          setTotalPropertiesCount={setTotalPropertiesCount}
        />
      </main>
    </div>
  );
};

export default Admin_Properties;
