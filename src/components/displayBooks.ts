import type { Book } from "../interfaces/book.types";
import { createBookRow } from "./createBookRow";

export const displayBooks = (el: HTMLElement, books: Book[]) => {
  el.innerHTML = "";
  for (const book of books) {
    el.appendChild(createBookRow(book));
    // el.insertAdjacentHTML("afterbegin", createBookRow(book));
  }
};
