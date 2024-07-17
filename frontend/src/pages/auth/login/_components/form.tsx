import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { LoginValidationSchema } from "@/validator/login.schema";
import { Link } from "react-router-dom";
import { useLoginMutation } from "@/api/services/auth.service";
import { useToast } from "@/components/ui/use-toast";
import ErrorMessage from "@/components/shared/error-message";

const LoginForm: FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(LoginValidationSchema),
  });
  const navigate = useNavigate();

  const onSubmit: (data: any) => void = async (data: any) => {
    try {
      let res = await login(data).unwrap();
      toast({
        title: res.message,
      });
      navigate("/account/dashboard");
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
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="font-[600] text-md">
          Email
        </label>
        <Input type="email" className="py-6" {...register("email")} />
        <div className="min-h-[25px]">
          <ErrorMessage error={errors.email?.message} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label htmlFor="" className="font-[600] text-md">
            Password
          </label>
          <Link
            to="/auth/forgot-password"
            state={{ email: getValues().email }}
            className="font-[500] underline"
          >
            Forgot?
          </Link>
        </div>

        <Input type="password" className="py-6" {...register("password")} />
        <div className="min-h-[25px]">
          <ErrorMessage error={errors.password?.message} />
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <Button className="w-full py-6 rounded-full" disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign in"}
        </Button>

        <div className="flex items-center gap-1 text-sm">
          <span>Don't have an account?</span>
          <Link to={"/auth/signup"} className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
