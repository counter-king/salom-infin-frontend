import dayjs from 'dayjs'
import 'dayjs/locale/ru' // Ruscha lokalni qo'shish
import 'dayjs/locale/uz-latn'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

/**
* Проверяет являться ли строка date
* @param { string } date
* @return { boolean }
* */
export const isDate = (date) => {
  return dayjs(date, 'YYYY-MM-DD', true).isValid()
}
export const isDateHour = (date) => {
  return dayjs(date, 'DD.MM.YYYY HH:mm').isValid()
}
export function formatDateHour(date) {
  return date ? dayjs(date).format("DD.MM.YYYY HH:mm") : "Не верный формат даты"
}
export function formatDateMonth(date, locale = 'ru') {
  return date ? dayjs(date).locale(locale).format('MMMM') : 'Не верный формат даты'
}
export function formatHour(date) {
  return date ? dayjs(date).format("HH:mm") : "Не верный формат даты"
}
export function formatDate(date) {
  return date ? dayjs(date).format("DD.MM.YYYY") : "Не верный формат даты"
}
export function formatDateReverse(date, separate = '-') {
  return date ? dayjs(date).format(`YYYY${separate}MM${separate}DD`) : "Не верный формат даты"
}
export function formatDateNamedMonth(date) {
  return date ? dayjs(date).locale('ru').format("DD MMMM YYYY г.") : "Не верный формат даты"
}
export function formatDateMonthWithDay(date, locale = 'ru') {
  return date ? dayjs(date).locale(locale).format('DD MMMM') : 'Не верный формат даты'
}
export function formatDay(date) {
  return date ? dayjs(date).format("DD") : "Не верный формат даты"
}