"use client";

import React, { useEffect, useState } from "react";
import { getRecommendedBooksList } from "../services/books";
import { loadDiagnosis } from "../services/diagnose";
import { BookInfoBrief } from "../@types";
import BookList from "./BookList";

const RecommendedBooks = () => {
  const [recommendedBookList, setRecommendedBookList] =
    useState<BookInfoBrief[]>();
  const [currentPage, setCurrentPage] = useState({
    start: 0,
    end: 10,
  });

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const { state } = loadDiagnosis();

        if (state) {
          const data = await getRecommendedBooksList(state);
          setRecommendedBookList(data.recommended_books);
        }
      } catch (err) {
        console.log("Error fetching recommended books:", err);
      }
    };

    fetchRecommendedBooks();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-4">
      <BookList
        books={
          recommendedBookList?.slice(currentPage.start, currentPage.end) || []
        }
      />

      <div className="flex items-center gap-4 my-4 justify-center font-semibold">
        <button
          type="button"
          className="bg-[#da4363] py-2 px-6 text-white rounded-md"
          onClick={() => {
            if (currentPage.start > 0) {
              setCurrentPage((prevData) => ({
                start: prevData.start - 10,
                end: prevData.end - 10,
              }));
            }
          }}
        >
          Previous
        </button>
        <button
          type="button"
          className="bg-[#da4363] py-2 px-6 text-white rounded-md"
          onClick={() => {
            if (
              currentPage.end <
              (recommendedBookList ? recommendedBookList.length : 0)
            ) {
              setCurrentPage((prevData) => ({
                start: prevData.start + 10,
                end: prevData.end + 10,
              }));
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecommendedBooks;
