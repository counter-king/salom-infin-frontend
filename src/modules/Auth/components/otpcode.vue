<template>
  <div class="otp-wrapper flex gap-2 justify-between">
    <template v-for="(item, index) in digitCount" :key="item">
      <InputText
        ref="inputRefs"
        v-model:value="digits[index]"
        maxlength="1"
        :allow-input="onlyAllowNumber"
        class="!w-[72px] !h-[72px] text-center flex items-center justify-center text-xl"
        :placeholder="`${item}`"
        @keydown="handleKeyDown($event, index)"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import InputText from 'primevue/inputtext';

const emit = defineEmits(["emit:up"])

const props = defineProps({
  digitCount: {
    type: [Number, String],
    default: 4
  }
})

const inputRefs = ref(null)
const digits = reactive([])

for(let key = 1; key <= props.digitCount; key++) {
  digits.push(null)
}

const onlyAllowNumber = computed(() => (value) => !value || /^\d+$/.test(value))

const isDigitsFull = () => {
  for (const elem of digits) {
    if (elem == null) {
      return false;
    }
  }
  return true;
}

const handleKeyDown = (event, index) => {
  if (event.key !== "Tab" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
    event.preventDefault();
  }

  if (event.key === "Backspace") {
    digits[index] = null;

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
      emit("emit:up", digits.join(''))
    }
  }
}
</script>
