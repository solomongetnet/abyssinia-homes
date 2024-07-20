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
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux.hooks";
import { updatePropertyForm } from "@/store/slices/property.slices";
import currencies from "@/constants/currentcies";
import { basicValidatorSchema } from "@/validator/new-property.schema";

interface IProps {
  nextStep: () => void;
  prevStep?: () => void;
}

const BasicStep: FC<IProps> = ({ nextStep }) => {
  const {
    title,
    description,
    propertyStatus,
    propertyType,
    price: { currency, amount, period },
    company,
  } = useAppSelector((state) => state.property.propertyForm);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    values: {
      title,
      description,
      price: {
        currency,
        amount,
        period,
      },
      propertyType,
      propertyStatus,
      company,
    },
    resolver: yupResolver(basicValidatorSchema),
  });
  const dispatch = useAppDispatch();
  const propertyStatusWatch = watch("propertyStatus");

  const onSubmit = (data: any) => {
    dispatch(updatePropertyForm({ ...data }));
    nextStep();
  };

  const handleSubmitBtn = async () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-md font-semibold">Property Basics</h2>
      </header>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6"
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

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
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

          <div className="w-full flex  flex-col gap-2">
            <Label>Compnay</Label>
            <Input
              {...register("company")}
              className="py-6 bg-muted"
              placeholder="Ayat, ovid, sunshine, noah ..."
            />
            <ErrorMessage error={errors?.company?.message} />
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

          {propertyStatusWatch === "for rent" && (
            <div className="w-full flex flex-col gap-2">
              <Label>Rent period</Label>
              <select
                {...register("price.period")}
                className="bg-muted w-full h-[40px] px-2 outline-none cursor-pointer border"
                defaultValue={""}
              >
                <option value="" defaultChecked={true}>
                  Select rent period
                </option>
                <option value="monthly" defaultChecked={true}>
                  Monthly
                </option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
              <ErrorMessage error={errors.price?.period?.message} />
            </div>
          )}
        </div>

        <button hidden>Submit</button>
      </form>

      <footer className="w-full flex max-md:flex-col md:justify-end">
        <Button onClick={handleSubmitBtn} className="w-full sm:w-[200px]">
          Next
        </Button>
      </footer>
    </div>
  );
};

export default BasicStep;
