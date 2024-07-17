import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";

const ImageUpload = ({
  onFileChange,
  className,
}: {
  onFileChange: any;
  className: string;
}) => {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      onFileChange(acceptedFiles);
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={twMerge(`h-full w-full ${className}`)}>
      <input {...getInputProps()} multiple accept="image/*" />
      <p>Drag 'n drop an image here, or click to select image</p>
    </div>
  );
};

export default ImageUpload;
