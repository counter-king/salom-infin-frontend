<script setup>
// Core
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import Button from 'primevue/button'
// Composable
const { t } = useI18n()
// Macros
const props = defineProps({
  label: {
    type: String
  },
  color: {
    type: String
  },
  borderColor: {
    type: String
  },
  iconLeft: {
    type: String
  },
  iconRight: {
    type: String
  },
  iconColor: {
    type: String
  },
  onlyIcon: {
    type: Boolean
  },
  shadow: {
    type: Boolean
  },
  rounded: {
    type: Boolean
  },
  outlined: {
    type: Boolean
  },
  size: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['small', 'normal', 'large'].includes(value)
    }
  },
})
// Classes
const rootClasses = computed(() => {
  return [
    'font-semibold text-sm rounded-xl',
    // Color
    props.color,
    // Border color
    props.borderColor,
    // Rounded
    {
      '!rounded-full': props.rounded
    },
    // Shadow
    {
      'shadow-button': props.shadow
    },
    // Outlined
    {
      'bg-white text-primary-900': props.outlined
    },
    // Size
    {
      'py-[7px] px-3 text-xs': props.size === 'small',
      'py-[9px] px-4': props.size === null || props.size === "normal",
      'py-[11px] px-4': props.size === 'large'
    },
    // onlyIcon
    {
      'py-[7px] px-0 text-xs w-[32px]': props.onlyIcon && props.size === 'small',
      'py-[9px] px-0 w-[40px]': props.onlyIcon && (props.size === null || props.size === "normal"),
      'py-[11px] px-0 w-[44px]': props.onlyIcon && props.size === 'large',
    }
  ]
})
</script>

<template>
  <Button
    :pt="{
      root: {
        class: rootClasses
      }
    }"
  >
    <template #default>
      <div class="flex items-center justify-center w-full">
        <template v-if="props.iconLeft">
          <base-icon
            :name="props.iconLeft"
            :color="props.iconColor"
            :class="{
              'mr-2': !props.onlyIcon,
              'text-greyscale-500': props.outlined
            }"
            width="20"
            height="20"
          />
        </template>

        <template v-if="props.label">
          {{ t(props.label) }}
        </template>

        <template v-if="props.iconRight">
          <base-icon
            :name="props.iconRight"
            :color="props.iconColor"
            :class="{
              'ml-2': !props.onlyIcon,
              'text-greyscale-500': props.outlined
            }"
            width="20"
            height="20"
          />
        </template>
      </div>
    </template>
  </Button>
</template>

<style scoped>

</style>
