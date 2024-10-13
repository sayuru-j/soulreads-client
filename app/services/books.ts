import { BookInfo, State } from "../@types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getRecommendedBooksList = async (
  state: State,
  modelName?: string
) => {
  try {
    const reqUrl = modelName
      ? `${API_URL}/get-recommended-books/${state}?model_name=${modelName}`
      : `${API_URL}/get-recommended-books/${state}`;

    const reqInit: RequestInit = {
      method: "GET",
    };
    const response = await fetch(reqUrl, reqInit);

    return response.ok ? await response.json() : undefined;
  } catch (error) {
    console.log(error);
  }
};

export const getBookInfo = async (
  title: string
): Promise<BookInfo | undefined> => {
  try {
    // URL encode the title to handle special characters properly
    const encodedTitle = encodeURIComponent(title);
    const reqUrl = `${API_URL}/get-book-details?title=${encodedTitle}`;

    const reqInit: RequestInit = {
      method: "GET",
    };

    const response = await fetch(reqUrl, reqInit);

    if (!response.ok) {
      // Throw an error if the request fails
      throw new Error(`Error fetching book info: ${response.statusText}`);
    }

    const data = await response.json();
    return data.book_details;
  } catch (error) {
    console.error("Failed to fetch book details:", error);
    return undefined; // Return undefined if there's an error
  }
};
