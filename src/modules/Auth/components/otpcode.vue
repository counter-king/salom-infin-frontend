<script setup>
// Core
import { ref, reactive, onMounted } from 'vue'
// Macros
const props = defineProps({
  digitCount: {
    type: [Number, String],
    default: 4
  },
  inputClasses: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['emit:up'])
// Reactive
const inputRefs = ref(null)
const digits = reactive([])
// Hooks
onMounted(() => {
  // Установить фокус на первый input
  inputRefs.value[0].focus()

  for(let key = 1; key <= props.digitCount; key++) {
    digits.push(null)
  }
})
// Methods
const isDigitsFull = () => {
  for (const elem of digits) {
    if (elem == null) {
      return false
    }
  }
  return true
}
const handleKeyDown = (event, index) => {
  if (event.key !== 'Tab' && event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
    event.preventDefault()
  }

  if (event.key === 'Backspace') {
    digits[index] = null

    if (index !== 0) {
      inputRefs.value[index - 1].focus()
    }

    emit('emit:up', digits.join(''))

    return
  }

  if ((new RegExp('^([0-9])$')).test(event.key)) {
    digits[index] = event.key

    if (index !== props.digitCount - 1) {
      inputRefs.value[index + 1].focus()
    }

    // if (isDigitsFull()) {
      emit('emit:up', digits.join(''))
    // }
  }
}
</script>

<template>
  <div class="otp-wrapper flex gap-2 justify-between">
    <template v-for="(item, index) in digitCount" :key="item">
      <input
        ref="inputRefs"
        v-model="digits[index]"
        maxlength="1"
        class="w-[64px] h-[64px] outline-none ring-2 ring-[#E6E6F0] rounded-lg text-center flex items-center justify-center focus:ring-primary-500"
        :class="inputClasses"
        @keydown="handleKeyDown($event, index)"
      />
    </template>
  </div>
</template>
