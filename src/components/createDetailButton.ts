export const createDetailButton = (
  isbn: string,
  callbackFn: CallableFunction,
) => {
  const btn = document.createElement("button");
  btn.textContent = "Detail";
  btn.setAttribute("class", "button detail");
  // btn.setAttribute("onclick", "location.href='detail.html'");
  btn.addEventListener("click", callbackFn(isbn));
  return btn;
};
