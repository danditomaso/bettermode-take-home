export function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedDate = formatter.format(date);
  return formattedDate;
}
