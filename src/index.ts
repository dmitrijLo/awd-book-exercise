import { createPublisherOptions } from "./components/createPublisherOptions";
import { getBooksByTitle } from "./services/books.service";
import { filterBooksByPublisher } from "./components/filterBooksByPublisher";
import { displayBooks } from "./components/displayBooks";
import type { Book } from "./interfaces/book.types";

type Publisher = string;

// interface UserSelection {
//   books: Book[];
//   selected: Publisher;
// }

const booksSelection: Book[] = [];

const notify = (newBooksSelection: Book[], selected: Publisher = "-") => {
  if (!bookTable || !selectPublisher) return;
  booksSelection.length = 0;
  booksSelection.push(...newBooksSelection);

  displayBooks(bookTable, booksSelection);
  createPublisherOptions(selectPublisher, booksSelection, selected);

  sessionStorage.setItem("booksSelection", JSON.stringify(newBooksSelection));
  sessionStorage.setItem("selectedPublisher", JSON.stringify(selected));
};

const buttonEventHandler = () => {
  console.log("click");
};

const inputEventHandler = () => {
  let debounceTimerId: ReturnType<typeof setTimeout>;

  return function (e: Event) {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    clearTimeout(debounceTimerId);
    debounceTimerId = setTimeout(getBooksByTitle, 1000, value, notify);
    sessionStorage.setItem("searchValue", value);
  };
};

const selectOptionEventHandler = (booksSelection: Book[]) => {
  let selected = "-";
  const booksCache: Array<Book> =
    JSON.parse(sessionStorage.getItem("booksCache") as string) || [];
  return function (e: Event) {
    if (!selectPublisher) return;
    const target = e.target as HTMLSelectElement;
    const { id, value: publisher } = target;
    selected = publisher.toLowerCase();

    switch (selected) {
      case "-":
        notify(booksCache);
        break;
      default:
        booksCache.length = 0;
        booksCache.push(...booksSelection);
        sessionStorage.setItem("booksCache", JSON.stringify(booksCache));
        notify(filterBooksByPublisher(booksSelection, selected), selected);
        break;
    }
  };
};

const searchInput = document.getElementById(
  "search",
) as HTMLInputElement | null;

const bookTable = document.getElementById(
  "books-listing",
) as HTMLTableSectionElement | null;

const selectPublisher = document.getElementById(
  "by-publisher",
) as HTMLSelectElement | null;

const buttons = document.querySelectorAll("button.detail");

// for (const button of buttons) {
//   button.ad;
// }

searchInput?.addEventListener("input", inputEventHandler());
selectPublisher?.addEventListener(
  "change",
  selectOptionEventHandler(booksSelection),
);

window.onload = () => {
  if (!sessionStorage.getItem("userSelection")) return;

  const books =
    JSON.parse(sessionStorage.getItem("booksSelection") as string) || [];
  const selectedPublisher =
    JSON.parse(sessionStorage.getItem("selectedPublisher") as string) || "-";

  searchInput?.setAttribute(
    "value",
    sessionStorage.getItem("searchValue") || "",
  );

  notify(books, selectedPublisher);
};
