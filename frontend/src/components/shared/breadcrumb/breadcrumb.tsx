import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadcrumbM = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x !== "");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <div>
            <Link to="/">Home</Link>
          </div>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <div
              className="flex items-center"
              key={value + index + Math.floor(Math.random() * 30000)}
            >
              {isLast ? (
                <>
                  {pathnames.length === 2 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {value.length > 10 ? value.slice(0, 10) + "..." : value}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              ) : (
                <div>
                  <Link to={to}>{value}</Link>
                </div>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbM;
