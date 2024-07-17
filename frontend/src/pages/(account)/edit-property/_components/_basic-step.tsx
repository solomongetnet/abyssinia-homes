import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ErrorMessage from "@/components/shared/error-message";
import { propertiesStatusList } from "@/constants/properties-status";
import { propertiesTypesList } from "@/constants/properties-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import currencies from "@/constants/currentcies";
import { basicValidatorSchema } from "@/validator/new-property.schema";
import { useEditPropertyMutation } from "@/api/services/property.service";
import { useToast } from "@/components/ui/use-toast";

interface IProps {
  data: any;
  propertyId: string;
}

const BasicStep: FC<IProps> = ({ data, propertyId }) => {
  const [editProperty, { isLoading: isUpdating }] = useEditPropertyMutation();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      title: data?.title,
      description: data?.description,
      price: {
        currency: data?.price?.currency,
        amount: data.price?.amount,
      },
      propertyType: data?.propertyType,
      propertyStatus: data?.propertyStatus,
    },
    resolver: yupResolver(basicValidatorSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await editProperty({ data, propertyId }).unwrap();
      toast({
        title: res.message,
      });
    } catch (error) {
      toast({
        title: "Can't edit please try again",
      });
    }
  };

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-md font-semibold">Property Basics</h2>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
        <div className="w-full flex-col gap-2">
          <Label>Title</Label>
          <Input
            type="text"
            {...register("title")}
            className="py-6 bg-muted"
            placeholder="Property Title Here"
          />
          <ErrorMessage error={errors.title?.message} />
        </div>

        <div className="w-full flex-col gap-2">
          <Label>Description</Label>
          <Textarea
            {...register("description")}
            className="h-[140px] bg-muted"
            placeholder="Property Description Here"
          />
          <ErrorMessage error={errors.description?.message} />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="w-full flex flex-col gap-2">
            <Label>Property Type</Label>
            <select
              {...register("propertyType")}
              className="bg-muted w-full h-[40px] px-2 outline-none cursor-pointer border"
            >
              <option value="">Select Property Type</option>
              {propertiesTypesList.map(({ label, type }, i) => (
                <option value={type} key={i}>
                  {label}
                </option>
              ))}
            </select>
            <ErrorMessage error={errors.propertyType?.message} />
          </div>

          <div className="w-full flex  flex-col gap-2">
            <Label>Property Status</Label>
            <select
              {...register("propertyStatus")}
              className="bg-muted w-full h-[40px] px-2 outline-none cursor-pointer border"
            >
              <option value="">Select Property Status</option>
              {propertiesStatusList.map(({ label, type }, i) => (
                <option value={type} key={i}>
                  {label}
                </option>
              ))}
            </select>
            <ErrorMessage error={errors?.propertyStatus?.message} />
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="w-full flex-col gap-2">
            <Label>Price</Label>
            <Input
              type="number"
              {...register("price.amount")}
              className="py-6 bg-muted"
              placeholder="Property Price Here"
            />
            <ErrorMessage error={errors.price?.amount?.message} />
          </div>

          <div className="w-full flex flex-col gap-2">
            <Label>Currency</Label>
            <select
              {...register("price.currency")}
              className="bg-muted w-full h-[40px] px-2 outline-none cursor-pointer border"
            >
              <option value="">Select Price Currency</option>
              {currencies.map((c) => (
                <option value={c.code} key={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
            <ErrorMessage error={errors.price?.currency?.message} />
          </div>
        </div>

        <div className="mt-2 w-full flex justify-center md:justify-end">
          <Button className="w-full sm:w-[200px]" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Basics"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BasicStep;
