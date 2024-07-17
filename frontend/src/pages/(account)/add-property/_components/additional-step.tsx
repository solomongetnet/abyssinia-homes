import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AmenitiesData } from "@/constants/amenities";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux.hooks";
import { updatePropertyForm } from "@/store/slices/property.slices";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/shared/error-message";
import { additionalValidatorSchema } from "@/validator/new-property.schema";

interface IProps {
  nextStep: () => void;
  prevStep: () => void;
}

const AdditionalStep: FC<IProps> = ({ nextStep, prevStep }) => {
  const dispatch = useAppDispatch();
  const {
    size,
    roomsSize,
    bathRooms,
    bedRooms,
    builtYear,
    floorNumber,
    constructionType,
    amenities,
  } = useAppSelector((state) => state.property.propertyForm);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      size,
      roomsSize,
      bathRooms,
      bedRooms,
      builtYear,
      floorNumber,
      constructionType,
      amenities,
    },
    resolver: yupResolver(additionalValidatorSchema),
  });
  
  useEffect(() => {
    setValue("amenities", amenities);
  }, []);

  const selectedAmenities: any = watch("amenities", []);

  const onSubmit = (data: any) => {
    dispatch(updatePropertyForm({ ...data }));

    nextStep();
  };

  const handlePrevBtn = () => {
    prevStep();
  };

  const handleNextBtn = () => {
    handleSubmit(onSubmit)();
  };

  // Amentieis
  const handleChangeAmentyBtn = (amenity: string) => {
    const newSelectedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a: any) => a !== amenity)
      : [...selectedAmenities, amenity];

    setValue("amenities", newSelectedAmenities);
  };

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-md font-semibold">Additional Details</h2>
      </header>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="w-full flex-col gap-2">
            <Label>Size in ft</Label>
            <Input
              {...register("size")}
              type="number"
              className="py-6 bg-muted"
              placeholder="Enter size in ft'"
            />
            <ErrorMessage error={errors.size?.message} />
          </div>

          <div className="w-full flex-col gap-2">
            <Label>Rooms</Label>
            <select
              {...register("roomsSize")}
              defaultValue={""}
              className="bg-muted w-full h-[40px] px-2 outline-none cursor-pointer border"
            >
              <option value={""}>Select rooms</option>
              {[...Array(15)].map((_, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {idx + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full flex-col gap-2">
            <Label>Bathrooms</Label>
            <select
              {...register("bathRooms")}
              defaultValue={0}
              className="bg-muted w-full h-[40px] px-2 outline-none cursor-pointer border"
            >
              <option value={""}>Select Bathrooms</option>
              {[...Array(10)].map((_, idx) => (
                <option key={idx} value={idx}>
                  {idx}
                </option>
              ))}
            </select>
            <ErrorMessage error={errors.bathRooms?.message} />
          </div>

          <div className="w-full flex-col gap-2">
            <Label>Bedrooms</Label>
            <select
              {...register("bedRooms")}
              defaultValue={0}
              className="bg-muted w-full h-[40px] px-2 outline-none cursor-pointer border"
            >
              <option value={""}>Select Bedrooms</option>
              {[...Array(10)].map((_, idx) => (
                <option key={idx} value={idx}>
                  {idx}
                </option>
              ))}
            </select>
            <ErrorMessage error={errors.bedRooms?.message} />
          </div>

          <div className="w-full flex-col gap-2">
            <Label>Year Built</Label>
            <Input
              {...register("builtYear")}
              type="number"
              className="py-6 bg-muted"
              placeholder="In what year was built?"
            />
          </div>

          <div className="w-full flex-col gap-2">
            <Label>Floor number</Label>
            <Input
              {...register("floorNumber")}
              type="number"
              className="py-6 bg-muted"
              placeholder="Property floor number"
            />
          </div>

          <div className="w-full flex-col gap-2">
            <Label>Construction Type</Label>
            <select
              {...register("constructionType")}
              className="bg-muted w-full h-[40px] px-2 outline-none cursor-pointer border"
            >
              <option value="">Enter Construction Type</option>
              <option value="wood">Wood</option>
              <option value="concrete">Concrete</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full h-full">
          <div className="text-md font-semibold">Amenties</div>
          <ul className="w-full flex flex-wrap gap-2">
            {AmenitiesData.map((a, idx) => (
              <div
                className={`border-2 px-2 sm:px-4 py-1 rounded-full cursor-pointer ${
                  selectedAmenities.includes(a)
                    ? "border-primary bg-primary/50"
                    : "bg-primary/20"
                }`}
                onClick={() => handleChangeAmentyBtn(a)}
                key={a + idx}
              >
                <h2 className="max-sm:text-sm">{a}</h2>
              </div>
            ))}
          </ul>
        </div>
      </form>

      <footer className="w-full flex max-md:flex-col gap-2 md:justify-between">
        <Button
          onClick={handlePrevBtn}
          variant={"outline"}
          className="w-full sm:w-[200px]"
        >
          Previous
        </Button>

        <Button onClick={handleNextBtn} className="w-full sm:w-[200px]">
          Next
        </Button>
      </footer>
    </div>
  );
};

export default AdditionalStep;
