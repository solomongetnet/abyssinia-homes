import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { MdDeleteOutline } from "react-icons/md";

const ImagesPreviewContainer = ({
  files,
  setFiles,
}: {
  files: any[];
  setFiles: Dispatch<SetStateAction<never[]>>;
}) => {
  const handleRemoveSingleFile = (fileIndex: number) => {
    const updatedFiles: any = files.filter((_, idx) => {
      return idx !== fileIndex;
    });
    setFiles(updatedFiles);
  };

  return (
    <div className="relative w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden gap-4">
      {files.map((file, idx) => (
        <div
          key={idx}
          className="relative aspect-video size-full overflow-hidden rounded-lg"
        >
          <img
            src={URL.createObjectURL(file)}
            alt={`Selected Image ${idx + 1}`}
            className="size-full outline-none border-0 object-cover"
          />
          <Button
            className="absolute top-2 right-2 text-sm cursor-pointer"
            size={"icon"}
            onClick={() => handleRemoveSingleFile(idx)}
          >
            <MdDeleteOutline className="text-2xl" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ImagesPreviewContainer;
