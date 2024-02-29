<script setup>
// Core
import { useModel, computed, ref } from 'vue'
// Reactive
const count = ref(0)
// Macros
const props = defineProps({
  modelValue: {
    type: Boolean
  }
})
const emit = defineEmits(['update:modelValue'])
// Composable
const modelValue = useModel(props, 'modelValue')
// Computed
const stateModel = computed({
  get() {
    return props.state
  },
  set(value) {
    emit('emit:up', value)
  }
})
// Methods
const setToggle = (event) => {
  modelValue.value = !!(count.value & 1)
  count.value++
  emit('emit:up', modelValue.value)
}
</script>

<template>
  <div @click="setToggle">
    <slot :state="modelValue" />
  </div>
</template>

<style scoped>

</style>
