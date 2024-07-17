import { FC, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { twMerge } from "tailwind-merge";
import { useLogoutMutation } from "@/api/services/auth.service";

interface IProps {
  children: ReactNode;
  className?: string;
  withToast?: boolean;
  variant?: any;
}

const LogoutButton: FC<IProps> = ({
  children,
  className,
  withToast = false,
  variant,
}) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const { toast } = useToast();
  const handleLogout = async () => {
    try {
      const res = await logout().unwrap();
      if (withToast) {
        toast({
          title: res.message,
        });
      }
    } catch (error) {}
  };
  
  return (
    <Button
      variant={variant || "default"}
      onClick={handleLogout}
      className={twMerge(className)}
      disabled={isLoading}
    >
      {children}
    </Button>
  );
};

export default LogoutButton;
