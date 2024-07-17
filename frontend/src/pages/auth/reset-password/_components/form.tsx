import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "@/api/services/auth.service";
import { useToast } from "@/components/ui/use-toast";

const ResetPassForm: FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  if (!resetToken) {
    navigate("/");
    return;
  }

  const handleSubmit = async () => {
    if (newPassword.length < 6) {
      toast({
        title: "Password must be 6+ characters",
        variant: "destructive",
      });
      return;
    }

    try {
      let res = await resetPassword({ newPassword, resetToken }).unwrap();
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
          New password
        </label>
        <Input
          onChange={(e) => setNewPassword(e.target.value.trim())}
          type="password"
          className="py-6"
          placeholder="6+ characters"
        />
        <div className="min-h-[25px]">
          {/* <ErrorMessage error={errors.newPassword?.message} /> */}
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <Button
          className="w-full py-6 rounded-full"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Reset now"}
        </Button>
      </div>
    </form>
  );
};

export default ResetPassForm;
