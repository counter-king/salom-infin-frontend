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
  buttonClass: {
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
  loading: {
    type: Boolean
  },
  size: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['small', 'normal', 'large'].includes(value)
    }
  },
  iconWidth: {
    type: [Number, String],
    default: 20
  },
  iconHeight: {
    type: [Number, String],
    default: 20
  },
})
// Classes
const rootClasses = computed(() => {
  return [
    'font-semibold text-sm rounded-xl',
    props.buttonClass,
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
      'py-[7px] px-3 text-xs': !props.onlyIcon && props.size === 'small',
      'py-[9px] px-4': !props.onlyIcon && (props.size === null || props.size === "normal"),
      'py-[11px] px-4': !props.onlyIcon && props.size === 'large'
    },
    // onlyIcon
    {
      'py-[7px] px-0 text-xs w-[32px] h-[32px]': props.onlyIcon && props.size === 'small',
      'py-[9px] px-0 w-[40px]': props.onlyIcon && (props.size === null || props.size === "normal"),
      'py-[11px] px-0 w-[44px]': props.onlyIcon && props.size === 'large',
    }
  ]
})
</script>

<template>
  <Button
    :loading="props.loading"
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
            :width="props.iconWidth"
            :height="props.iconHeight"
            :class="{
              'mr-2': !props.onlyIcon,
              'text-greyscale-500': props.outlined
            }"
          />
        </template>

        <slot name="label">
          <template v-if="props.label">
            {{ t(props.label) }}
          </template>
        </slot>

        <template v-if="props.iconRight">
          <base-icon
            :name="props.iconRight"
            :color="props.iconColor"
            :width="props.iconWidth"
            :height="props.iconHeight"
            :class="{
              'ml-2': !props.onlyIcon,
              'text-greyscale-500': props.outlined
            }"
          />
        </template>

        <template v-if="props.loading">
          <div
            class="absolute top-0 left-0 flex items-center justify-center w-full h-full"
            :class="props.color ? props.color : 'bg-primary-500'"
          >
            <base-spinner root-classes="!w-6 !h-6" />
          </div>
        </template>
      </div>
    </template>
  </Button>
</template>

<style scoped>

</style>
