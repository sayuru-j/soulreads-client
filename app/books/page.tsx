import React from "react";
import Header from "../components/Header";
import RecommendedBooks from "../components/RecommendedBooks";

const BooksPage = () => {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden px-6">
      <Header />
      <RecommendedBooks />
    </div>
  );
};

export default BooksPage;
