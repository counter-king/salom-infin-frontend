<script setup>
// Core
import { useI18n } from "vue-i18n"
// Components
import Empty from "@/components/Empty.vue"
import { PenIcon, TrashBinTrashIcon } from "@/components/Icons"

// Props
const props = defineProps({
  headers: {
    type: Array,
    default: () => []
  },
  list: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  actions: {
    type: Array,
    default: () => []
  },
  actionButtonClasses: {
    type: String,
  },
  emptyTitle: {
    type: String,
    default: "no-data"
  },
  emptyDescription: {
    type: String,
  },
  scrollHeight: {
    type: String,
    default: "h-[400px]"
  }
})

// Composable
const { t } = useI18n()

// Methods
const onRowClick = (row) => {
  emits('emit:onRowClick', row)
}
const onEdit = (event, row) => {
  event.stopImmediatePropagation()
  emits('emit:onEdit', row)
}
const onDelete = (event, row) => {
  event.stopImmediatePropagation()
  emits('emit:onDelete', row)
}

// Emit
const emits = defineEmits(['emit:onRowClick', 'emit:onEdit', 'emit:onDelete'])
</script>

<template>
  <div class="border border-greyscale-200 rounded-lg overflow-hidden">
    <!-- Fixed header -->
    <table class="w-full border-collapse">
      <thead>
      <tr class="bg-greyscale-50">
        <td
          v-for="header in headers"
          :key="header.field"
          class="px-4 h-14 text-sm text-greyscale-500 font-medium border-b border-greyscale-200 text-left"
          :style="{ width: header.width }"
        >
          {{ t(header.header) }}
        </td>
      </tr>
      </thead>
    </table>

    <!-- Scrollable body -->
    <div
      class="overflow-y-auto"
      :class="scrollHeight"
    >
      <table class="w-full border-collapse">
        <tbody>
        <template v-if="!loading">
          <template v-if="list?.length">
            <tr
              v-for="(row, index) in list"
              :key="index"
              class="hover:bg-greyscale-50 cursor-pointer"
              :class="row.active ? 'bg-greyscale-50' : ''"
              @click="onRowClick(row)"
            >
              <td
                v-for="item in headers"
                :key="item.field"
                class="h-14 px-4 border-t border-greyscale-200"
                :style="{ width: item.width }"
              >
                <slot :name="item.field" :data="row">
                  <span class="text-sm text-greyscale-900 font-medium">{{ row[item.field] }}</span>

                  <div
                    v-if="item.field === 'actions'"
                    class="flex items-center gap-x-2 justify-center"
                  >
                    <div
                      v-if="actions.includes('edit')"
                      class="flex justify-center items-center w-8 h-8 rounded-lg bg-greyscale-50"
                      :class="actionButtonClasses"
                      @click.prevent="onEdit($event, row)"
                    >
                      <base-iconify :icon="PenIcon" class="text-greyscale-500"/>
                    </div>

                    <div
                      v-if="actions.includes('delete')"
                      class="flex justify-center items-center w-8 h-8 rounded-lg bg-greyscale-50"
                      :class="actionButtonClasses"
                      @click.prevent="onDelete($event, row)"
                    >
                      <base-iconify :icon="TrashBinTrashIcon" class="text-critic-500"/>
                    </div>
                  </div>
                </slot>
              </td>
            </tr>
          </template>

          <template v-else>
            <tr>
              <td :colspan="headers.length">
                <empty
                  :title="emptyTitle"
                  :description="emptyDescription"
                  class="h-[calc(100vh-655px)] shadow-none"
                />
              </td>
            </tr>
          </template>
        </template>

        <template v-else>
          <tr>
            <td :colspan="headers.length">
              <base-spinner app-classes="h-[300px]"/>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>
