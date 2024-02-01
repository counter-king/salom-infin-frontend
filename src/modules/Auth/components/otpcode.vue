<script setup>
// Core
import { ref, reactive } from 'vue'
// Macros
const props = defineProps({
  digitCount: {
    type: [Number, String],
    default: 4
  }
})
const emit = defineEmits(["emit:up"])
// Reactive
const inputRefs = ref(null)
const digits = reactive([])

for(let key = 1; key <= props.digitCount; key++) {
  digits.push(null)
}
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
  if (event.key !== "Tab" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
    event.preventDefault()
  }

  if (event.key === "Backspace") {
    digits[index] = null

    if (index !== 0) {
      inputRefs.value[index - 1].focus()
    }
    return;
  }

  if ((new RegExp('^([0-9])$')).test(event.key)) {
    digits[index] = event.key

    if (index !== props.digitCount - 1) {
      inputRefs.value[index + 1].focus()
    }

    if (isDigitsFull()) {
      emit('emit:up', digits.join(''))
    }
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
        class="w-[60px] h-[60px] border outline-0 rounded-lg text-center flex items-center justify-center"
        placeholder="X"
        @keydown="handleKeyDown($event, index)"
      />
    </template>
  </div>
</template>
