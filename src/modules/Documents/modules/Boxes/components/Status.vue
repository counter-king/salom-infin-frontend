<script setup>
// Core
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  status: {
    type: Boolean,
    default: null
  },
  type: {
    type: String,
    default: "approval",
    validator(value) {
      return ['approval', 'sign'].includes(value)
    }
  }
});

const { t } = useI18n();

const classes = computed(() => {
  const statusClasses = {
    true: "bg-success-50 text-success-500 border-success-500",
    false: "bg-critic-50 text-critic-500 border-critic-500",
    default: "bg-warning-50 text-warning-500 border-warning-500",
  };

  return statusClasses[props.status] || statusClasses.default;
});

const label = computed(() => {
  const statusNames = {
    approval: {
      true: t('agree'),
      false: t('not-agree'),
      default: t('pending'),
    },
    otherType: {
      true: t('signed'),
      false: t('rejected'),
      default: t('pending'),
    },
  };

  const type = statusNames[props.type] || statusNames.otherType;

  return type[props.status] || type.default;
});
</script>

<template>
  <span
    class="px-2 py-1 text-xs font-medium rounded-lg"
    :class="classes"
  >
    {{ label }}
  </span>
</template>

<style scoped>

</style>
