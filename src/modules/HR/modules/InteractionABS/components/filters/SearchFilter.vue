<script setup>
// core
import { ref, watch, computed, onUnmounted, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useDebounce } from '@vueuse/core';
// components
import { MagniferIcon, CheckCircleBoldIcon } from '@/components/Icons';
// composibles
import { useInfiniteScroll } from '../../composibles/useInfiniteScroll'

// props
const props = defineProps({
  apiList: {
    type: Array,
    default: () => []
  },
  apiAction: {
    type: Function,
    default: () => {}
  },
  type: {
    type: String,
    default: 'department'
  },
  apiParams: {
    type: Object,
    default: () => ({})
  }
})

// composibles
const { t } = useI18n()
const router = useRouter()
const route = useRoute()

// infinite scroll
const { moreLoderRef, resetList, hasMore } = useInfiniteScroll({
  page: 1,
  page_size: 20,
  ...props.apiParams
}, props.apiAction)

// reactives
const search = ref('')
const useDebounceSearch = useDebounce(search, 500)
const selectedItem = computed({
  get:()=> { return route.query[props.type]},
  set:()=> {}
})

// emit
const emit = defineEmits([
  'onChange'
])

// methods
const onSelectItem = (item) => {
  emit('onChange', item)
}

// hooks
watch(useDebounceSearch, (newVal) => {
  resetList({ search: newVal })
})

onMounted(() => {
  selectedItem.value = null
})

onUnmounted(() => {
  resetList()
})

</script>
<template>
  <div class="!w-[297px]">
    <base-input
      v-model="search"
      :placeholder="t('search')"
      class="w-full p-input-icon-left flex items-center"
      :icon-left="MagniferIcon"
      icon-left-class="!w-5 !h-5 text-white opacity-50 "
      input-class="!bg-[#3C3D43] border-none !focus:shadow-none !pl-10 px-3 py-2 bg-white text-white text-xs font-medium !rounded-[90px] placeholder:text-xs"
    />
    <div class="flex flex-col gap-2 mt-2 overflow-y-auto  max-h-[220px]"> 
      <template v-if="apiList.length">
        <template v-for="item in apiList" :key="item.id">
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
        <div v-if="hasMore" ref="moreLoderRef"></div>
      </template>
      <template v-else>
        <div class="flex items-center justify-center p-1">
          <span class="text-xs font-medium text-white">Ничего не найдено</span>
        </div>
      </template>
    </div>
  </div>  
</template>
