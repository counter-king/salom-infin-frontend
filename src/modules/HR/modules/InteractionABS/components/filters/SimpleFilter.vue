<script setup>
// core
import { ref,  computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
// components
import { CheckCircleBoldIcon } from '@/components/Icons';
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
const selectedItem = computed(() => route.query[props.type])

// methods
const onSelectItem = (item) => {
  emit('onChange', item)
}
</script>
<template>
  <div class="!w-full">
    <div class="flex flex-col gap-2 mt-2 overflow-y-auto  max-h-[220px]"> 
      <template v-for="item in apiList" :key="item.id" v-if="apiList.length">
        <div
          class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
          @click="onSelectItem(item)"
          >
            <span class="text-xs font-medium text-white">{{ item.name }}</span>
            <!-- icon -->
            <div 
              class="rounded-full w-5 h-5 flex items-center justify-center relative"
              v-if="selectedItem == item.id"
              >
              <base-iconify :icon="CheckCircleBoldIcon" class="w-5 h-5 text-success-500 absolute z-[10]"/>
              <div class="rounded-full w-2 h-2 bg-white"></div>
            </div>
        </div> 
      </template>
    </div>
  </div>  
</template>
