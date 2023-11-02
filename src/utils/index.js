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
	.sort((prevCol, nextCol) => prevCol.detail.order - nextCol.detail.order)
	.map(item => {
		return {
			key: item.title,
			value : getValueByPath(model, item.key),
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
