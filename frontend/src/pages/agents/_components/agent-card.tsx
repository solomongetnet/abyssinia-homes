import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdAlternateEmail, MdVerified } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa6";
import { IUser } from "@/interface/user.interface";
import { FC } from "react";
import NavigateToAgentBtn from "@/components/shared/buttons/navigate-to-agent-btn";

interface IProps {
  agent: IUser;
}

const AgentCard: FC<IProps> = ({ agent }) => {

  return (
    <div className="w-full p-4 sm:p-6 shadow-sm border h-fit  rounded-lg">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex lg:items-center max-lg:flex-col max-lg:justify-center gap-10">
          {/* Left Avatar Container */}
          <div className="flex items-center gap-2">
            <Avatar className="size-[90px] sm:size-[150px]">
              <AvatarImage src={agent.avatar} />
              <AvatarFallback>
                {agent.fullName && agent?.fullName.at(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col lg:hidden">
              <div className="flex items-center gap-1">
                <MdVerified className="text-lg text-facebook" />
                <h2 className="font-[700] text-lg">{agent.fullName}</h2>
              </div>
              <p className="font-[100] text-sm">
                {agent.properties ? agent.properties.length : 0} Properties
              </p>
            </div>
          </div>

          {/* Right Detail Container */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col max-lg:hidden">
              <div className="flex items-center gap-1">
                <MdVerified className="text-lg text-facebook" />
                <h2 className="font-[700] text-lg">{agent.fullName}</h2>
              </div>
              <p className="font-[100] text-sm">
                {agent.properties ? agent.properties.length : 0} Properties
              </p>{" "}
            </div>

            <div className="px-2 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
              <div className="flex items-center gap-3 group cursor-pointer ">
                <span className="size-[40px] grid place-content-center bg-muted group-hover:bg-primary transition rounded-full ">
                  <CiPhone className="text-xl group-hover:text-white " />
                </span>

                <div className="flex flex-col">
                  <h2 className="text-sm font-bold">Phone</h2>
                  <p className="text-sm">{agent.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 group cursor-pointer ">
                <span className="size-[40px] grid place-content-center bg-muted group-hover:bg-primary transition rounded-full ">
                  <CiPhone className="text-xl group-hover:text-white" />
                </span>

                <div className="flex flex-col">
                  <h2 className="text-sm font-bold">Office</h2>
                  <p className="text-sm">{agent.officeNumber || "_"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 group cursor-pointer ">
                <span className="size-[40px] grid place-content-center bg-muted group-hover:bg-primary transition rounded-full ">
                  <MdAlternateEmail className="text-xl group-hover:text-white" />
                </span>

                <div className="w-full flex flex-col">
                  <h2 className="text-sm font-bold">Email</h2>
                  <p className="text-sm  break-words whitespace-normal overflow-hidden">{agent.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Social Links And Some Action */}
        <div className="w-full flex justify-between gap-2 max-md:flex-col items-center">
          <div className="pt-6 flex flex-wrap gap-2">
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

          <div className="max-md:w-full text-center">
            <NavigateToAgentBtn
              fullName={agent.fullName?.split(" ").join("-")}
              username={agent?.username}
            >
              <span className="max-md:w-full text-md hover:text-primary hover:underline underline-offset-2 transition">
                View profile
              </span>
            </NavigateToAgentBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
