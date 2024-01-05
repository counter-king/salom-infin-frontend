/**
 * Удаляет все символы кроме числа
 * @param { string } text
 * @return { string }
 * */
export const replaceWithNumbers = (text) => {
  return String(text).replace(/[^0-9]/g, '')
}
