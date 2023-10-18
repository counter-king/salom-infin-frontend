import dayjs from "dayjs"
export function formatDateHour(date) {
  return date ? dayjs(date).format("DD.MM.YYYY HH:mm") : "Не верный формат даты"
}
export function formatDate(date) {
  return date ? dayjs(date).format("DD.MM.YYYY") : "Не верный формат даты"
}
