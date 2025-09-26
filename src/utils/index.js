// Core
import dayjs from 'dayjs'
import {diffWords} from "diff"
// Services
import {fetchTopSignersList, fetchUsersList} from "@/services/users.service"
import { fetchCompaniesList, fetchDepartmentList, fetchTagList } from "@/services/common.service"
// Enums
import {USER_STATUS_CODES} from "@/enums"
import axiosConfig from "@/services/axios.config";

/**
 * Проверяет все ключи объекта
 * Заполнен ли объект с данными или нет
 * @param model Объект модель
 * @param exclude Ключи которые не будет проверятся
 * @returns Boolean
 * */
export function isModelEmpty(model, exclude) {
  return Object.entries(model)
	// Исключаем ключи, которые не будет проверятся
	.filter(([key]) => !exclude.includes(key))
	.some(([_key, _value]) => !!_value)
}
/**
* Очистит все ключи объекта
* @param model Объект модель
* @param exclude Ключи которые не будет проверятся
* */
export function clearModel(model, exclude = []) {
  Object.entries(model)
  // Исключаем ключи, которые не будет проверятся
  .filter(([key]) => !exclude.includes(key))
  .forEach(([_key, value]) => {
    if(Array.isArray(value)) {
      model[_key] = []
      return;
    }

    model[_key] = null
  })
}
/**
 * @param model Объект модель
 * @param source Объект с данными
 * */
export function setValuesToKeys(model, source) {
  Object.entries(source)
  .forEach(([key, value]) => {
    if(value === null || value === undefined) return

    if(Object.prototype.toString.call(value) === '[object Object]') {
      model[key] = value.id
    } else {
      model[key] = value
    }
  })
}
/**
* Является ли ключ объектом
* @param key
* @return boolean
* */
export const isObject = (key) => Object.prototype.toString.call(key) === '[object Object]'
/**
* Удалит все пробелы из текста
* и нормализует текст
* @param value Текст
* @return string
* */
export const normalizeText = (value) => value.split('\n').join('<br>').replace(/\s+/g, ' ').trim()
/**
 * Форматирует и сокращает имя
 * @param { string } value
 * @param { string } separate
 * @param first_name
 * @param last_name
 * @return { string } Odinayev M.K.
 * */
export const formatNameToShort = (value, separate = '.', first_name = null, last_name = null) => {
  const mixedLetters = ['Sh', 'SH', 'sh', 'ch', 'CH', 'Ch', 'o\'', 'O\'', 'g\'', 'G\'', 'dj', 'Dj', 'DJ']

  if (first_name && last_name) {
    const firstNameChar = first_name.slice(0, 2).toLowerCase()
    if (mixedLetters.includes(firstNameChar)) {
      return `${last_name} ${first_name.slice(0, 2).toUpperCase()}.`
    } else {
      return `${last_name} ${first_name.slice(0, 1).toUpperCase()}.`
    }
  } else {
    if(!value) return 'Текст не найден'

    const [name, firstName, fatherName] = value.split(' ')

    const firstNameChar = firstName.slice(0, 2).toLowerCase()
    const fatherNameChar = fatherName?.slice(0, 2).toLowerCase()

    if (mixedLetters.includes(firstNameChar) || mixedLetters.includes(fatherNameChar)) {
      return `${ name } ${ (firstName.slice(0, 2) + separate).toUpperCase() }`
    }
    else {
      return `${ name } ${ (firstName.slice(0, 1) + separate).toUpperCase() }`
    }
  }
}
/*
* Форматирует число 1, 10.02, 100.55, 1 012.21 ...
* */
export const formatNumberWithFloat = (number) => {
  // Преобразовать число в строку с фиксированным количеством десятичных знаков
  const formattedNumber = parseFloat(number).toFixed(2)
  // Разделить строку на части до и после десятичной точки
  const [integerPart, decimalPart] = formattedNumber.split('.');
  // Добавить пробелы между группами цифр
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  // Собрать отформатированное число с точкой
  return `${ formattedIntegerPart }.${ decimalPart }`;
}
/**
 * Форматирует номер 998 93 *** ** 78
 * @param { string } number номер телефона
 * */
export const maskNumbers = (number) => number.replace(/\D/g, '').replace( /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 *** ** $5' )
/**
 * Сделает первую букву заглавный
 * */
export const firstLetterCapitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1)
/**
 * Замена ? символ на `
 * @param { string } text
 * */
export const replaceErrorQuestionSymbol = (text) => {
  return text.replace(/[?]/g, '`')
}
/**
 *
 * */
export const getNiceStep = (maxValue, stepsCount) => {
  const roughStep = maxValue / stepsCount

  const exponent = Math.floor(Math.log10(roughStep))
  const base = Math.pow(10, exponent)

  return Math.ceil(roughStep / base) * base
}
/**
 *
 * */
export const generateCleanYAxisLabels = (maxValue, stepsCount = 7) => {
  const extendedMax = maxValue * 1.2
  const step = getNiceStep(extendedMax, stepsCount)
  const roundedMax = step * stepsCount
  const labels = []

  for (let i = 0; i <= stepsCount; i++) {
    labels.push(i * step)
  }

  return labels
}

export const formatNumberToMillionsOrBillions = (value) => {
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '')
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, '')
  } else {
    return value.toString()
  }
}
/**
 * Финансовом секторе отображение
 * число миллиард пишется как млн
 * */
export const formatNumberToFinanceChart = (value) => {
  if (value >= 1_000_000_000_000) {
    return 'mlrd'
  }
  else if (value >= 1_000_000_000) {
    return 'mln'
  } else if (value >= 1_000_000) {
    return 'sum'
  } else {
    return ''
  }
}
/*
*
* */
export function getValueByPath(obj, path) {
	// Разбиваем путь на отдельные ключи
	const keys = path.split('.');

	// Используем метод reduce для последовательного доступа к вложенным свойствам объекта
	return keys.reduce((acc, key) => {
		return acc ? acc[key] : null;
	}, obj);
}
/*
*
* */
export function combineKeys(cols, model) {
	return cols
	.filter(col => col.hasOwnProperty('detail'))
	.sort((prevCol, nextCol) => prevCol.detail.order - nextCol.detail.order)
	.map(item => {
		return {
      header: item.header,
      field : getValueByPath(model, item.field),
			detail: item.detail
		}
	})
}
/*
*
* */
export function resetModel(model){
	for (const [key, value] of Object.entries(model)) {
		if (model.hasOwnProperty(key)) {
			if (Array.isArray(model[key])) {
				model[key] = [];
			}
			// else if (Object.prototype.toString.call(model[key]) === '[object Object]') {
			// 	model[key] = {};
			// }
			else {
				model[key] = null;
			}
		}
	}
}
export const getDateRange = (value) => {
  if (!['today', 'yesterday', 'last-seven-days', 'last-two-weeks', 'this-month', 'last-month'].includes(value)){
    alert('Please provide required value!');
    throw new Error('Please provide required value!');
  }
  switch (value) {
    case "today":
      return [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')];
    case "yesterday":
      return [dayjs().subtract(1, 'day').format('YYYY-MM-DD'), dayjs().subtract(1, 'day').format('YYYY-MM-DD')];
    case "last-seven-days":
      return [dayjs().subtract(7, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')];
    case "last-two-weeks":
      return [dayjs().subtract(14, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')];
    case "this-month":
      return [dayjs().set('date', 1).format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')];
    case "last-month":
      return [dayjs().subtract(1, 'month').set('date', 1).format('YYYY-MM-DD'), dayjs().set('date', 0).format('YYYY-MM-DD')];
    default:
      return [];
  }
}
export const returnFirstLetter = (text) => {
  if (text) {
    const firstLetter = text.slice(0, 2).toLowerCase()
    if (["sh", "ch", "o'", "g'", "dj" ].includes(firstLetter)){
      return text.slice(0, 2)
    }else {
      return text.slice(0, 1)
    }
  } else {
    return ""
  }
}
export const formatUserFullName = (item) => {
  if (item) {
    if (item && item.hasOwnProperty('user')){
      return `${returnFirstLetter(item.user.first_name)}. ${item.user.last_name}`
    } else {
      return `${returnFirstLetter(item.first_name)}. ${item.last_name}`
    }
  }
}
/** **/
export const adjustUsersToArray = (tempArray) => {
  return tempArray?.map(item => {
    if (item.hasOwnProperty('user')) {
      return {
        id: item.id,
        user: item.user.id
      }
    } else {
      return {
        user: item.id
      }
    }
  });
}
/** **/
export const filterObjectByKeys = (obj, keysToInclude = []) => {
  const filteredObject = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && keysToInclude.includes(key)){
      filteredObject[key] = obj[key];
    }
  }
  return filteredObject;
}
/** **/
export const filterFalsyValues = (obj) => {
  const filteredObject = {};

  if (obj.register_date){
    obj.register_date = new Date(obj.register_date).toISOString().split('T')[0]
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key]) {
      filteredObject[key] = obj[key];
    }
  }

  return filteredObject;
}

export const removeKeysWithDoubleUnderscore = (obj) => {
  let strObj = JSON.stringify(obj);
  let jsonObj = JSON.parse(strObj);
  for (const key in jsonObj) {
    if (Object.prototype.hasOwnProperty.call(jsonObj, key) && key.startsWith('__')) {
      delete jsonObj[key];
    }
  }
  return jsonObj;
}

export const adjustUserObjectToArray = async (items = [], userId = null, multiple = true) => {
  if (items && items.length && multiple) {
    const userIds = items.map(item => item.hasOwnProperty('user') ? item.user.id : item.id).join(',')
    const res = await fetchUsersList({ ids: userIds })
    if (res && res.status === 200) {
      return Promise.resolve(res.data.results)
    } else {
      return Promise.reject([])
    }
  } else if (multiple === false && userId){
    const res = await fetchUsersList({ ids: userId })
    if (res && res.status === 200) {
      return Promise.resolve(res.data.results[0])
    } else {
      return Promise.reject(null)
    }
  } else {
    return null
  }
}

export const adjustTopSignerObjectToArray = async (items = [], userId = null, multiple = true) => {
  if (items && items.length && multiple) {
    const userIds = items.map(item => item.user_id).join(',')
    const res = await fetchTopSignersList({ ids: userIds })
    if (res && res.status === 200) {
      return Promise.resolve(res.data.results)
    } else {
      return Promise.reject([])
    }
  } else if (multiple === false && userId){
    const res = await fetchTopSignersList({ ids: userId })
    if (res && res.status === 200) {
      return Promise.resolve(res.data.results[0])
    } else {
      return Promise.reject(null)
    }
  } else {
    return null
  }
}

export const adjustDepartmentObjectToArray = async (items = [], departmentId = null, multiple = true) => {
  if (items.length && multiple) {
    const depIds = items.map(item => item.id).join(',')
    const res = await fetchDepartmentList({ids: depIds})
    if (res && res.status === 200) {
      return Promise.resolve(res.data.results)
    } else {
      return Promise.reject([])
    }
  } else if (multiple === false && departmentId){
    const res = await fetchDepartmentList({ ids: departmentId })
    if (res && res.status === 200) {
      return Promise.resolve(res.data.results[0])
    } else {
      return Promise.reject(null)
    }
  } else {
    return null
  }
}

export const adjustCompanyObjectToArray = async (items = [], companyId = null, multiple = true) => {
  if (items.length && multiple) {
    const compIds = items.map(item => item.id).join(',')
    const res = await fetchCompaniesList({ids: compIds})
    if (res && res.status === 200) {
      return Promise.resolve(res.data.results)
    } else {
      return Promise.reject([])
    }
  } else if (multiple === false && companyId){
    const res = await fetchCompaniesList({ ids: companyId })
    if (res && res.status === 200) {
      return Promise.resolve(res.data.results[0])
    } else {
      return Promise.reject(null)
    }
  } else {
    return null
  }
}

export const adjustTagObjectToArray = async (items = [], tagId = null, multiple = true) => {
  if (items.length && multiple) {
    const tagIds = items.map(item => item.id).join(',')
    const res = await fetchTagList({ids: tagIds})
    if (res && res.status === 200) {
      return Promise.resolve(res.data.results)
    } else {
      return Promise.reject([])
    }
  } else if (multiple === false && tagId){
    const res = await fetchTagList({ ids: tagId })
    if (res && res.status === 200) {
      return Promise.resolve(res.data.results[0])
    } else {
      return Promise.reject(null)
    }
  } else {
    return null
  }
}

export const returnStatusColor = (code) => {
  switch (code) {
    case USER_STATUS_CODES.WORKERS:
    case USER_STATUS_CODES.WORKERS_NOT_STAFF:
      return 'text-success-500'
    case USER_STATUS_CODES.LABOR_LEAVE:
      return 'text-warning-500'
    default:
      return 'text-critic-500'
  }
}

export const returnStatusBgColor = (code) => {
  switch (code) {
    case USER_STATUS_CODES.WORKERS:
    case USER_STATUS_CODES.WORKERS_NOT_STAFF:
      return 'bg-success-500'
    case USER_STATUS_CODES.LABOR_LEAVE:
      return 'bg-warning-500'
    default:
      return 'bg-critic-500'
  }
}

export const textDifference = (oldText, newText) => {
  return compareText(oldText, newText)
}

// Compare old_text and new_text and generate HTML
const compareText = (oldText, newText) => {
  const diff = diffWords(oldText, newText)
  let result = ''
  diff.forEach((part) => {
    if (part.added) {
      result += `<span class="text-success-500 bg-success-100">${part.value}</span>`
    } else if (part.removed) {
      result += `<span class="text-critic-500 bg-critic-100">${part.value}</span>`
    } else {
      result += `<span class="text-greyscale-900">${part.value}</span>`
    }
  })
  return result
}
export const adjustObjectToArray = async (api = '', items = [], multiple = true, id = null) => {
  if (items.length && api && multiple) {
    const ids = items.map(item => item.hasOwnProperty('user') ? item.user.id : item.id).join(',')
    const res = await axiosConfig.get(`${api}/`, {ids})
    if (res && res.status === 200) {
      return Promise.resolve(res.data.results)
    } else {
      return Promise.reject([])
    }
  } else if (!multiple && id) {
    const res = await axiosConfig.get(`${api}/`, {ids: id})
    if (res && res.status === 200 && res.data.results?.length) {
      return Promise.resolve(res.data.results[0])
    } else {
      return Promise.reject([])
    }
  } else {
    return []
  }
}

export const hostName = () => {
  return  window.location.host === 'new-side-project.vercel.app' ? 'vercel' : window.location.host.startsWith('localhost') ? 'localhost' : 'sqb'
}

export const isToday = (date) => {
  return dayjs(date).isSame(dayjs(), 'day')
}

export const isBirthdayToday = (date) => {
  const birthday = dayjs(date)
  const today = dayjs()
  return birthday.month() === today.month() && birthday.date() === today.date()
}

// Convert hex to rgba
// like #FFFFFF => rgba(255, 255, 255, 1)
export const hexToRgba = (hex, alpha)=> {
  // Remove the '#' if present
  hex = hex.replace("#", "");

  // Parse the r, g, b values
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

//-------------------------------------------------------------------------------------------------------------------//

export const calculateYearsAndMonths = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (isNaN(start) || isNaN(end)) {
    return 'Invalid date(s)'
  }

  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()

  if (months < 0) {
    years--
    months += 12
  }

  if (years < 0 || (years === 0 && months < 0)) {
    return 'End date must be after start date'
  }

  if (years === 0) {
    return `${months} (${numberToUzbekWords(months)}) oy`
  }

  return `${years} (${numberToUzbekWords(years)}) yil${months > 0 ? ' ' + months + ' (' + numberToUzbekWords(months) + ') oy' : ''}`
}

//-------------------------------------------------------------------------------------------------------------------//

export const numberToUzbekWords = (num) => {
  const ones = [
    '', 'bir', 'ikki', 'uch', 'to‘rt', 'besh', 'olti', 'yetti', 'sakkiz', 'to‘qqiz'
  ]
  const tens = [
    '', 'o‘n', 'yigirma', 'o‘ttiz', 'qirq', 'ellik', 'oltmish', 'yetmisḩ', 'sakson', 'to‘qson'
  ]

  if (num === 0) return 'nol'

  let words = ''

  if (num >= 100) {
    let hundred = Math.floor(num / 100)
    words += ones[hundred] + ' yuz'
    num = num % 100
    if (num > 0) words += ' '
  }

  if (num >= 10) {
    let ten = Math.floor(num / 10)
    words += tens[ten]
    num = num % 10
    if (num > 0) words += ' '
  }

  if (num > 0) {
    words += ones[num]
  }

  return words.trim()
}

export const isDateGreaterOrEqualToday = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0) // normalize today to 00:00:00

  const givenDate = new Date(dateString)
  givenDate.setHours(0, 0, 0, 0)// normalize given date

  return givenDate >= today
}

// Format number to k
export function formatToK(number) {
  if (number >= 1000) {
      return Math.floor(number / 1000) + 'k';
  }
  return number.toString();
}

export const extractCountryAndCity = (address) => {
  if (!address) return ''

  const parts = address.split(',').map(part => part.trim())

  if (parts.length >= 2) {
    return `${parts[0]} / ${parts[1]}`
  }

  return parts[0] || ''
}
// --------------------------------------------------------------------------------------------------------
export const formatUzbekDate = (dateString, monthNameOnly = false) => {
  const months = {
    1: "yanvar",
    2: "fevral",
    3: "mart",
    4: "aprel",
    5: "may",
    6: "iyun",
    7: "iyul",
    8: "avgust",
    9: "sentabr",
    10: "oktabr",
    11: "noyabr",
    12: "dekabr"
  }

  const date = new Date(dateString)

  const day = date.getDate()
  const month = months[date.getMonth() + 1]
  const year = date.getFullYear()

  if (monthNameOnly) {
    return `${month}`
  } else {
    return `“${day}” ${month} ${year}-yil`
  }
}

export const returnDaysDifference = (start_date, end_date) => {
  let startDate = new Date(start_date)
  let endDate = new Date(end_date)

  if (startDate && endDate) {
    // Calculate the difference in milliseconds
    let difference = endDate.getTime() - startDate.getTime();

    // Convert the difference from milliseconds to days
    let daysDifference = difference / (1000 * 3600 * 24);

    // Round the result to get an integer number of days
    daysDifference = Math.round(daysDifference);
    return daysDifference + 1
  } else {
    return null
  }
}

export const getUzbekMonthName = (dateInput) => {
  const uzMonths = [
    "YAN", "FEV", "MAR", "APR", "MAY", "IYN",
    "IYL", "AVG", "SEN", "OKT", "NOY", "DEK"
  ]

  if (!dateInput) return "-" // null, undefined, empty string

  const date = new Date(dateInput)
  if (isNaN(date)) return "-" // invalid date

  return uzMonths[date.getMonth()]
}

  export const getWorkdayStatus = (attendanceDate, arrival_time, departure_time) => {
  const today = new Date()
  const inputDate = new Date(attendanceDate)

  const isToday =
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate()

  // if both are null/undefined/invalid
  if (!arrival_time && !departure_time) {
    if (isToday) return "waiting-info"
    return "not-came"
  }

  const arrival = arrival_time ? new Date(arrival_time) : null
  const departure = departure_time ? new Date(departure_time) : null

  const isArrivalValid = arrival instanceof Date && !isNaN(arrival)
  const isDepartureValid = departure instanceof Date && !isNaN(departure)

  // if both invalid
  if (!isArrivalValid && !isDepartureValid) {
    if (isToday) return "waiting-info"
    return "not-came"
  }

  // define thresholds
  const nineAM = new Date(arrival)
  nineAM.setHours(9, 0, 0, 0)

  const sixPM = new Date(departure)
  sixPM.setHours(18, 0, 0, 0)

  // ✅ special checks for today
  if (isToday) {
    if (arrival <= nineAM) return "came-on-time"
    if (arrival > nineAM) return "late-arrival"
  }

  if (!isToday) {
    if (!arrival_time && departure_time) return "no-entry-marked"
    if (arrival_time && !departure_time) return "no-exit-marked"
  }

  // general checks
  const isLate = arrival > nineAM
  const isEarly = departure < sixPM

  if (isLate && isEarly) return "late-arrival-early-departure"
  if (isLate) return "late-arrival"
  if (isEarly) return "early-departure"
  return "came-on-time"
}

export const getFirstDateOfCurrentMonth = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

export const returnDateRange = (start_date, end_date) => {
  const startDate = new Date(start_date)
  const endDate = new Date(end_date)

  // Format helper
  const formatDate = (date) => {
    const day = date.getDate()
    const month = formatUzbekDate(date, true)
    const year = date.getFullYear()
    return `${day}-${month} ${year}-yil`
  }

  // If same date
  if (
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === endDate.getDate()
  ) {
    return formatDate(startDate)
  }

  return `${formatDate(startDate)}dan, ${formatDate(endDate)}gacha`
}

export const getAttendanceEntryStatus = (date, start_date, end_date, absent = false) => {
  const today = new Date()
  const checkDate = new Date(date)

  // Normalize dates (compare only date parts)
  const isToday =
    checkDate.getFullYear() === today.getFullYear() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getDate() === today.getDate()

  // 1. If date is today and start_date is null → waiting-info
  if (isToday && !start_date) {
    return "waiting-info"
  }

  // 2. If start_date and end_date are null → not-came
  if (!start_date && !end_date) {
    return "not-came"
  }

  // 3. If start_date is null but end_date exists → no-entry-marked
  if (!start_date && end_date) {
    return "no-entry-marked"
  }

  if (start_date) {
    const startTime = new Date(start_date)
    const nineAM = new Date(startTime)
    nineAM.setHours(9, 0, 0, 0)

    // 4. If start_date before 09:00 → came-on-time
    if (startTime <= nineAM) {
      return "came-on-time"
    }

    // 5. If start_date after 09:00 → late-arrival
    if (startTime > nineAM) {
      return "late-arrival"
    }
  }

  // Fallback
  return "unknown"
}

export const getAttendanceExitStatus = (date, start_date, end_date, absent = false) => {
  const today = new Date()
  const checkDate = new Date(date)

  // Normalize dates (compare only date parts)
  const isToday =
    checkDate.getFullYear() === today.getFullYear() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getDate() === today.getDate()

  // 1. If date is today and end_date is null → waiting-info
  if (isToday && !end_date) {
    return "waiting-info"
  }

  // 2. If start_date and end_date are null → not-came
  if (!start_date && !end_date) {
    return "not-came"
  }

  // 3. If start_date exists but end_date is null → no-exit-marked
  if (start_date && !end_date) {
    return "no-exit-marked"
  }

  if (end_date) {
    const endTime = new Date(end_date)
    const sixPM = new Date(endTime)
    sixPM.setHours(18, 0, 0, 0)

    // 4. If end_date before 18:00 → early-departure
    if (endTime < sixPM) {
      return "early-departure"
    }

    // 5. If end_date at or after 18:00 → normal-exit
    if (endTime >= sixPM) {
      return "normal-exit"
    }
  }

  // Fallback
  return "unknown"
}

export const returnLateTime = (start_time, end_time, locale = "uz", type = "entry") => {
  let diffMinutes = null

  if (type === "entry") {
    if (!start_time) return null

    const startTime = new Date(start_time)
    const nineAM = new Date(startTime)
    nineAM.setHours(9, 0, 0, 0)

    diffMinutes = Math.floor((startTime - nineAM) / (1000 * 60))
  }

  if (type === "exit") {
    if (!end_time) return null

    const endTime = new Date(end_time)
    const sixPM = new Date(endTime)
    sixPM.setHours(18, 0, 0, 0)

    diffMinutes = Math.floor((sixPM - endTime) / (1000 * 60)) + 1
  }

  // If not late or left early → return null
  if (!diffMinutes || diffMinutes <= 0) return null

  const hours = Math.floor(diffMinutes / 60)
  const minutes = diffMinutes % 60

  if (locale === "uz") {
    if (hours > 0 && minutes > 0) return `-${hours} s. ${minutes} daq.`
    if (hours > 0) return `-${hours} s.`
    return `-${minutes} daq.`
  }

  if (locale === "ru") {
    if (hours > 0 && minutes > 0) return `-${hours} ч. ${minutes} мин.`
    if (hours > 0) return `-${hours} ч.`
    return `-${minutes} мин.`
  }

  // fallback
  return `${diffMinutes} min`
}






