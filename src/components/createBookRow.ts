import type { Book } from "../interfaces/book.types";
import { createDetailButton } from "./createDetailButton";
import { getBookDetails } from "../services/books.service";

const buttonEventHandler = (isbn: string) => {
  return async function (e: Event) {
    const details = await getBookDetails(isbn);
    localStorage.setItem("bookDetails", JSON.stringify(details));
    window.location.assign("/detail.html");
  };
};

export const createBookRow = (book: Book): HTMLElement => {
  const { title, isbn, author, publisher } = book;

  const tableRow = document.createElement("tr");
  const favicon = document.createElement("td");
  favicon.innerHTML = `<button class="button button-clear fav-btn">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="fav">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg></button>`;
  tableRow.appendChild(favicon);

  const tdTitle = document.createElement("td");
  tdTitle.textContent = title;
  tableRow.appendChild(tdTitle);
  const tdIsbn = document.createElement("td");
  tdIsbn.textContent = isbn;
  tableRow.appendChild(tdIsbn);
  const tdAuthor = document.createElement("td");
  tdAuthor.textContent = author;
  tableRow.appendChild(tdAuthor);
  const tdPublisher = document.createElement("td");
  tdPublisher.textContent = publisher;
  tableRow.appendChild(tdPublisher);
  const tdDetail = document.createElement("td");
  tableRow.appendChild(tdDetail);
  const btn = createDetailButton(isbn, buttonEventHandler);

  tdDetail.appendChild(btn);

  return tableRow;
  // return `<tr><td><button class="button button-clear fav-btn">
  //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="fav">
  //     <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  //   </svg></button></td>
  //   <td>${title}</td>
  //   <td>${isbn}</td>
  //   <td>${author}</td>
  //   <td>${publisher}</td>
  //   <td>
  // <button class="button detail" onclick="location.href='detail.html'">Detail</button>
  //   </td>
  // </tr>`;
};
