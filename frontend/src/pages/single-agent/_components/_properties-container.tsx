import PropertyCard from "@/components/shared/cards/property-card";
import useMedia from "@/hooks/use-media";

const PropertiesContainer = ({ properties }: { properties: any[] }) => {
  const isMdScreen = useMedia("(max-width: 700px)");
  return (
    <div>
      {properties.length === 0 ? (
        <div className="w-full my-24 text-center">
          There is no any property for yet
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {properties.map((property) => (
            <>
              <PropertyCard
                className="p-4"
                orientation={isMdScreen ? "vertical" : "horizontal"}
                data={property}
                key={property._id}
              />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertiesContainer;
