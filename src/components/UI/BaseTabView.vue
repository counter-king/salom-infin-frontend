<script setup>
// Core
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
// Macros
const props = defineProps({
  tabView: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['emit:tab-click'])
// Methods
const panelClass = (props, parent, index) => {
  return {
    'text-primary-900 font-semibold': parent.state.d_activeIndex === index
  }
}
</script>

<template>
  <TabView
    @update:activeIndex="(index) => emit('emit:tab-click', props.tabView[index])"
    :pt="{
      nav: {
        class: 'px-2 border-greyscale-200'
      }
    }"
  >
    <template v-for="(pane, index) in props.tabView">
      <TabPanel
        :pt="{
          headerAction: ({ props, parent }) => ({
            class: [panelClass(props, parent, index), 'text-greyscale-500 font-medium py-4 px-0 mx-4']
          })
        }"
      >
        <template #header>
          <div class="flex items-center gap-2">
            <base-icon
              v-if="pane.icon"
              :name="pane.icon"
              width="18"
              height="18"
            />

            <p class="text-[15px]">{{ pane.title }}</p>
          </div>
        </template>

        <slot :name="pane.slot" />
      </TabPanel>
    </template>
  </TabView>
</template>

<style scoped>

</style>
