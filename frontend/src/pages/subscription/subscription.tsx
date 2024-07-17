import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Subscription = () => {
  return (
    <div className="w-full min-h-screen grid place-content-center">
      <header className="w-full text-center py-10 text-3xl">Our Plan</header>
      <div className="w-[80vw] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="w-full rounded-sm overflow-hidden shadow-lg border ">
          <div className="w-full bg-muted py-8 px-4 flex flex-col items-center gap-6">
            <h3 className="text-lg">Free</h3>
            <div className="flex flex-col text-center">
              <h2 className="font-bold text-3xl">0 ETB</h2>
              <p className="text-md font-[100] font-sans">/month</p>
            </div>
            <Button className="w-[200px]  bg-black text-white dark:bg-white dark:text-black">
              Get Started
            </Button>
          </div>

          <div className="py-6 px-12 bg-background">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-primary" />
                <p className="text-sm font-[100]">5 Properties Per Month</p>
              </li>

              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-muted-foreground" />
                <p className="text-sm font-[100]">
                  15 Featuerd Post Per Month{" "}
                </p>
              </li>

              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-muted-foreground" />
                <p className="text-sm font-[100]">
                  Unlimted Video And Images For Post
                </p>
              </li>

              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-muted-foreground" />
                <p className="text-sm font-[100]">Customize Profile</p>
              </li>

              <li className="flex items-center gap-1 ">
                <Check className="w-[20px]  text-muted-foreground" />
                <p className="text-sm font-[100]">Drafted Post</p>
              </li>

              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-muted-foreground" />
                <p className="text-sm font-[100]">Premium Profile</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full rounded-sm overflow-hidden shadow-lg border ">
          <div className="w-full bg-muted py-8 px-4 flex flex-col items-center gap-6">
            <h3 className="text-lg">Standard</h3>
            <div className="flex flex-col text-center">
              <h2 className="font-bold text-3xl">60,000 ETB</h2>
              <p className="text-md font-[100] font-sans">/month</p>
            </div>
            <Button className="w-[200px]  bg-black text-white dark:bg-white dark:text-black">
              Get Started
            </Button>
          </div>

          <div className="py-6 px-12 bg-background">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-primary" />
                <p className="text-sm font-[100]">20 Properties Per Day</p>
              </li>

              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-primary" />
                <p className="text-sm font-[100]">
                  15 Featuerd Post Per Month{" "}
                </p>
              </li>

              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-primary" />
                <p className="text-sm font-[100]">
                  Unlimted Video And Images For Post
                </p>
              </li>

              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-primary" />
                <p className="text-sm font-[100]">Customize Profile</p>
              </li>

              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-primary" />
                <p className="text-sm font-[100]">Drafted Post</p>
              </li>

              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-primary" />
                <p className="text-sm font-[100]">Premium Profile</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full rounded-sm overflow-hidden shadow-lg border ">
          <div className="w-full bg-muted py-8 px-4 flex flex-col items-center gap-6">
            <h3 className="text-lg">Enterprise</h3>
            <div className="flex flex-col text-center">
              <h2 className="font-bold text-3xl">120,000 ETB</h2>
              <p className="text-md font-[100] font-sans">/month</p>
            </div>
            <Button className="w-[200px]  bg-black text-white dark:bg-white dark:text-black">
              Get Started
            </Button>
          </div>

          <div className="py-6 px-12 bg-background">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-primary" />
                <p className="text-sm font-[100]">20 Properties Per Day</p>
              </li>

              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-primary" />
                <p className="text-sm font-[100]">
                  15 Featuerd Post Per Month{" "}
                </p>
              </li>

              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-primary" />
                <p className="text-sm font-[100]">
                  Unlimted Video And Images For Post
                </p>
              </li>

              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-primary" />
                <p className="text-sm font-[100]">Customize Profile</p>
              </li>

              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-primary" />
                <p className="text-sm font-[100]">Drafted Post</p>
              </li>

              <li className="flex items-center gap-1 ">
                <Check className="w-[20px] text-primary" />
                <p className="text-sm font-[100]">Premium Profile</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
