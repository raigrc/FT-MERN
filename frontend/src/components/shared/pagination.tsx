import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

interface PaginationCompProps {
  totalPages: number | undefined;
  currentPage: number | undefined;
  setPage: (page: number) => void;
}

const PaginationComp: React.FC<PaginationCompProps> = ({
  totalPages = 1,
  currentPage = 1,
  setPage,
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };
  const handleClick = (page: number) => {
    setPage(page);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage === 1 ? "cursor-not-allowed text-gray-400" : ""
            }
            onClick={handlePrevious}
          />
        </PaginationItem>
        <PaginationItem>
          {pages.map((page, index) => (
            <PaginationLink key={index} onClick={() => handleClick(page)}>
              {page}
            </PaginationLink>
          ))}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={
              currentPage === totalPages
                ? "cursor-not-allowed text-gray-400"
                : ""
            }
            onClick={handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComp;
