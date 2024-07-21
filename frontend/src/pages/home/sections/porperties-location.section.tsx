import { Button } from "@/components/ui/button";
import { propertiesLocation } from "@/constants/properties-location";
import CustomNavigate from "@/utils/navigate";
import { ArrowUpRight } from "lucide-react";

const PropertiesLocation = () => {
  return (
    <div className="min-h-[100vh]">
      <div className="flex flex-col gap-20 py-[60px] px-[10px] sm:px-[100px]">
        <header className="w-full flex flex-col items-center text-center">
          <h2 className="font-semibold text-3xl">Properties By Location</h2>
          <p className="sm:w-[70%] text-center text-sm text-muted-foreground">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
            laboriosam unde nemo vero tempora molestias error officiis harum,
          </p>
        </header>

        <main className="w-full">
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ">
            {propertiesLocation.map((l, idx) => (
              <div
                data-aos="fade-up"
                className="flex flex-col gap-2 p-2 rounded-2xl group border"
                key={l.address + idx}
              >
                <div className="relative overflow-hidden w-full h-[350px] rounded-xl cursor-pointer group group-hover:rounded-tl-3xl group-hover:rounded-br-3xl">
                  <img
                    src={l.img}
                    className="size-full object-cover group-hover:scale-125 transition-4"
                    alt=""
                    loading="lazy"
                  />
                </div>

                <div className="flex gap-1 py-4 px-2">
                  <div className="flex-1 flex flex-col">
                    <h2>{l.address}</h2>
                    <p className="text-muted-foreground text-sm">
                      {l.properties} properties
                    </p>
                  </div>

                  <CustomNavigate
                    to={`/properties?location=${l.address.split(",")[1].trimStart()}`}
                    className="rounded-full"
                  >
                    <Button className="rounded-full" size={"icon"}>
                      <ArrowUpRight />
                    </Button>
                  </CustomNavigate>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PropertiesLocation;
