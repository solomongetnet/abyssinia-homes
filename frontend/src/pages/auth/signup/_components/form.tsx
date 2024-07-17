import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { SignupValidationSchema } from "@/validator/signup.schema";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useSignupMutation } from "@/api/services/auth.service";
import ErrorMessage from "@/components/shared/error-message";
import { useToast } from "@/components/ui/use-toast";
const SignupForm = () => {
  const [signupMutation, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      phoneNumber: 0,
      password: "",
      role: "",
    },
    resolver: yupResolver(SignupValidationSchema),
  });

  const accountType = watch("role");
  const onSubmit = async (data: any) => {
    try {
      const res: { message: string } = await signupMutation({
        ...data,
        role: data.role || "user",
      }).unwrap();
      toast({ title: "Success", description: res.message });
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
      className="flex flex-col gap-2 py-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="font-[600] text-md">
          Username
        </label>
        <Input type="text" className="py-6" {...register("username")} />
        <ErrorMessage error={errors.username?.message} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="font-[600] text-md">
          Fullname
        </label>
        <Input type="text" className="py-6" {...register("fullName")} />
        <ErrorMessage error={errors.fullName?.message} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="font-[600] text-md">
          Email
        </label>
        <Input type="email" className="py-6" {...register("email")} />
        <ErrorMessage error={errors.email?.message} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="" className="font-[600] text-md">
          Account Type
        </label>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-6">
            <div className=" flex gap-2 items-center cursor-pointer">
              <Input
                type="radio"
                value="user"
                id="user"
                {...register("role")}
              />
              <Label htmlFor="option-one" className="cursor-pointer">
                User
              </Label>
            </div>
            <div className="flex gap-2 items-center cursor-pointer">
              <Input
                type="radio"
                value="agent"
                id="agent"
                {...register("role")}
              />
              <Label htmlFor="option-two" className="cursor-pointer">
                Agent
              </Label>
            </div>
          </div>
        </div>
        <ErrorMessage error={errors.role?.message} />
      </div>

      {accountType === "agent" && (
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="font-[600] text-md">
            Phone Number
          </label>
          <Input type="number" className="py-6" {...register("phoneNumber")} />
          <ErrorMessage error={errors.phoneNumber?.message} />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label htmlFor="" className="font-[600] text-md">
          Password
        </label>
        <Input type="password" className="py-6" {...register("password")} />
        <ErrorMessage error={errors.password?.message} />
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col items-center gap-4">
        <Button className="w-full py-6 rounded-full" disabled={isLoading}>
          {isLoading ? "Loading..." : "Create an account"}
        </Button>

        <div className="flex items-center gap-1 text-sm">
          <span>Already have an account?</span>
          <Link to={"/auth/login"} className="underline">
            Log in
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
