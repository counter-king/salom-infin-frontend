export const replaceSpecChars = string => {
   const value = string.replace(/[^a-zA-Zа-яА-Я\s\']+/g, '');
   return value;
};