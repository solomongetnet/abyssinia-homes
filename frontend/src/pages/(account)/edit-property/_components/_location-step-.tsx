import { useEditPropertyMutation } from "@/api/services/property.service";
import ErrorMessage from "@/components/shared/error-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { locationValidatorSchema } from "@/validator/new-property.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  data: any;
  propertyId: string;
}

const LocationStep: FC<IProps> = ({ data, propertyId }) => {
  const [editProperty, { isLoading: isUpdating }] = useEditPropertyMutation();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: {
        longitude: 0,
        latitude: 0,
        country: data?.location?.country,
        street: data?.location?.street,
        address: data?.location?.address,
        zipCode: data?.location?.zipCode,
        city: data?.location?.city,
      },
    },
    resolver: yupResolver(locationValidatorSchema),
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
    <div className="w-full space-y-4">
      <header>
        <h2 className="text-md font-semibold">Listing Location</h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
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
                <option value="addiss_ababa">Addiss Ababa</option>
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
              placeholder="Street Here"
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
            <Label>Subcities</Label>
            <Input
              type="text"
              className="py-6 bg-muted"
              placeholder="Bole, Yeka, Arada"
            />
            <ErrorMessage error={errors.location?.zipCode?.message} />
          </div>

          <div className="w-full flex-col gap-2">
            <Label>Neighborhood / ሰፈር</Label>
            <Input
              type="text"
              className="py-6 bg-muted"
              placeholder="4kilo, Kotebe"
            />
            <ErrorMessage error={errors.location?.zipCode?.message} />
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
            {/* <iframe
              src="https://www.google.com/maps/embed/v1/place?q=9.041343528505585,38.8315310564456"
              // src="https://www.google.com/maps/place/9.041343528505585,38.8315310564456"
              height="450"
              loading="lazy"
            ></iframe> */}
            <iframe
              src="https://www.google.com/maps/@9.0411925,38.8314627,21z?entry=ttu"
              // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15761.424821467193!2d38.82143284513998!3d9.031234106481438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b900f68a5e9d7%3A0x5abf2170fe2bd3f4!2zS290ZWJlLCDhiqDhi7LhiLUg4Yqg4Ymg4Ymj!5e0!3m2!1sam!2set!4v1718056450409!5m2!1sam!2set"
              loading="lazy"
              className="border-0 size-full"
            ></iframe>
          </div>
        </div>

        <div className="mt-2 w-full flex justify-center md:justify-end">
          <Button className="w-full sm:w-[200px]" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Location"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LocationStep;
