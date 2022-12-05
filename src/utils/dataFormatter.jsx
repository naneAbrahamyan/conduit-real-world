export function DateFormatter(date) {
  return new Date(date).toString().slice(0, 16);
}
