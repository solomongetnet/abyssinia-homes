import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/components/ui/use-toast";
import { InformationValidationSchema } from "@/validator/profile.schema";
import { useUpdateProfileInformationMutation } from "@/api/services/profile.service";
import useAuth from "@/hooks/use-auth";
import ErrorMessage from "@/components/shared/error-message";

const InformationContainer = () => {
  const { toast } = useToast();
  const { isLoading: isUserLoading, user } = useAuth();

  const [updateProfileInformation, { isLoading: isUpdating }] =
    useUpdateProfileInformationMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(InformationValidationSchema),
    values: {
      fullName: user?.fullName!,
      username: user?.username!,
      company: user?.company,
      description: user?.description,
      job: user?.job,
      location: user?.location,
      officeAddress: user?.officeAddress,
      officeNumber: user?.officeNumber || null,
      phoneNumber: user?.phoneNumber!,
    },
  });

  const onSubmit: (data: any) => void = async (data: any) => {
    try {
      const res: { message: string } = await updateProfileInformation(
        data
      ).unwrap();
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
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-[700] text-lg">Information</h2>
      {/* FUllname and Username */}
      <div className="w-full flex max-md:flex-col gap-4 ">
        <div className="w-full flex flex-col gap-2">
          <Label>Fullname</Label>
          <Input
            placeholder="Fullname"
            {...register("fullName")}
            disabled={isUserLoading || isUpdating}
          />
          <ErrorMessage error={errors.fullName?.message} />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Username</Label>
          <Input
            {...register("username")}
            placeholder="Username"
            disabled={true}
          />
          <ErrorMessage error={errors.username?.message} />
        </div>
      </div>
      {/* Description */}
      <div className="w-full ">
        <div className="w-full flex flex-col gap-2">
          <Label>Description</Label>
          <Textarea
            {...register("description")}
            className="h-[150px]"
            placeholder="Your Description Here"
            disabled={isUserLoading || isUpdating}
          />
        </div>
      </div>
      {/* Other Information */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="w-full flex flex-col gap-2">
          <Label>Current Company</Label>
          <Input
            {...register("company")}
            placeholder="Your Company"
            disabled={isUserLoading || isUpdating}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Offic Number</Label>
          <Input
            {...register("officeNumber")}
            placeholder="+251998...."
            type="number"
            disabled={isUserLoading || isUpdating}
          />
          <ErrorMessage error={errors.officeNumber?.message} />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Office Address</Label>
          <Input
            {...register("officeAddress")}
            placeholder="Office Address"
            disabled={isUserLoading || isUpdating}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Job</Label>
          <Input
            {...register("job")}
            placeholder="Current Job"
            disabled={isUserLoading || isUpdating}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <Label>Phone number</Label>
          <Input
            {...register("phoneNumber")}
            type="number"
            placeholder="Your Phone Number"
            disabled={isUserLoading || isUpdating}
          />
          <ErrorMessage error={errors.phoneNumber?.message} />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Location</Label>
          <Input
            {...register("location")}
            placeholder="Your Location"
            disabled={isUserLoading || isUpdating}
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button className="w-fit" disabled={isUpdating || isUserLoading}>
        {isUpdating ? "Loading..." : "Update Information"}
      </Button>
    </form>
  );
};

export default InformationContainer;
