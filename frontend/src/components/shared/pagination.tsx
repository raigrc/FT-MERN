import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

interface PaginationCompProps {
  totalPages: number | undefined;
  currentPage: number | undefined;
}

const PaginationComp: React.FC<PaginationCompProps> = ({
  totalPages = 1,
  currentPage = 1,
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePrevious = () => {}
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevious} />
        </PaginationItem>
        <PaginationItem>
          {pages.map((page, index) => (
            <PaginationLink key={index}>{page}</PaginationLink>
          ))}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComp;
