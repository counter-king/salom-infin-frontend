export const replaceSpecChars = string => {
   const value = string.replace(/[^a-zA-Z][^']/g, '');
   return value;
};