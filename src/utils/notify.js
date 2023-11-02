import { notify } from '@kyvg/vue3-notification'

export function dispatchNotify(title, text, type) {
  notify({
    title: title,
    text: text,
    type: type
  })
}
