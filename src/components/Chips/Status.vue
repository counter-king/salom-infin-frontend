<script setup>
import {computed} from "vue";

const props = defineProps({
  status: {
    type: Object,
    default: () => {},
    required: true
  }
})

const classes = computed(() => {
  switch (props.status.id){
    case 1:
      return "bg-warning-50 text-warning-500"
    default:
      return "bg-success-50 text-success-500"
  }
})
</script>

<template>
  <span
    class="px-2 py-1 text-xs font-semibold rounded-[80px]"
    :class="classes"
  >
    {{ props.status.name }}
  </span>
</template>

<style scoped>

</style>
