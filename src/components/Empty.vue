<script setup>
// Core
import { useI18n } from 'vue-i18n'
// Composable
const { t } = useI18n()
// Macros
const props = defineProps({
  title: {
    type: String,
    default: 'empty-text-2'
  },
  labelClasses: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  descClass: {
    type: String,
    default: ''
  },
  wrapperClass: {
    type: String,
    default: ''
  },
  innerWrapperClass: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="flex justify-center items-center bg-white shadow-button rounded-xl" :class="props.wrapperClass">
    <div class="text-center" :class="props.innerWrapperClass">
      <img
        src="/images/cloud-table-empty.svg"
        alt="EmptyFolder"
        class="block mb-5 mx-auto"
      />

      <h1
        class="text-greyscale-500 font-medium text-sm"
        :class="props.labelClasses"
      >
        {{ t(props.title) }}
      </h1>
      <p v-if="props.description" class="text-sm font-medium text-greyscale-500" :class="props.descClass">
        {{ t(props.description) }}
      </p>
    </div>
  </div>
</template>
