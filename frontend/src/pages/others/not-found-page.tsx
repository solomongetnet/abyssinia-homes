import { Button } from "@/components/ui/button";
import CustomNavigate from "@/utils/navigate";

const NotFoundPage = () => {
  return (
    <section className="pt-[20vh] grid place-content-center">
      <div className="absolute bottom-20 right-16 bg-primary/50 size-[250px] rounded-full blur-2xl " />
      <div className="flex flex-col gap-4 items-center text-center">
        <div className="flex flex-col text-center">
          <h2 className="text-8xl sm:text-[160px] sm:leading-[135px] font-[800] text-primary">
            404
          </h2>
          <h4 className="text-lg sm:text-xl font-[800]">We Lost This Page</h4>
          <p className="mt-2 text-xs text-muted-foreground">
            We Searched high and low but couldn't find what you're <br />{" "}
            looking for, Let's find better place for your go to{" "}
          </p>
        </div>

        <CustomNavigate to={"/"}>
          <Button variant={"link"}>Back To Home</Button>
        </CustomNavigate>
      </div>
    </section>
  );
};

export default NotFoundPage;
