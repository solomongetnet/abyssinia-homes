import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useAuth from "@/hooks/use-auth";
import {
  useRemoveProfileAvatarMutation,
  useUpdateProfileAvatarMutation,
} from "@/api/services/profile.service";
import { useToast } from "@/components/ui/use-toast";

const AvatarContainer = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [updateAvatar, { isLoading: isUpdating }] =
    useUpdateProfileAvatarMutation();

  const [removeAvatar, { isLoading: isRemoving }] =
    useRemoveProfileAvatarMutation();

  const handleFileChange = (e: any) => {
    const file = e?.target?.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const res = await updateAvatar(formData).unwrap();
      setSelectedFile("");
      toast({
        title: res.message,
      });
    } catch (error) {
      toast({
        title: "Unsuccessfull",
        variant: "destructive",
      });
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      const res = await removeAvatar().unwrap();
      setSelectedFile("");
      toast({
        title: res.message,
      });
    } catch (error) {
      toast({
        title: "Unsuccessfull",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setSelectedFile("");
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-[700] text-lg">Avatar Setting</h2>
      <div className="flex items-center gap-2">
        <Avatar
          className={`size-[80px] md:size-[100px] ${
            isUpdating && "opacity-60"
          }`}
        >
          <AvatarImage
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : user?.avatar && user.avatar
            }
          />
          <AvatarFallback>{user?.fullName?.at(0)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col ml-3">
          {!selectedFile && (
            <div className="flex flex-col text-center w-full text-full">
              <label
                htmlFor="avatar-image-selector"
                className="text-sm text-primary cursor-pointer"
              >
                Select From Your File
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="avatar-image-selector"
                hidden
              />
              {user?.avatar &&
                (isRemoving ? (
                  <span>Removing...</span>
                ) : (
                  <span
                    onClick={handleRemoveAvatar}
                    className="cursor-pointer text-sm"
                  >
                    remove avatar
                  </span>
                ))}
            </div>
          )}
          {selectedFile && (
            <div className="space-x-2 sm:w-[200px]">
              <Button
                disabled={isUpdating}
                className="py-2"
                onClick={handleUpload}
              >
                {isUpdating ? "Uploading..." : "Upload"}
              </Button>
              <Button
                disabled={isUpdating}
                variant={"ghost"}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvatarContainer;
