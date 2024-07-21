import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import NavigateToAgentBtn from "@/components/shared/buttons/navigate-to-agent-btn";

const AgentCard = ({ agent }: { agent: any }) => {
  return (
    <div className="md:sticky top-[110px] py-8 px-4 sm:px-8 w-full h-fit bg-background rounded-lg shadow-md border-2">
      <div className="w-full flex flex-col gap-6">
        <h2 className="text-lg font-bold">Meet Agent</h2>
        <div className="flex items-center gap-2">
          <Avatar className="size-[100px]">
            <AvatarImage src={agent?.avatar} alt="Profile picture" />
            <AvatarFallback>{agent?.fullName.at(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="font-[700]">{agent?.fullName}</h2>
            <p>{agent?.phoneNumber}</p>
            <NavigateToAgentBtn
              fullName={agent.fullName?.split(" ").join("-")}
              username={agent?.username}
            >
              <Button variant={"link"}>View profile</Button>
            </NavigateToAgentBtn>{" "}
          </div>
        </div>

        <div className="w-full flex flex-wrap justify-center">
          <div className="flex gap-4 px-2">
            {agent?.socialMedia?.telegram && (
              <a
                href={agent.socialMedia.telegram}
                target="_blank"
                className="grid place-content-center size-[40px] rounded-full group bg-muted hover:bg-telegram transition cursor-pointer"
              >
                <FaTelegram className="text-telegram text-lg group-hover:text-white transition" />
              </a>
            )}
            {agent?.socialMedia?.facebook && (
              <a
                href={agent.socialMedia.facebook}
                target="_blank"
                className="grid place-content-center size-[40px] rounded-full group bg-muted hover:bg-facebook transition cursor-pointer"
              >
                <FaFacebookF className="text-facebook text-lg group-hover:text-white transition" />
              </a>
            )}
            {agent?.socialMedia?.instagram && (
              <a
                href={agent.socialMedia.instagram}
                target="_blank"
                className="grid place-content-center size-[40px] rounded-full group bg-muted hover:bg-instagram transition cursor-pointer"
              >
                <FaInstagram className="text-instagram text-lg group-hover:text-white transition" />
              </a>
            )}
            {agent?.socialMedia?.linkedin && (
              <a
                href={agent.socialMedia.linkedin}
                target="_blank"
                className="grid place-content-center size-[40px] rounded-full group bg-muted hover:bg-telegram transition cursor-pointer"
              >
                <FaTelegram className="text-telegram text-lg group-hover:text-white transition" />
              </a>
            )}
            {agent?.socialMedia?.whatsapp && (
              <a
                href={agent.socialMedia.whatsapp}
                target="_blank"
                className="grid place-content-center size-[40px] rounded-full group bg-muted hover:bg-whatsapp transition cursor-pointer"
              >
                <FaWhatsapp className="text-whatsapp  text-lg group-hover:text-white transition" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
