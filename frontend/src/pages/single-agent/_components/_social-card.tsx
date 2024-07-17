import {
  FaFacebookF,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa6";

const SocialCard = ({ socialMedia }: { socialMedia: any }) => {
  return (
    <div className="w-full h-fit p-4 flex flex-col gap-4 shadow-lg rounded-md border">
      <header>
        <h2 className="font-bold text-xl">Social Links</h2>
      </header>

      <div className="w-full flex flex-wrap">
        <div className="flex gap-4 px-2">
          {socialMedia?.telegram && (
            <a
              href={socialMedia.telegram}
              target="_blank"
              className="grid place-content-center size-[40px] rounded-full group bg-muted hover:bg-telegram transition cursor-pointer"
            >
              <FaTelegram className="text-telegram text-lg group-hover:text-white transition" />
            </a>
          )}
          {socialMedia?.facebook && (
            <a
              href={socialMedia.facebook}
              target="_blank"
              className="grid place-content-center size-[40px] rounded-full group bg-muted hover:bg-facebook transition cursor-pointer"
            >
              <FaFacebookF className="text-facebook text-lg group-hover:text-white transition" />
            </a>
          )}
          {socialMedia?.instagram && (
            <a
              href={socialMedia.instagram}
              target="_blank"
              className="grid place-content-center size-[40px] rounded-full group bg-muted hover:bg-instagram transition cursor-pointer"
            >
              <FaInstagram className="text-instagram text-lg group-hover:text-white transition" />
            </a>
          )}
          {socialMedia?.linkedin && (
            <a
              href={socialMedia.linkedin}
              target="_blank"
              className="grid place-content-center size-[40px] rounded-full group bg-muted hover:bg-telegram transition cursor-pointer"
            >
              <FaTelegram className="text-telegram text-lg group-hover:text-white transition" />
            </a>
          )}
          {socialMedia?.whatsapp && (
            <a
              href={socialMedia.whatsapp}
              target="_blank"
              className="grid place-content-center size-[40px] rounded-full group bg-muted hover:bg-whatsapp transition cursor-pointer"
            >
              <FaWhatsapp className="text-whatsapp  text-lg group-hover:text-white transition" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialCard;
