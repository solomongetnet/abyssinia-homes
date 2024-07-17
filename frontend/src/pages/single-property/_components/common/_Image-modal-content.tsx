import { FC } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

interface IProps {
  images: string[];
  closeModal: any;
}

const ImageModalContent: FC<IProps> = ({ images, closeModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentImage = Number(searchParams.get("currentImage") || "1");

  const handlePrev = () => {
    if (currentImage > 0) {
      setSearchParams((prev) => {
        prev.set("currentImage", (currentImage - 1).toString());
        return prev;
      });
    }
  };
  const handleNext = () => {
    if (currentImage >= images.length - 1) {
      return;
    }
    setSearchParams((prev) => {
      prev.set("currentImage", (currentImage + 1).toString());
      return prev;
    });
  };

  return (
    <>
      <header className="z-20 flex justify-between items-center fixed top-0 right-0 left-0 w-full h-[50px] max-md:px-[20px] px-[60px] py-4 bg-background/80">
        <div>
          {currentImage + 1}/{images.length}
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handlePrev}>Previous</Button>
          <Button onClick={handleNext}>Next</Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="cursor-pointer" onClick={closeModal}>
            <X />
          </span>
        </div>
      </header>

      <main className="flex justify-center items-center h-full sm:px-[60px]">
        <div className="">
          <div className="overflow-hidden h-full">
            <img
              src={images.at(currentImage)}
              alt="Property image 1"
              className="max-h-[full] max-w-[full]"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default ImageModalContent;
