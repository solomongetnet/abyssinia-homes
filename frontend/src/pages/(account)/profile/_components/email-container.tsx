import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "@/components/ui/use-toast";
import ErrorMessage from "@/components/shared/error-message";
import { useUpdateProfileEmailMutation } from "@/api/services/profile.service";
import useAuth from "@/hooks/use-auth";

const EmailContainer = () => {
  const { toast } = useToast();
  const { isLoading: isUserLoading, user } = useAuth();
  const [updateProfileEmail, { isLoading: isUpdating }] =
    useUpdateProfileEmailMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object({
        email: yup
          .string()
          .required("Email is required")
          .email("Invalid Email"),
      })
    ),
    values: {
      email: user?.email!,
    },
  });

  const onSubmit: (data: any) => void = async (data: any) => {
    console.log(data);
    try {
      const res: { message: string } = await updateProfileEmail(data).unwrap();
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
      <h2 className="font-[700] text-lg">Email</h2>

      <div className="w-full flex max-md:flex-col gap-4 ">
        <div className="w-full flex flex-col gap-2">
          <Label>Email adress</Label>
          <Input
            {...register("email")}
            placeholder="Email Address"
            disabled={isUpdating || isUserLoading}
          />
          <ErrorMessage error={errors.email?.message} />
        </div>
      </div>

      {/* Submit Button */}
      <Button className="w-fit" disabled={isUpdating || isUserLoading}>
        {isUpdating ? "Loading..." : "Update Email"}
      </Button>
    </form>
  );
};

export default EmailContainer;
