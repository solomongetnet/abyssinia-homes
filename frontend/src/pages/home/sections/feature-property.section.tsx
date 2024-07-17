import PropertyCard from "@/components/shared/cards/property-card";
import { useGetFeaturePropertiesQuery } from "@/api/services/property.service";
import Loader from "@/components/ui/loader";
import CustomNavigate from "@/utils/navigate";
const FeaturePropertySection = () => {
  const { data, isLoading, isError } = useGetFeaturePropertiesQuery();

  if (isError) return <div>Some Error occured</div>;

  return (
    <div className="">
      <div className="flex flex-col gap-20 py-[60px] px-[20px] sm:px-[100px]">
        <header className="w-full flex flex-col items-center text-center">
          <h2 className="font-semibold text-3xl">
            Discover Feature Properties
          </h2>
          <p className="sm:w-[70%] text-center text-sm text-muted-foreground">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste Lorem
            ipsum, dolor sit amet consectetur adipisicing elit. Iste
          </p>
        </header>

        <main className="flex flex-col items-center gap-10 w-full">
          {isLoading ? (
            <div className="w-full flex justify-center mt-16">
              <Loader />
            </div>
          ) : (
            <div className="w-full grid gap-6 sm:gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {data &&
                data.map((property) => (
                  <PropertyCard
                    key={property._id}
                    className="w-full"
                    data={property}
                    data-aos="fade-up"
                  />
                ))}
            </div>
          )}

          <div>
            <CustomNavigate to="/properties">
              Browser More Properties
            </CustomNavigate>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FeaturePropertySection;
