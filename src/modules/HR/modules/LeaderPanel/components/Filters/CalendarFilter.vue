<script setup>
// core
import { ref,  computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
// components
import { CheckCircleBoldIcon } from '@/components/Icons';
import BaseCalendar from '@/components/UI/BaseCalendar.vue';
import { formatDateReverse } from '@/utils/formatDate';
// utils
// props
const props = defineProps({
  apiList: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: 'department'
  },
  parentRef: {
    type: Object,
    default: () => ({})
  }
})

// composibles
const { t } = useI18n()
const route = useRoute()
// emit
const emit = defineEmits([
  'onChange'
])

// reactives
const value = ref(null)

// methods
const onSelectItem = (item) => {
  emit('onChange', item)
}

</script>
<template>
  <div class="!w-full">
    <div class="flex flex-col gap-2 mt-2 overflow-y-auto"> 
    <base-calendar 
      v-model="value"
      @update:modelValue="(value) => onSelectItem(formatDateReverse(value))"
    />
    </div>
  </div>  
</template>
