import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateSocialMediaMutation } from "@/api/services/profile.service";
import { SocialMediaValidationSchema } from "@/validator/profile.schema";
import useAuth from "@/hooks/use-auth";

const SocialMediaContainer = () => {
  const { toast } = useToast();
  const { isLoading: isUserLoading, user } = useAuth();
  const [updateSocialMedia, { isLoading: isUpdating }] =
    useUpdateSocialMediaMutation();
  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(SocialMediaValidationSchema),
    values: {
      telegram: user?.socialMedia?.telegram,
      whatsapp: user?.socialMedia?.whatsapp,
      instagram: user?.socialMedia?.instagram,
      facebook: user?.socialMedia?.facebook,
    },
  });

  const onSubmit: (data: any) => void = async (data: any) => {
    try {
      const res: { message: string } = await updateSocialMedia(data).unwrap();
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
    <form className="w-full space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-[700] text-lg">SocialMedia Links</h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full flex flex-col gap-2">
          <Label>Facebook</Label>
          <Input
            placeholder="Facebook Link"
            {...register("facebook")}
            disabled={isUpdating || isUserLoading}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Telegram</Label>
          <Input
            placeholder="Telegram Link"
            {...register("telegram")}
            disabled={isUpdating || isUserLoading}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Instagram</Label>
          <Input
            placeholder="Instagram Link"
            {...register("instagram")}
            disabled={isUpdating || isUserLoading}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Whatsapp</Label>
          <Input
            placeholder="Whatsapp Link"
            {...register("whatsapp")}
            disabled={isUpdating || isUserLoading}
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button className="w-fit" disabled={isUpdating || isUserLoading}>
        {isUpdating ? "Loading..." : "Update Social Media"}
      </Button>
    </form>
  );
};

export default SocialMediaContainer;
