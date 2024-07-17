import LogoutButton from "@/components/shared/buttons/logout-btn";
import { ReactNode } from "react";
import { CiHeart, CiLogout, CiUser,  } from "react-icons/ci";
import { LuPackage2 } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type Tlinks = {
  href: string;
  label: string;
  icon: ReactNode;
};

const links: Tlinks[] = [
  {
    href: "/account/my-favorites",
    label: "Favorites",
    icon: <CiHeart className="text-xl" />,
  },
  {
    href: "/account/my-profile",
    label: "My Profile",
    icon: <CiUser className="text-xl" />,
  },
  {
    href: "/subscription",
    label: "Subscription",
    icon: <LuPackage2 className="text-xl" />,
  },
];

const UserSidebar = ({ className }: { className?: string }) => {
  return (
    <aside className={twMerge(`z-30 border-r-2 ${className}`)}>
      <div className="w-full">
        <div className="w-full flex flex-col gap-4">
          {links.map(({ label, href, icon }, idx) => (
            <NavLink
              key={idx}
              to={href}
              className="account-link overflow-hidden relative px-6 py-3 flex items-center gap-2 cursor-pointer"
            >
              {icon}
              <span className="text-lg">{label}</span>
              <span className="account-link-indicator hidden absolute h-full w-[4px] top-0 bottom-0 right-0 transition bg-primary rounded-tl-full rounded-bl-full " />
            </NavLink>
          ))}

          <LogoutButton
            className="flex justify-start text-start px-6 py-3  gap-2 cursor-pointer"
            variant={"ghost"}
          >
            <CiLogout className="text-xl" />
            <span className="text-lg">logout</span>
          </LogoutButton>
        </div>
      </div>
    </aside>
  );
};

export default UserSidebar;
