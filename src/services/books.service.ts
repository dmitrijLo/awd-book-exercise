import type { Book, BookWithDetails } from "../interfaces/book.types";

const URL = "http://localhost:4730";
const ROUTES = {
  books: "books",
  byTitle: "?title_like=",
  byPublisher: "?publisher_like=",
};

export const getBooksByTitle = async (
  bookTitle: string,
  callbackFn: CallableFunction = () => {},
) => {
  const { books, byTitle } = ROUTES;
  const response = await fetch(`${URL}/${books}${byTitle}${bookTitle}`);
  const data: Book[] = await response.json();

  callbackFn(data);
};

export const getBookDetails = async (
  isbn: string,
  // callbackFn: CallableFunction = () => {},
): BookWithDetails[] => {
  const { books } = ROUTES;
  const response = await fetch(`${URL}/${books}/${isbn}`);
  const data: BookWithDetails[] = await response.json();

  return data;
  // callbackFn(data);
};
