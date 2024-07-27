import { notify } from '@kyvg/vue3-notification'

export function dispatchNotify(title = null, text, type) {
  notify({
    title: title,
    text: text,
    type: type,
    width: 372
  })
}
