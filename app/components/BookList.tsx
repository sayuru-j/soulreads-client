"use client";

import React, { useEffect, useState } from "react";
import { BookInfo, BookInfoBrief } from "../@types";
import { getBookInfo } from "../services/books";
import Image from "next/image";
import { motion } from "framer-motion";
import { getFromCache, setInCache } from "../utils/cache";

type BookListProps = {
  books: BookInfoBrief[];
};

const BookList: React.FC<BookListProps> = ({ books }) => {
  const [firstBookInfo, setFirstBookInfo] = useState<BookInfo | undefined>(
    undefined
  );
  const [remainingBookInfos, setRemainingBookInfos] = useState<BookInfo[]>([]);
  const [loadingFirstBook, setLoadingFirstBook] = useState<boolean>(false);
  const [loadingRemainingBooks, setLoadingRemainingBooks] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchFirstBook = async () => {
      if (books.length > 0) {
        const bookTitle = books[0].title;

        setLoadingFirstBook(true);
        try {
          // Try to get from cache first (type-safe as BookInfo)
          let firstBook = getFromCache<BookInfo>(bookTitle);
          if (!firstBook) {
            firstBook = await getBookInfo(bookTitle);
            if (firstBook) {
              setInCache<BookInfo>(bookTitle, firstBook); // Store in cache
            }
          }
          setFirstBookInfo(firstBook);
        } catch (error) {
          console.log("Error fetching the first book info:", error);
        } finally {
          setLoadingFirstBook(false);
        }
      }
    };

    const fetchRemainingBooks = async () => {
      if (books.length > 1) {
        setLoadingRemainingBooks(true);
        try {
          const fetchedBooks = await Promise.all(
            books.slice(1).map(async (book) => {
              const bookTitle = book.title;
              let cachedBook = getFromCache<BookInfo>(bookTitle);
              if (!cachedBook) {
                cachedBook = await getBookInfo(bookTitle);
                if (cachedBook) {
                  setInCache<BookInfo>(bookTitle, cachedBook); // Store in cache
                }
              }
              return cachedBook;
            })
          );

          const validBooks = fetchedBooks.filter(
            (bookInfo): bookInfo is BookInfo => bookInfo !== undefined
          );
          setRemainingBookInfos(validBooks);
        } catch (error) {
          console.log("Error fetching the remaining books:", error);
        } finally {
          setLoadingRemainingBooks(false);
        }
      }
    };

    fetchFirstBook();
    fetchRemainingBooks();
  }, [books]);

  return (
    <>
      {books.length > 0 ? (
        <div className="flex flex-col">
          {/* Display the first book */}
          <motion.div
            className="flex max-w-xl mx-auto py-6 gap-6 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {loadingFirstBook ? (
              <div className="animate-pulse">Loading...</div>
            ) : (
              firstBookInfo && (
                <>
                  <div className="w-full flex flex-col md:flex-row p-4 gap-4 items-center">
                    <div className="w-[300px] md:w-1/2">
                      {firstBookInfo?.image_url ? (
                        <div className="relative">
                          <Image
                            className="rounded-md shadow-md w-[300px] h-[400px] object-cover"
                            src={firstBookInfo?.image_url}
                            width={300}
                            height={400}
                            alt={"Image of " + firstBookInfo?.title}
                          />
                          <div className="w-full h-full bg-black/50 hover:bg-transparent absolute top-0 rounded-md transition-all duration-300 ease-in-out" />
                        </div>
                      ) : (
                        <div>No image available</div>
                      )}
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col md:items-start items-center justify-start h-full relative gap-2">
                      <div className="flex flex-col justify-between h-full">
                        <div className="flex flex-col gap-3">
                          <h2 className="text-2xl font-semibold text-black">
                            {firstBookInfo?.title}
                          </h2>
                          <h2 className="flex gap-1 flex-wrap items-start font-semibold text-black/60">
                            By{" "}
                            {firstBookInfo?.authors.map((auth, index) => (
                              <span key={index}>
                                {auth.trim()}
                                {index === firstBookInfo.authors.length - 1
                                  ? ""
                                  : ","}
                              </span>
                            ))}
                          </h2>

                          <h2 className="overflow-hidden text-ellipsis h-[170px] line-clamp-4">
                            {firstBookInfo?.description}
                          </h2>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          className="bg-[#da4363] py-2 px-6 max-w-32 w-full rounded-full text-white font-semibold"
                        >
                          Read
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </>
              )
            )}
          </motion.div>

          {/* Display the remaining books */}
          <motion.div
            className="flex flex-wrap max-w-7xl mx-auto py-6 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {loadingRemainingBooks ? (
              <div className="animate-pulse">Loading remaining books...</div>
            ) : (
              remainingBookInfos.map((bookInfo, index) => (
                <motion.div
                  key={index}
                  className="flex relative flex-col items-center justify-between bg-gradient-to-r from-rose-100 to-teal-100 p-4 rounded-lg shadow-md w-full max-w-[300px] sm:w-1/2 lg:w-1/4 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex flex-col gap-2 justify-start items-center">
                    {/* Book Image */}
                    <div className="relative w-full mb-4 flex items-center justify-center">
                      {bookInfo?.image_url ? (
                        <Image
                          className="rounded-md shadow-md w-[200px] h-[300px] object-cover"
                          src={bookInfo.image_url}
                          width={200}
                          height={300}
                          alt={"Image of " + bookInfo.title}
                        />
                      ) : (
                        <Image
                          className="rounded-md shadow-md w-[200px] h-[300px] object-cover"
                          src="/placeholder.png" // Local placeholder
                          width={200}
                          height={300}
                          alt="Placeholder"
                        />
                      )}
                    </div>

                    {/* Book Title */}
                    <h2 className="text-xl font-semibold text-black text-center mb-2">
                      {bookInfo?.title}
                    </h2>

                    {/* Book Authors */}
                    <h3 className="flex text-center gap-1 flex-wrap items-start font-semibold text-black/60 mb-4">
                      By{" "}
                      {bookInfo?.authors.map((auth, index) => (
                        <span key={index}>
                          {auth.trim()}
                          {index === bookInfo.authors.length - 1 ? "" : ","}
                        </span>
                      ))}
                    </h3>
                  </div>

                  {/* Read Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    className="bg-[#da4363] py-2 px-6 max-w-32 w-full rounded-full text-white font-semibold"
                  >
                    Read
                  </motion.button>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      ) : (
        <div>Looks like there&apos;s no books</div>
      )}
    </>
  );
};

export default BookList;
