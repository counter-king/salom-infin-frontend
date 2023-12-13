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
  }
});

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
      nav: { class: ['border-0', 'w-fit', 'bg-greyscale-50', 'rounded-xl', 'p-1'] },
      panelcontainer: { class: [props.panelContainerClass] }
    }"
  >
    <TabPanel
      v-for="(item, index) in tabPanelList"
      :key="item.title"
      :pt="{
        header: { class: ['rounded-xl', 'h-7'] },
        headeraction: ({ props, parent }) => ({
                        class: [panelClass(props, parent, index), 'h-7', 'border-0', 'rounded-lg', 'py-2', 'px-4']
                    }),
      }"
    >
      <template #header>
        <div class="flex items-center gap-x-2">
          <base-icon
            v-if="item.icon"
            :name="item.icon"
            width="16"
            height="16"
            :stroke="false"
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
