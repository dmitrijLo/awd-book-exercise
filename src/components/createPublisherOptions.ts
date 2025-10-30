import type { Book } from "../interfaces/book.types";

export const createPublisherOptions = (
  el: HTMLElement,
  books: Book[],
  selected = "-",
): void => {
  const publishers = [...new Set(books.map(({ publisher }) => publisher))];
  const options = `${publishers.reduce((acc, currPub) => `${acc}<option ${currPub.toLowerCase() === selected ? "selected" : ""} value="${currPub.toLowerCase()}">${currPub}</option>`, '<option value="-">-</option>')}`;

  el.innerHTML = "";
  el.insertAdjacentHTML("afterbegin", options);
};
