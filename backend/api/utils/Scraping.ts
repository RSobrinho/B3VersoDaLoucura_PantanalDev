export function getCleanLink(link: string) {
  const newLink = link.toString().split("?");
  link = newLink[0];

  if (link.slice(-1) != "/") {
    link = link + "/";
  }

  return link;
}

export function getDateFormat(date: string) {
  const newDate =
    date.length === 10 &&
    date.slice(-4).indexOf("/") == -1 &&
    date.slice(-4).indexOf("-") == -1
      ? date.slice(3, 5) + "-" + date.slice(0, 2) + "-" + date.slice(-4)
      : date;

  return newDate;
}
