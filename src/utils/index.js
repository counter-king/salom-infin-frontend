/**
 * Проверяет все ключи объекта
 * Заполнен ли объект с данными или нет
 * @param model Объект модель
 * @param exclude Ключи которые не будет проверятся
 * @returns Boolean
 * */
import dayjs from "dayjs";
export function isModelEmpty(model, exclude) {
	return Object.entries(model)
	// Исключаем ключи, которые не будет проверятся
	.filter(([key]) => !exclude.includes(key))
	.every(([_key, _value]) => !!_value)
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
    if(!value) return

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
	.filter(col => col.hasOwnProperty("detail"))
	// .sort((prevCol, nextCol) => prevCol.detail.order - nextCol.detail.order)
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
			else if (Object.prototype.toString.call(model[key]) === '[object Object]') {
				model[key] = {};
			}
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
