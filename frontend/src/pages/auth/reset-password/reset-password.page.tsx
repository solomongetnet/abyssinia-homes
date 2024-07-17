import React from "react";
import coverImg from "@/assets/images/addis-ababa-img3.jpg";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CustomNavigate from "@/utils/navigate";
import { useNavigate, useParams } from "react-router-dom";
import ResetPassForm from "./_components/form";

const ResetPasswordPage: React.FC = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();

  if (!resetToken) {
    navigate(-1);
    return;
  }

  return (
    <section className="md:grid md:grid-cols-[30%,70%]">
      <div className="h-screen max-md:hidden md:size-full">
        <div className="overflow-hidden size-full">
          <img src={coverImg} className="size-full object-cover" alt="" />
        </div>
      </div>

      <div className="relative flex items-center h-screen overflow-y-scroll w-full max-md:pt-10 max-md:px-8 md:pl-24">
        <CustomNavigate to={-1}>
          <Button
            size="icon"
            className="absolute top-5 left-8 rounded-full bg-black text-white dark:bg-white dark:text-black "
          >
            <ArrowLeft />
          </Button>
        </CustomNavigate>

        <div className="w-full md:w-[450px] flex flex-col">
          <header className="w-full">
            <h2 className="text-2xl md:text-3xl  font-[800]">Reset your password now</h2>
          </header>

          <ResetPassForm />
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
