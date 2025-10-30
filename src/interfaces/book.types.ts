export interface Book {
  title: string;
  isbn: string;
  author: string;
  publisher: string;
}

export interface Details {
  subtitle: "…";
  abstract: "…";
  numPages: 123;
  price: "$..";
  cover: "http://….png";
}

export type BookWithDetails = Book & Details;
