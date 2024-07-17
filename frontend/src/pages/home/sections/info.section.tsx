import infoImgOne from "@/assets/images/i-1.svg";
import infoImgTwo from "@/assets/images/i-2.svg";
import infoImgThree from "@/assets/images/i-3.svg";
import infoImgFour from "@/assets/images/i-4.svg";
const InfoSection = () => (
  <section
    className="pt-[60px] pb-0 flex flex-col gap-10 items-center  w-full min-h-[60vh]"
    id="info-banner"
  >
    <div className="flex flex-col gap-20">
      <div className="w-full flex flex-col items-center text-center">
        <h2 className="font-semibold text-3xl text-white">Why Choose Us?</h2>
        <p className="sm:w-[70%] text-center text-sm text-muted-foreground text-white">
          Because We Offer Good Home
        </p>
      </div>
    </div>

    {/* Cards */}
    <div className="w-full md:w-[90%] grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
      <div className="w-full h-[250px] border shadow bg-background flex flex-col gap-2 items-center py-6 px-2">
        <img src={infoImgOne} alt="" className="w-[20%]" />

        <div className="pt-6 flex flex-col text-center">
          <h2 className="font-[700]">Find Your Home</h2>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit, amet consectetur
          </p>
        </div>
      </div>

      <div className="w-full h-[250px] border shadow bg-background flex flex-col gap-2 items-center py-6 px-2">
        <img src={infoImgTwo} alt="" className="w-[20%]" />

        <div className="pt-6 flex flex-col text-center">
          <h2 className="font-[700]">Find Trusted by thousands</h2>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit, amet consectetur
          </p>
        </div>
      </div>

      <div className="w-full h-[250px] border shadow bg-background flex flex-col gap-2 items-center py-6 px-2">
        <img src={infoImgThree} alt="" className="w-[20%]" />

        <div className="pt-6 flex flex-col text-center">
          <h2 className="font-[700]">Financing made easy</h2>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit, amet consectetur
          </p>
        </div>
      </div>

      <div className="w-full h-[250px] border shadow bg-background flex flex-col gap-2 items-center py-6 px-2">
        <img src={infoImgFour} alt="" className="w-[20%]" />

        <div className="pt-6 flex flex-col text-center">
          <h2 className="font-[700]">24/7 support</h2>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit, amet consectetur
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default InfoSection;
