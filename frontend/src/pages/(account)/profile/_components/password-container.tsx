import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/components/ui/use-toast";
import { useChangePasswordMutation } from "@/api/services/account.service";
import { PasswordValidationSchema } from "@/validator/profile.schema";
import ErrorMessage from "@/components/shared/error-message";

const PasswordContainer = () => {
  const { toast } = useToast();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PasswordValidationSchema),
  });

  const onSubmit: (data: any) => void = async (data: any) => {
    console.log(data);
    try {
      const res = await changePassword(data).unwrap();
      toast({
        title: res.message,
      });
    } catch (error: any) {
      toast({
        title: error.data.message,
      });
    }
  };

  return (
    <form className="w-full space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-[700] text-lg">Password Setting</h2>

      <div className="w-full flex max-md:flex-col gap-4 ">
        <div className="w-full flex flex-col gap-2">
          <Label>Old Password</Label>
          <Input
            placeholder="********"
            type="password"
            {...register("oldPassword")}
          />
          <ErrorMessage error={errors.oldPassword?.message} />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>New Password</Label>
          <Input
            placeholder="6+ characters"
            type="password"
            {...register("newPassword")}
          />
          <ErrorMessage error={errors.newPassword?.message} />
        </div>
      </div>

      {/* Submit Button */}
      <Button className="w-fit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Change Password"}
      </Button>
    </form>
  );
};

export default PasswordContainer;
