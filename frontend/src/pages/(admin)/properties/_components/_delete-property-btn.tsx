import { useDeletePropertyMutation } from "@/api/services/property.service";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  className?: string;
  propertyId: any;
  label: string;
  variant?: string;
}

const DeletePropertyBtn: FC<IProps> = ({
  propertyId,
  className,
  label,
  variant = "default",
  ...props
}) => {
  const { toast } = useToast();
  const [deleteProperty, { isLoading }] = useDeletePropertyMutation();
  const handleDeleteProperty = async () => {
    try {
      const res = await deleteProperty(propertyId).unwrap();
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

export default DeletePropertyBtn;
