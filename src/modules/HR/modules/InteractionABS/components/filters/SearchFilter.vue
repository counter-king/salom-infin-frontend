<script setup>
// core
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
// components
import { MagniferIcon, CheckCircleBoldIcon } from '@/components/Icons';
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
const router = useRouter()
const route = useRoute()

// reactives
const search = ref('')
const selectedItem = computed(() => route.query[props.type])

// methods
const onSelectItem = (item) => {
  router.replace({
    query: {
      ...router.currentRoute.value.query,
      [props.type]: item.id
    }
  })
  props.parentRef.style = 'display: none'
}
// hooks
watch(search, (newVal) => {
  console.log("search", newVal)
  if(newVal.length){
    router.replace({
      query: {
        ...router.currentRoute.value.query,
        search: newVal
      }
    })
  } else {
    router.replace({
      query: {
        ...router.currentRoute.value.query,
        search: undefined
      }
    })
  }
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
      <template v-else>
        <div class="flex items-center justify-center p-1">
          <span class="text-xs font-medium text-white">Ничего не найдено</span>
        </div>
      </template>
    </div>
  </div>  
</template>
