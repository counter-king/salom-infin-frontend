import dayjs from 'dayjs'
import 'dayjs/locale/ru' // Ruscha lokalni qo'shish
import 'dayjs/locale/uz-latn'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore)

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
export function formatDateCalendar(date) {
  return date ? dayjs(date).format("YYYY-MM-DD") : "-"
}
export function formatDateHour(date) {
  return date ? dayjs(date).format("DD.MM.YYYY HH:mm") : "-"
}
export function formatDateMonth(date, locale = 'ru', index) {
  return date ? dayjs(date).set('month', index).startOf('month').locale(locale).format('MMMM') : '-'
}
export function formatHour(date) {
  return date ? dayjs(date).format("HH:mm") : "-"
}
export function formatDate(date) {
  return date ? dayjs(date).format("DD.MM.YYYY") : "-"
}
export function formatDateReverse(date, separate = '-') {
  return date ? dayjs(date).format(`YYYY${separate}MM${separate}DD`) : "-"
}
export function formatDateNamedMonth(date) {
  return date ? dayjs(date).locale('ru').format("DD MMMM YYYY г.") : "-"
}
export function formatDateMonthWithDay(date, locale = 'ru') {
  return date ? dayjs(date).locale(locale).format('DD MMMM') : '-'
}
export function formatDay(date) {
  return date ? dayjs(date).format("DD") : "-"
}
export const isStartBeforeOrEqualEnd = (startDate, endDate) => {
  return dayjs(startDate).isSameOrBefore(dayjs(endDate), "day")
}
export const isDateRangeWithinLimit = (startDate, endDate, limitDays = 31) => {
  return dayjs(endDate).diff(dayjs(startDate), "day") <= limitDays
}

export function formatMonthAndYear(date) {
  return date ? dayjs(date).locale('ru').format("MMMM, YYYY") : "Не верный формат даты"
}

export const formatTime = (time) => {
  return dayjs(time, "HH:mm:ss").format('HH:mm')
}

export function formatTimeDate(date) {
  return date ? dayjs(date).format("HH:mm, DD.MM.YY") : "-"
}