import { createI18n } from 'vue-i18n'
import ru from "./locales/ru.json"
import uz from "./locales/uz.json"
import { getStorageItem } from "@/utils/storage"
import { LANG } from "@/constants/storage"
export const SUPPORT_LOCALES = ["uz", "ru"]
export const CURRENT_LOCALE = "uz"
export const AVAILABLE_LOCALES = [
  {
    label: "Русский",
    key: "ru"
  },
  {
    label: "O'zbek",
    key: "uz"
  },
]

export function setupI18n(options = {
  locale: getStorageItem(LANG)
    ? JSON.parse(getStorageItem(LANG)).value
    : CURRENT_LOCALE
}) {
  const i18n = createI18n({
    ...options,
    legacy: false,
    globalInjection: true,
    fallbackLocale: CURRENT_LOCALE,
    formatFallbackMessages: true,
    missingWarn: false,
    fallbackWarn: false,
    messages: { ru, uz },
    allowComposition: true
  })
  setI18nLanguage(i18n, options.locale)
  return i18n
}

export function setI18nLanguage(i18n, locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html').setAttribute('lang', locale)
}
