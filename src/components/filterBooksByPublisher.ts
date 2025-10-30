import type { Book } from "../interfaces/book.types";

export const filterBooksByPublisher = (
  books: Book[],
  publisher: string,
): Book[] => {
  const filteredBooks = books.reduce((container: Array<Book>, book) => {
    if (book.publisher.toLowerCase() === publisher) {
      container.push(book);
    }
    return container;
  }, []);

  return filteredBooks;
};
