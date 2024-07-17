import coverImg from "@/assets/images/addis-ababa-img3.jpg";
import React from "react";
import LoginForm from "./_components/form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CustomNavigate from "@/utils/navigate";

const LoginPage: React.FC = () => (
  <section className="md:grid md:grid-cols-[30%,70%]">
    <div className="h-screen max-md:hidden md:size-full">
      <div className="overflow-hidden size-full">
        <img src={coverImg} className="size-full object-cover" alt="" />
      </div>
    </div>

    <div className="relative flex items-center h-screen overflow-y-scroll w-full max-md:pt-10 max-md:px-8 md:pl-24">
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
          <h2 className="text-2xl md:text-3xl font-[800]">Sign in</h2>
        </header>

        <LoginForm />
      </div>
    </div>
  </section>
);
export default LoginPage;
