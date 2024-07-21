import { Separator } from "@/components/ui/separator";
import LogoCard from "../logo";
import { FilterLinks, PagesLinks } from "@/constants/links";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      // id="footer"
      className="min-h-[30vh] bg-muted"
    >
      <div className="w-full flex flex-col px-[15px] md:px-[80px] pb-6 pt-10 sm:pt-24">
        {/* First Row*/}
        <div className="flex flex-wrap gap-5 items-start justify-between">
          {/* Left */}
          <div className="flex flex-col gap-1">
            <LogoCard className="w-[110px] sm:w-[130px] " />
            <p className="text-sm font-[800] text-muted-foreground">
              Amazing property webiste for agent, buyer{" "}
              <br className="max-sm:hidden" />
              and companies for ethiopian
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-wrap max-sm:flex-col gap-x-12 gap-y-6">
            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-xl">Filter</h2>
              <div className="flex flex-col gap-1">
                {FilterLinks.map((link, idx) => (
                  <Link
                    to={link.href}
                    className="cursor-pointer text-muted-foreground hover:text-foreground transition"
                    key={link.label + idx}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-xl">Pages Links</h2>
              <div className="flex flex-col gap-1">
                {PagesLinks.map((link, idx) => (
                  <Link
                    to={link.href}
                    className="cursor-pointer text-muted-foreground hover:text-foreground transition"
                    key={link.label + idx}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-bold text-xl">Companies</h2>
              <ul className="flex flex-col gap-1">
                <li className="cursor-pointer text-muted-foreground hover:text-foreground transition">
                  Ayat Real Estate
                </li>
                <li className="cursor-pointer text-muted-foreground hover:text-foreground transition">
                  Noah Real Estate
                </li>
                <li className="cursor-pointer text-muted-foreground hover:text-foreground transition">
                  Ovid Real Estate
                </li>
                <li className="cursor-pointer text-muted-foreground hover:text-foreground transition">
                  Gift Real Estate
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-5 md:my-10 h-[2px]" />
        {/* Second Row */}
        <div className="flex max-lg:flex-col-reverse gap-5 items-center lg:items-start lg:justify-between ">
          <div>
            <p className="text-sm">
              &copy; 2024 Abyssinya Homes. All rights reserved.
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap text-muted-foreground">
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="#">YouTube</a>
          </div>
        </div>
        {/* ---====--- */}
      </div>
    </footer>
  );
};

export default Footer;
