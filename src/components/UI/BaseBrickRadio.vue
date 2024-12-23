<script setup>
// Core
import { useI18n } from "vue-i18n"
import { ref, watch, nextTick, onMounted } from "vue"

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

// Composable
const { t } = useI18n()
const emit = defineEmits(["emit:onChange"])

const activeTabStyle = ref({})
const rootRef = ref(null)

// Methods
const updateActiveTabPosition = () => {
  nextTick(() => {
    if (rootRef.value) {
      const activeTab = rootRef.value.querySelector(".tab-active")
      if (activeTab) {
        activeTabStyle.value = {
          width: `${activeTab.offsetWidth}px`,
          transform: `translateX(${activeTab.offsetLeft}px)`,
          transition: "transform 0.3s ease, width 0.3s ease",
        };
      }
    }
  });
};

watch(
  () => props.items,
  () => {
    updateActiveTabPosition()
  },
  { deep: true }
);

onMounted(() => {
  updateActiveTabPosition()
});
</script>

<template>
  <div
    ref="rootRef"
    class="relative flex items-center bg-greyscale-50 p-[2px] rounded-full w-fit select-none"
  >
    <div
      class="absolute bg-white rounded-[90px] shadow-button h-8 transition-all"
      :style="activeTabStyle"
    />

    <div
      v-for="(item, index) in props.items"
      :key="item.id"
      class="tab flex rounded-[90px] h-8 items-center px-4 gap-x-2 cursor-pointer relative z-10"
      :class="item.active ? 'tab-active' : ''"
      @click="emit('emit:onChange', item)"
    >
      <base-iconify
        v-if="item.icon"
        :icon="item.icon"
        class="!w-[18px] !h-[18px]"
        :class="item.active ? 'text-primary-500' : 'text-greyscale-400'"
      />
      <span
        class="text-sm font-semibold"
        :class="item.active ? 'text-greyscale-900' : 'text-greyscale-500'"
      >
          {{ t(item.title) }}
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>
