<script setup>
// Core
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import { saveAs } from 'file-saver'
// Components
import { DownloadMinimalisticIcon, EyeIcon } from '@/components/Icons'
import { FilePreview } from '@/components/Files'
// Composable
const { t } = useI18n()
// Macros
const props = defineProps({
  activeIndex: {
    type: Number
  },
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
  },
  headerActionClass: {
    type: String
  },
  titleClass: {
    type: String
  }
})
const emit = defineEmits(['emit:tab-click', 'update:active-index'])
// Reactive
const zoomDialog = ref(false)
const currentFile = ref(null)
// Computed
const activeIndex = computed({
  get() {
    return props.activeIndex
  },
  set(value) {
    emit('update:active-index', value)
  }
})
// Methods
const panelClass = (_, parent, index) => {
  return [
    'font-semibold',
    {
      'text-primary-900 !border-primary-500': parent.state.d_activeIndex === index && !props.segment
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
const download = (event, data) => {
  event.stopImmediatePropagation()
  data.url ?
    saveAs(data.url, data.url.name) :
    saveAs(data.blobUrl, data.name)
}
</script>

<template>
  <TabView
    v-model:active-index="activeIndex"
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
              'flex-1',
              {
                'flex-none': props.segment
              }
            ]
          },
          headerAction: ({ _, parent }) => ({
            class: [
              'font-medium border-transparent bg-transparent text-greyscale-500',
              panelClass(_, parent, index),
              {
                'm-0 pt-4 pb-[10px] px-0 mx-4': !props.segment,
                'max-w-[200px] truncate': props.truncate,
                'py-2 px-3 rounded-[6px] !bg-greyscale-50 font-semibold mr-2': props.segment,
                '!m-0 !p-2 !rounded-lg !border-transparent': props.bricks
              },
              props.headerActionClass
            ]
          })
        }"
      >
        <template #header>
          <div
            class="flex items-center gap-2 overflow-hidden"
            :class="{ 'justify-center w-full': props.bricks }"
          >
            <base-iconify
              v-if="pane.icon"
              :icon="pane.icon"
              class="!w-[18px] !h-[18px]"
            />

            <p
              class="flex items-center text-sm h-6"
              :class="[
                {
                'truncate': props.truncate,
                '!text-sm': props.bricks
                },
                props.titleClass
              ]"
              v-tooltip.top="{
                value: props.truncate ? `<h4 class='text-xs text-white -my-1'>${pane.title}</h4>` : null,
                escape: true,
                autoHide: false
              }"
            >
              {{ pane.title }}
            </p>

            <template v-if="props.actions && pane.slot !== 'resolution'">
              <div class="flex gap-[6px]">
                <button
                  type="button"
                  v-tooltip.top="{
                    value: `<h4 class='text-xs text-white -my-1'>${t('preview-text')}</h4>`,
                    escape: true,
                    autoHide: false
                  }"
                  class="group flex items-center justify-center w-6 h-6 rounded-[6px] bg-greyscale-50"
                  @click="zoomFile($event, pane)"
                >
                  <base-iconify :icon="EyeIcon" class="!w-4 !h-4 text-greyscale-500 group-hover:text-primary-500" />
                </button>

                <button
                  type="button"
                  v-tooltip.top="{
                    value: `<h4 class='text-xs text-white -my-1'>${t('download')}</h4>`,
                    escape: true,
                    autoHide: false
                  }"
                  class="group flex items-center justify-center w-6 h-6 rounded-[6px] bg-greyscale-50"
                  @click="download($event, pane)"
                >
                  <base-iconify :icon="DownloadMinimalisticIcon" class="!w-4 !h-4 text-greyscale-500 group-hover:text-primary-500" />
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
