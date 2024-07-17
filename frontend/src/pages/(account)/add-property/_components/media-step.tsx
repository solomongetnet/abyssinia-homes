import { FC, useState } from "react";
import ImageUpload from "./common/_image-uploader-dropzone";
import ImagesPreviewContainer from "./common/_images-preview-container";
import { Button } from "@/components/ui/button";
import { useCreatePropertyMutation } from "@/api/services/property.service";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux.hooks";
import {
  resetPropertyForm,
  updatePropertyForm,
} from "@/store/slices/property.slices";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IProps {
  prevStep: () => void;
}

const frame = () => {
  const duration = 4 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};

const MediaStep: FC<IProps> = ({ prevStep }) => {
  const [createProperty, { isLoading: isSubmitting }] =
    useCreatePropertyMutation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const propertyData = useAppSelector((state) => state.property.propertyForm);
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState([]);

  const handleFileChange = (_files: any) => {
    setFiles(Array.from(_files));
  };

  const handlePrevBtn = () => {
    prevStep();
  };

  const handleVideoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const videoUrl = event.target.value;
    dispatch(
      updatePropertyForm({
        videoUrl: videoUrl,
      })
    );
  };

  const handleSubmitProperty = async () => {
    if (files.length === 0) {
      toast({
        title: "Invalid",
        description: "Please Select Images Before Sumbit Property",
      });
      return;
    }
    const formData = new FormData();

    // Converting Property Data to string then append in form data
    formData.append("data", JSON.stringify(propertyData));
    for (const file of files) {
      formData.append("images", file);
    }

    try {
      const res: { message: string } = await createProperty(formData).unwrap();
      toast({
        title: "Success",
        description: res.message,
        duration: 4000,
      });

      // Calling Confetti
      frame();

      // Removing form value from localstorage and from states
      dispatch(resetPropertyForm());
      navigate("/account/my-properties");
    } catch (error: any) {
      toast({
        title: "Error while publish your property",
        description: error?.data.message,
      });
    }
  };

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-md font-semibold">Property Media</h2>
      </header>

      <div className="flex flex-col gap-4">
        <div className="w-full flex-col gap-2">
          <Label>Youtube Url</Label>
          <Input
            onChange={handleVideoUrlChange}
            className="py-6 bg-muted"
            placeholder="https://youtube.com/...."
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Label>Images</Label>
            <h2 className="text-sm">
              {files.length > 0
                ? `Selected Image ${files.length}`
                : "No Selected Images"}
            </h2>
          </div>

          <div className="w-full min-h-[200px] p-2 rounded-md bg-muted">
            <ImageUpload
              onFileChange={handleFileChange}
              className="text-center min-h-[200px] flex items-center justify-center cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        {files.length > 0 && (
          <ImagesPreviewContainer files={files} setFiles={setFiles} />
        )}
      </div>

      <footer className="mt-4 w-full flex max-md:flex-col md:justify-between">
        <Button
          onClick={handlePrevBtn}
          variant={"outline"}
          className="w-full sm:w-[200px]"
        >
          Previous
        </Button>

        <Button
          onClick={handleSubmitProperty}
          className="w-full sm:w-[200px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading.." : "Submit Property"}
        </Button>
      </footer>
    </div>
  );
};

export default MediaStep;
