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

// Format number to k
export function formatToK(number) {
  if (number >= 1000) {
      return Math.floor(number / 1000) + 'k';
  }
  return number.toString();
}
