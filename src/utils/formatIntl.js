export const numberFormat = (value, lang = 'ru') => {
  return new Intl.NumberFormat(lang).format(value)
}
