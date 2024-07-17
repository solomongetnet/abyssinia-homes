import { Button } from "@/components/ui/button";
import { FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

interface IProps {
  totalPages: number;
  currentPage: number;
  onPageChange: any;
  className?: string;
}
const Pagination: FC<IProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  className,
}) => {
  const pages = [];
  const maxPagesToShow = 3;
  const isStart = currentPage <= Math.ceil(maxPagesToShow / 2);
  const isEnd = currentPage >= totalPages - Math.floor(maxPagesToShow / 2);

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else if (isStart) {
    for (let i = 1; i <= maxPagesToShow; i++) {
      pages.push(i);
    }
    pages.push("...");
    pages.push(totalPages);
  } else if (isEnd) {
    pages.push(1);
    pages.push("...");
    for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    pages.push("...");
    for (
      let i = currentPage - Math.floor(maxPagesToShow / 2);
      i <= currentPage + Math.floor(maxPagesToShow / 2);
      i++
    ) {
      pages.push(i);
    }
    pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className={twMerge(`flex justify-center mt-8 ${className}`)}>
      <nav className="flex flex-wrap gap-2">
        {currentPage > 1 && (
          <Button
            variant={"ghost"}
            onClick={() => onPageChange(currentPage - 1)}
            className="text-md flex items-center gap-1"
          >
            <FaChevronLeft />
            <span className="text-xs hidden md:block">Previous</span>
          </Button>
        )}
        {pages.map((page, index) => (
          <Button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={`px-4 py-2 rounded-md 
            ${typeof page !== "number" && "font-[900] text-lg"}`}
            disabled={typeof page !== "number"}
            variant={page === currentPage ? "default" : "ghost"}
          >
            {page}
          </Button>
        ))}
        {currentPage < totalPages && (
          <Button
            variant={"ghost"}
            onClick={() => onPageChange(currentPage + 1)}
            className="text-md flex items-center gap-1"
          >
            <span className="text-xs hidden md:block">Next</span>
            <FaChevronRight />
          </Button>
        )}
      </nav>
    </div>
  );
};

export default Pagination;
