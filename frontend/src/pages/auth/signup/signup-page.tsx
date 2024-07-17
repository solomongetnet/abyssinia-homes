import React from "react";
import SignupForm from "./_components/form";
import coverImg from "@/assets/images/Ethiopia-img.jpg";
import { ArrowLeft } from "lucide-react";
import CustomNavigate from "@/utils/navigate";
import { Button } from "@/components/ui/button";

const SignupPage: React.FC = () => (
  <section className="md:grid md:grid-cols-[30%,70%]">
    <div className="max-md:hidden h-screen w-full">
      <div className="overflow-hidden size-full">
        <img src={coverImg} className="size-full object-cover" alt="" />
      </div>
    </div>

    <div className="h-screen relative overflow-y-scroll w-full pt-20 md:pt-10 max-md:px-8 md:pl-24">
      <CustomNavigate to="/">
        <Button
          size="icon"
          className="absolute top-5 left-8 rounded-full bg-black text-white dark:bg-white dark:text-black "
        >
          <ArrowLeft />
        </Button>
      </CustomNavigate>

      <div className="w-full md:w-[450px] flex flex-col">
        <header className="w-full">
          <h2 className="text-2xl md:text-3xl  font-[800]">Create account</h2>
        </header>

        <SignupForm />
      </div>
    </div>
  </section>
);

export default SignupPage;
