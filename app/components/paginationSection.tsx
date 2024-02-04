"use client"

import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";

const PaginationSection = ({
    totalItems,
    itemsPerPage,
    currentPage,
    setCurrentPage,
  }: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    setCurrentPage: any;
  }) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pages.push(i);
    }
  
    const handleNextPage = () => {
      if (currentPage < pages.length) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
    return (
      <>
        {totalItems > itemsPerPage ? (
          <Pagination>
            <PaginationContent>
              <PaginationItem className="cursor-pointer">
                <PaginationPrevious onClick={handlePrevPage} />
              </PaginationItem>
              {pages.map((page, index) => (
                <PaginationItem
                  key={index}
                  className={`cursor-pointer ${
                    currentPage === page ? "bg-neutral-200 rounded" : ""
                  }`}
                >
                  <PaginationLink onClick={() => setCurrentPage(page)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem className="cursor-pointer">
                <PaginationNext onClick={handleNextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ) : null}
      </>
    );
}

export default PaginationSection