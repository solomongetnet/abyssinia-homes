import { useDeleteUserMutation } from "@/api/services/user.service";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  className?: string;
  userId: any;
  label: string;
  variant?: string;
}

const DeleteUserBtn: FC<IProps> = ({
  userId,
  className,
  label,
  variant = "default",
  ...props
}) => {
  const { toast } = useToast();
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const handleDeleteProperty = async () => {
    try {
      const res = await deleteUser({ userId }).unwrap();
      toast({
        title: "Success",
        description: res.message,
      });
    } catch (error: any) {
      toast({
        title: "Denid",
        description: error.data.message,
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant={"outline"}
      onClick={handleDeleteProperty}
      className={twMerge(`${className}`)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Deleting.." : label}
    </Button>
  );
};

export default DeleteUserBtn;
