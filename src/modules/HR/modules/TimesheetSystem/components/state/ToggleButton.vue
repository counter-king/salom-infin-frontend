<script setup>
//core
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
//components
import { CalendarBoldIcon } from '@/components/Icons'

const { t } = useI18n()
const route = useRoute()

const props = defineProps({
  activeTabView: {
    type: Number,
    default: 1
  },
  list: {
    type: Array,
    default: () => [{
      name: 'Calendar',
      icon: CalendarBoldIcon,
      value: 1
    }]
  }
})

// reactives
const activeTabView = ref(props.activeTabView)
// emits
const emit = defineEmits(['emit:onChange'])
// methods
const onChangeTabView = (view) => {
  activeTabView.value = view
  emit('emit:onChange', view)
}

</script>
<template>
  <div class="flex items-cente border border-greyscale-200 rounded-full p-[2px]">
    <template v-for="(item, index) in list" :key="index">
      <div
        @click="onChangeTabView(item.value)"
        class="flex items-center cursor-pointer gap-2 px-3 py-[10px] text-greyscale-500 font-medium text-xs rounded-full transition"
        :class="{'bg-white shadow text-greyscale-900': activeTabView === item.value}"
      >
        <slot :name="item.name">
          <base-iconify :icon="item.icon" class="!w-4 !h-4" :class="activeTabView === item.value? 'text-primary-500' : 'text-greyscale-500'"/>
        </slot>
        <span>{{ t(item.name) }}</span>
      </div>
    </template>
  </div>
</template>
<style scoped>
  .shadow {
    box-shadow: 0px 2px 4px 0px rgba(47, 61, 87, 0.03), 0px 1px 1px 0px rgba(95, 110, 169, 0.03);
  }
</style>
