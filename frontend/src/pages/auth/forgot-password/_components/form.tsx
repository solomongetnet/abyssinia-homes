import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "@/api/services/auth.service";
import { useToast } from "@/components/ui/use-toast";

const ForgotPassForm: FC = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state.email || "");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) return;

    try {
      let res = await forgotPassword({ email }).unwrap();
      toast({
        title: res.message,
      });
      navigate("/auth/login");
    } catch (error: any) {
      toast({
        title: error.data.message,
        variant: "destructive",
      });
    }
  };

  return (
    <form
      className="flex flex-col gap-2 pt-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="font-[600] text-md">
          Email
        </label>
        <Input
          type="email"
          className="py-6"
          onChange={(e) => setEmail(e.target.value.trim())}
          value={email}
        />
        <div className="min-h-[25px]">
          {/* <ErrorMessage error={errors.email?.message} /> */}
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <Button
          className="w-full py-6 rounded-full"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Forgot Passwod"}
        </Button>
      </div>
    </form>
  );
};

export default ForgotPassForm;
