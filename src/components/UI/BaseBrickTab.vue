<script setup>
// Core
import {useI18n} from "vue-i18n";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

const props = defineProps({
  tabPanelList: {
    type: Array,
    default: () => []
  },
  panelContainerClass: {
    type: String,
    default: ""
  },
  headerClasses: {
    type: String,
    default: "rounded-xl h-7"
  },
  navClasses: {
    type: String,
    default: ""
  },
  navContainerClasses: {
    type: String,
    default: ""
  },
  onTabChange: {
    type: Function,
    default: () => void 0
  }
});

// Methods
const onTabChange = (val) => {
  props.onTabChange(val);
};
const panelClass = (props, parent, index) => {
  return [
    {
      'bg-greyscale-50': parent.state.d_activeIndex !== index,
      'shadow-button': parent.state.d_activeIndex === index,
    }
  ];
};

const { t } = useI18n();
</script>

<template>
  <TabView
    :pt="{
      nav: { class: ['border-0', 'w-fit', 'bg-greyscale-50', 'rounded-xl', 'p-1', props.navClasses] },
      panelcontainer: { class: [props.panelContainerClass] },
      navcontainer: { class: props.navContainerClasses }
    }"
    @tab-change="onTabChange"
  >
    <TabPanel
      v-for="(item, index) in tabPanelList"
      :key="item.title"
      :pt="{
        header: { class: [props.headerClasses] },
        headeraction: ({ props, parent }) => ({
          class: [panelClass(props, parent, index), 'h-full', 'border-0', 'rounded-lg', 'py-2', 'px-4']
        }),
      }"
    >
      <template #header>
        <div class="flex items-center gap-x-1 justify-center w-full">
          <base-iconify
            v-if="item.icon"
            :icon="item.icon"
            class="!w-4 !h-4"
          />
          <span class="text-sm font-semibold">{{ t(item.title) }}</span>
        </div>
      </template>

      <slot :name="item.slot"></slot>
    </TabPanel>
  </TabView>
</template>

<style scoped>

</style>
