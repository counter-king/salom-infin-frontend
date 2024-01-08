import dayjs from 'dayjs'
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
export function formatDateHour(date) {
  return date ? dayjs(date).format("DD.MM.YYYY HH:mm") : "Не верный формат даты"
}
export function formatDate(date) {
  return date ? dayjs(date).format("DD.MM.YYYY") : "Не верный формат даты"
}
export function formatDateReverse(date, separate = '-') {
  return date ? dayjs(date).format(`YYYY${separate}MM${separate}DD`) : "Не верный формат даты"
}

