<script setup>
import { useModel } from 'vue'
import TreeSelect from 'primevue/treeselect'
import { useI18n } from 'vue-i18n'
import { CircleIcon, AltArrowRightIcon, AltArrowDownIcon } from '@/components/Icons'
import BaseIconify from '@/components/UI/BaseIconify.vue'

const props = defineProps({
  modelValue: {
    type: [Number, String, Object, Array]
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String
  },
  error: {
    type: Object,
    default: () => {}
  },
  label: {
    type: String,
    default: null
  },
  required: {
    type: Boolean
  },
})

const modelValue = useModel(props, 'modelValue')
const { t } = useI18n()
</script>

<template>
  <div class="app-input">
    <base-label :label="label" :required="required" />

    <TreeSelect
      v-model="modelValue"
      :options="options"
      :placeholder="t(placeholder)"
      :pt="{
        root: {
          class: [
            'w-full bg-greyscale-50 rounded-xl border-greyscale-50 focus:border-transparent size-normal h-11',
            {
              'p-invalid !shadow-none': props.error.$error
            }
          ]
        },
        label: {
          class: 'text-sm text-greyscale-400 py-[10px] pr-2'
        },
        triggerIcon: {
          class: '!w-[14px] !h-[14px]'
        },
        tree: {
          root: {
            class: 'p-0'
          },
          content: {
            class: 'p-1'
          },
          label: {
            class: 'text-sm'
          },
          nodeIcon: {
            class: 'm-0'
          },
          toggler: {
            class: '!visible mr-0'
          },
          togglerIcon: {
            class: '!w-[14px] !h-[14px]'
          }
        }
      }"
    >
      <template #value="{ value }">
        <span :class="value[0]?.label ? 'text-primary-900 font-medium' : null">{{ value[0]?.label ?? t(placeholder) }}</span>
      </template>

      <template #itemtogglericon="{ node, expanded }">
        <template v-if="node?.icon">
          <base-iconify :icon="CircleIcon" class="!w-[14px] !h-[14px]" />
        </template>

        <template v-if="!node?.icon">
          <base-iconify :icon="expanded ? AltArrowDownIcon : AltArrowRightIcon" class="!w-[18px] !h-[18px]" />
        </template>
      </template>
    </TreeSelect>

    <template v-if="props.error?.$errors?.length">
      <div class="space-y-1 mt-2">
        <div
          v-for="element of props.error.$errors"
          :key="element.$uid"
        >
          <span class="block text-sm font-medium text-red-500">{{ element.$message }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.p-treeselect.p-focus {
  border-color: transparent !important;
  box-shadow: none !important;
}

.p-treeselect.p-invalid.p-component {
  border-color: #e24c4c !important;
}
</style>
