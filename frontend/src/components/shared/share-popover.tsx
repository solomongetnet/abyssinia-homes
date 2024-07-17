import { FC, useState } from "react";
import { Copy, Share2, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  FaFacebookF,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa6";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface IProps {
  url: string;
}
const SharePopover: FC<IProps> = ({ url }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Telegram share URL
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent("Abyssinia homes")}`;

  // Facebook share URL
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;

  // WhatsApp share URL
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    url
  )}`;

  const handleClosePopover: () => void = () => {
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <button className="border rounded-sm px-2 py-2 h-full hover:bg-muted transition cursor-pointer">
          <Share2 className="w-[20px] text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-md:ml-3 w-[250px] flex flex-col">
        <header className="w-full flex justify-between items-center">
          <h2 className="text-md font-[700]">Share</h2>
          <span
            className="rounded-full hover:bg-muted transition size-[30px] grid place-content-center cursor-pointer"
            onClick={handleClosePopover}
          >
            <X className="w-[15px]" />
          </span>
        </header>

        <main className="w-full flex flex-col gap-6">
          <div className="pt-6 grid grid-cols-4 gap-3">
            <a
              target="_blank"
              href={facebookUrl}
              className="grid place-content-center w-full aspect-square rounded-full group bg-muted hover:bg-facebook transition cursor-pointer"
            >
              <FaFacebookF className="text-facebook text-xl group-hover:text-white transition" />
            </a>

            <a
              target="_blank"
              href={whatsappUrl}
              className="grid place-content-center w-full aspect-square rounded-full group bg-muted hover:bg-telegram transition cursor-pointer"
            >
              <FaTelegram className="text-telegram text-xl group-hover:text-white transition" />
            </a>

            <a
              target="_blank"
              href={telegramUrl}
              className="grid place-content-center w-full aspect-square rounded-full group bg-muted hover:bg-whatsapp transition cursor-pointer"
            >
              <FaWhatsapp className="text-whatsapp  text-xl group-hover:text-white transition" />
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-sm">Copy Link</h2>
            <div className="w-full flex items-center gap-2 p-1 border rounded-md">
              <a
                className="flex-1 overflow-x-hidden line-clamp-1 cursor-pointer"
                href={url}
                target="_blank"
              >
                {url}
              </a>
              <Button size={"icon"} variant={"outline"}>
                <Copy />
              </Button>
            </div>
          </div>
        </main>
      </PopoverContent>
    </Popover>
  );
};

export default SharePopover;
