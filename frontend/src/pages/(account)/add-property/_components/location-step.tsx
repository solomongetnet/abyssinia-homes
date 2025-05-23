import ErrorMessage from "@/components/shared/error-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux.hooks";
import { updatePropertyForm } from "@/store/slices/property.slices";
import { locationValidatorSchema } from "@/validator/new-property.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  nextStep: () => void;
  prevStep: () => void;
}

const LocationStep: FC<IProps> = ({ nextStep, prevStep }) => {
  const {
    location: {
      country,
      street,
      address,
      zipCode,
      city,
      map,
      neighborhood,
      region,
      subcity,
    },
  } = useAppSelector((state) => state.property.propertyForm);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: {
        longitude: map.longitude,
        latitude: map.latitude,
        country,
        street,
        address,
        zipCode,
        city,
        neighborhood,
        region,
        subcity,
      },
    },
    resolver: yupResolver(locationValidatorSchema),
  });

  const onSubmit = (data: any) => {
    dispatch(
      updatePropertyForm({
        location: {
          ...data.location,
          map: {
            latitude: data.location.latitude,
            longitude: data.location.longitude,
          },
        },
      })
    );
    nextStep();
  };

  const handlePrevBtn = () => {
    prevStep();
  };

  const handleNextBtn = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className="w-full space-y-4">
      <header>
        <h2 className="text-md font-semibold">Listing Location</h2>
      </header>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="w-full flex-col gap-2">
            <Label>Country</Label>
            <div className="w-full flex  flex-col gap-2">
              <select
                {...register("location.country")}
                className="bg-muted w-full h-[40px] px-2 outline-none cursor-pointer border"
              >
                <option value="">Enter Country</option>
                <option value="ethiopia">Ethiopia</option>
              </select>
            </div>
            <ErrorMessage error={errors.location?.country?.message} />
          </div>

          <div className="w-full flex-col gap-2">
            <Label>City</Label>
            <div className="w-full flex  flex-col gap-2">
              <select
                {...register("location.city")}
                className="bg-muted w-full h-[40px] px-2 outline-none cursor-pointer border"
              >
                <option value="">Enter City</option>
                <option value="addiss ababa">Addiss Ababa</option>
              </select>
            </div>
            <ErrorMessage error={errors.location?.city?.message} />
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="w-full flex-col gap-2">
            <Label>Address</Label>
            <Input
              {...register("location.address")}
              className="py-6 bg-muted"
              placeholder="Enter Address"
            />
            <ErrorMessage error={errors.location?.address?.message} />
          </div>

          <div className="w-full flex-col gap-2">
            <Label>Street</Label>
            <Input
              {...register("location.street")}
              className="py-6 bg-muted"
              placeholder="Main street ..."
            />
            <ErrorMessage error={errors.location?.street?.message} />
          </div>

          <div className="w-full flex-col gap-2">
            <Label>Zip Code</Label>
            <Input
              {...register("location.zipCode")}
              type="number"
              className="py-6 bg-muted"
              placeholder="Zip Code"
            />
            <ErrorMessage error={errors.location?.zipCode?.message} />
          </div>

          <div className="w-full flex-col gap-2">
            <Label>Subcity</Label>
            <Input
              {...register("location.subcity")}
              type="text"
              className="py-6 bg-muted"
              placeholder="Bole, Yeka, Arada"
            />
            <ErrorMessage error={errors.location?.subcity?.message} />
          </div>

          <div className="w-full flex-col gap-2">
            <Label>Neighborhood / ሰፈር</Label>
            <Input
              {...register("location.neighborhood")}
              type="text"
              className="py-6 bg-muted"
              placeholder="4kilo, Kotebe, abado ..."
            />
            <ErrorMessage error={errors.location?.neighborhood?.message} />
          </div>

          <div className="w-full flex-col gap-2">
            <Label>Region</Label>
            <Input
              {...register("location.region")}
              type="text"
              className="py-6 bg-muted"
              placeholder="Amhara, tigray, oromiya, ..."
            />
            <ErrorMessage error={errors.location?.region?.message} />
          </div>
        </div>

        {/* Google map data */}
        <div className="w-full space-y-2 pt-2">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="w-full flex-col gap-2">
              <Label>Latitude (for Google Maps)</Label>
              <Input
                {...register("location.latitude")}
                type="number"
                className="py-6 bg-muted"
                placeholder="Latitude Here"
              />
              <ErrorMessage error={errors.location?.latitude?.message} />
            </div>
            <div className="w-full flex-col gap-2">
              <Label>Longitude (for Google Maps)</Label>
              <Input
                {...register("location.longitude")}
                type="number"
                className="py-6 bg-muted"
                placeholder="Longituide Here"
              />
              <ErrorMessage error={errors.location?.longitude?.message} />
            </div>
          </div>
          <div className="w-full h-[240px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/@9.0411925,38.8314627,21z?entry=ttu"
              loading="lazy"
              className="border-0 size-full"
            ></iframe>
          </div>
        </div>
      </form>

      <footer className="w-full flex max-md:flex-col md:justify-between gap-2">
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

export default LocationStep;
