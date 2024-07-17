import { propertiesTypes } from "@/constants/properties-types";
import { useNavigate } from "react-router-dom";

const ExpolreCategoriesSection = () => {
  const navigate = useNavigate();
  const handleNavigate = (type: string) => {
    navigate(`/properties?propertyType=${type.toLowerCase()}`);
  };
  return (
    <div className="">
      <div className="flex flex-col gap-20 py-[60px] px-[20px] sm:px-[100px]">
        <header className="w-full flex flex-col items-center text-center">
          <h2 className="font-semibold text-3xl">Discover Categories</h2>
          <p className="sm:w-[70%] text-center text-sm text-muted-foreground">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
            laboriosam unde nemo vero tempora molestias error officiis harum,
            accusamus recusandae, illum, facilis obcaecati! Minima cum odit
            nesciunt itaque quos.
          </p>
        </header>

        <main className="w-full">
          <div className="grid gap-6 sm:gap-16 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 text-x">
            {propertiesTypes?.map((p, idx) => (
              <div
                onClick={() => handleNavigate(p.type)}
                key={p?.type}
                data-aos="fade-up"
                data-aos-delay={40 * idx}
                className="flex flex-col items-center cursor-pointer py-4 px-1 bg-muted dark:text-black rounded-xl hover:rounded-2xl hover:bg-primary hover:text-primary-foreground transition group"
              >
                <div className="text-center flex flex-col items-center gap-2 group-hover:text-white datk:text-white transition">
                  <span className="dark:text-white text-[45px] opacity-80">
                    {p?.icon}
                  </span>
                  <span className="dark:text-white">{p?.type}</span>
                </div>
                <span className="text-xs dark:text-white group-hover:text-white transition">
                  {p?.properties} properties
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExpolreCategoriesSection;
