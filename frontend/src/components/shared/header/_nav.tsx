import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Nav = ({ className }: { className?: string }) => {
  return (
    <nav className={twMerge(`header-nav relative ${className}`)}>
      <NavLink
        to={"/"}
        className="header-nav-link relative text-md cursor-pointer "
      >
        Home
      </NavLink>
      <NavLink
        to={"/properties"}
        className="header-nav-link relative text-md cursor-pointer"
      >
        Properties
      </NavLink>
      <NavLink
        to={"/agents"}
        className="header-nav-link relative text-md cursor-pointer"
      >
        Agents
      </NavLink>
      <NavLink
        to={"/nearby"}
        className="header-nav-link relative text-md cursor-pointer"
      >
        Nearby
      </NavLink>
      <NavLink
        to={"/subscription"}
        className="header-nav-link relative text-md cursor-pointer"
      >
        Subscription
      </NavLink>
    </nav>
  );
};

export default Nav;
