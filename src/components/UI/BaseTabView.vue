<script setup>
// Core
import { ref } from 'vue'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
// Components
import { FilePreview } from '@/components/Files'
// Macros
const props = defineProps({
  tabView: {
    type: Array,
    default: () => []
  },
  scrollable: {
    type: Boolean
  },
  truncate: {
    type: Boolean
  },
  segment: {
    type: Boolean
  },
  bricks: {
    type: Boolean
  },
  actions: {
    type: Boolean
  },
  navContainerClass: {
    type: String
  }
})
const emit = defineEmits(['emit:tab-click'])
// Reactive
const zoomDialog = ref(false)
const currentFile = ref(null)
// Methods
const panelClass = (_, parent, index) => {
  return [
    'font-semibold',
    {
      'text-primary-900 ': parent.state.d_activeIndex === index && !props.segment
    },
    {
      'text-primary-500 ': parent.state.d_activeIndex === index && props.segment
    },
    {
      'action-bricks bg-white text-primary-500 ': parent.state.d_activeIndex === index && props.bricks
    }
  ]
}
const zoomFile = (event, pane) => {
  event.stopImmediatePropagation()
  zoomDialog.value = true
  currentFile.value = pane
}
</script>

<template>
  <TabView
    :scrollable="props.scrollable"
    @update:activeIndex="(index) => emit('emit:tab-click', props.tabView[index])"
    :pt="{
      root: {
        class: 'flex flex-col h-full'
      },
      nav: {
        class: [
          {
            'px-2 border-b border-greyscale-200': !props.segment,
            'border-none': props.segment,
            '!p-1 !bg-greyscale-50 rounded-xl border-none': props.bricks
          }
        ]
      },
      previousButton: {
        class: ['shadow-none w-6 justify-start']
      },
      nextButton: {
        class: ['shadow-none w-6 justify-end']
      },
      navContainer: {
        class: [
          props.navContainerClass
        ]
      },
      panelContainer: {
        class: 'flex-1 p-0 overflow-hidden'
      }
    }"
  >
    <template v-for="(pane, index) in props.tabView">
      <TabPanel
        :pt="{
          content: {
            class: 'flex flex-col h-full'
          },
          header: {
            class: [
              {
                'flex-none': props.segment
              }
            ]
          },
          headerAction: ({ _, parent }) => ({
            class: [
              'font-medium !border-transparent bg-transparent text-greyscale-500',
              panelClass(_, parent, index),
              {
                'm-0 py-4 px-0 mx-4': !props.segment,
                'max-w-[200px] truncate': props.truncate,
                'py-2 px-3 rounded-[6px] !bg-greyscale-50 font-semibold mr-2': props.segment,
                '!m-0 !p-2 !rounded-lg': props.bricks
              }
            ]
          })
        }"
      >
        <template #header>
          <div
            class="flex items-center gap-2 overflow-hidden"
            :class="{ 'justify-center w-full': props.bricks }"
          >
            <base-icon
              v-if="pane.icon"
              :name="pane.icon"
              width="18"
              height="18"
            />

            <p
              class="text-[15px]"
              :class="{
                'truncate': props.truncate,
                '!text-sm': props.bricks
              }"
              v-tooltip.top="{
                value: props.truncate ? `<h4 class='text-xs text-white -my-1'>${pane.title}</h4>` : null,
                escape: true,
                autoHide: false
              }"
            >
              {{ pane.title }}
            </p>

            <template v-if="props.actions && pane.slot !== 'resolution'">
              <div class="flex gap-2">
                <button
                  type="button"
                  v-tooltip.top="{
                    value: `<h4 class='text-xs text-white -my-1'>Просмотр</h4>`,
                    escape: true,
                    autoHide: false
                  }"
                  class="hover:text-warning-500"
                  @click="zoomFile($event, pane)"
                >
                  <base-icon name="EyeIcon" width="18" />
                </button>

                <button
                  type="button"
                  v-tooltip.top="{
                    value: `<h4 class='text-xs text-white -my-1'>Скачать</h4>`,
                    escape: true,
                    autoHide: false
                  }"
                  class="hover:text-primary-500"
                >
                  <base-icon name="DownloadMinimalisticIcon" width="18" />
                </button>
              </div>
            </template>
          </div>
        </template>

        <slot :name="pane.slot" :value="pane" />
      </TabPanel>
    </template>
  </TabView>

  <base-dialog v-model="zoomDialog" max-width="max-w-[820px]">
    <template #header>
      <div class="flex-1 truncate mr-2">
        <h1 class="text-xl font-semibold truncate">{{ currentFile.title }}</h1>
      </div>
    </template>

    <template #content>
      <div class="-my-6 -mx-8 h-[80vh]">
        <file-preview :file="currentFile" />
      </div>
    </template>
  </base-dialog>
</template>

<style scoped>
.action-bricks > div > * {
  color: var(--primary-500)
}
</style>
