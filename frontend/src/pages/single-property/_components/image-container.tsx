import { FC } from "react";
import ImageModalContent from "./common/_Image-modal-content";
import Modal from "@/components/ui/modal";
import { useSearchParams } from "react-router-dom";

interface IProps {
  images: string[];
}

const ImageContainer: FC<IProps> = ({ images }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isImagesModalOpen =
    searchParams.get("isImagesModalOpen") === "true" ? true : false;

  const openModal = (selectedIdx: number) => {
    setSearchParams((prev) => {
      prev.append("currentImage", selectedIdx?.toString());
      return prev;
    });
    setSearchParams((prev) => {
      prev.append("isImagesModalOpen", "true");
      return prev;
    });
  };
  const closeModal = () => {
    setSearchParams((prev) => {
      prev.delete("isImagesModalOpen");
      prev.delete("currentImage");
      return prev;
    });
  };

  return (
    <div className="flex flex-col gap-5 h-fit">
      <div
        className={`h-[70vh] grid ${
          images.length === 1
            ? "grid-rows-[100%] max-md:h-[40vh]"
            : "max-sm:grid-rows-[70%,30%] sm:grid-cols-[70%,30%]"
        } gap-2 rounded-lg overflow-hidden `}
      >
        {/* Big Image */}
        <div className="relative size-full cursor-pointer overflow-hidden ">
          <img
            onClick={() => openModal(0)}
            src={images[0]}
            alt="Property image 1"
            className="size-full object-cover "
          />
        </div>

        {/* Small Images */}
        <div className="flex sm:flex-col gap-2">
          {images.map((img, idx) => {
            if (idx === 0 || idx > 2) return;
            return (
              <div
                className="flex-1 cursor-pointer overflow-hidden"
                key={img + idx.toString()}
              >
                <img
                  onClick={() => openModal(idx)}
                  src={img}
                  alt={`Propery Image ${idx + 2}`}
                  className="size-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full flex justify-center">
        {images.length > 1 && (
          <div
            onClick={() => openModal(0)}
            className={`flex gap-1 text-sm items-center px-3 py-2 border cursor-pointer hover:bg-muted transition rounded-sm`}
          >
            View more Images
          </div>
        )}
        <Modal
          isOpen={isImagesModalOpen}
          onClose={closeModal}
          containerClassName="p-0"
          modalClassName="h-screen w-screen"
        >
          <ImageModalContent images={images} closeModal={closeModal} />
        </Modal>
      </div>
    </div>
  );
};

export default ImageContainer;
