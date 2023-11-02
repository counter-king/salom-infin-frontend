<script setup>
// Core
import { ref, computed, onMounted, useModel } from 'vue'
import { useI18n } from 'vue-i18n'
import MultiSelect from 'primevue/multiselect'
import axiosConfig from "@/services/axios.config"
// Composable
const modelValue = useModel(props, 'modelValue')
const { t } = useI18n()
// Macros
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  apiUrl: {
    type: String,
    default: null
  },
  apiParams: {
    type: Object,
    default: () => {}
  },
  options: {
    type: Array,
    default: () => []
  },
  optionLabel: {
    type: String,
    default: 'name'
  },
  optionValue: {
    type: [Number, String]
  },
  border: {
    type: Boolean
  },
  placeholder: {
    type: String,
    default: 'create'
  },
  borderColor: {
    type: String
  },
  tokenClass: {
    type: Array,
    default: () => []
  },
  error: {
    type: Object,
    default: () => ({
      $error: false,
      $errors: []
    })
  },
  display: {
    type: String,
    default: 'comma',
    validator(value) {
      return ['comma', 'chip'].includes(value)
    }
  },
  size: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['x-small', 'small', 'normal', 'large'].includes(value)
    }
  },
})
// Reactive
const list = ref([])
const options = computed(() => props.options.length
  ? props.options
  : list.value
)
// Computed
const rootClasses = computed(() => {
  return [
    'group w-full bg-greyscale-50 rounded-xl border-greyscale-50 focus:border-primary-500',
    // Border
    props.borderColor,
    // Validation
    {
      'p-invalid !shadow-none': props.error.$error,
    },
    // Size
    {
      'size-small': props.size === 'small',
      'size-normal': props.size === null || props.size === 'normal',
    },
  ]
})
// Methods
const loadList = async (params) => {
  let { data } = await axiosConfig.get(`${props.apiUrl}/`, params)
  list.value = data.results
}
const removeItem = (event, value) => {
  event.stopImmediatePropagation()
  modelValue.value = modelValue.value.filter(item => item.id !== value.id)
}
// Hooks
onMounted(() => {
  // Если не переданы props.options
  if(!props.options.length) {
    loadList(props.apiParams)
  }
})
</script>

<template>
  <MultiSelect
    v-model="modelValue"
    :options="options"
    :option-label="props.optionLabel"
    :option-value="props.optionValue"
    :placeholder="t(props.placeholder)"
    :display="props.display"
    filter
    :pt="{
      root: {
        class: rootClasses
      },
      token: {
        class: props.tokenClass
      },
      tokenLabel: {
        class: ['text-sm font-medium']
      },
      label: {
        class: [
          'text-sm font-medium text-greyscale-500',
          {
            'size-small py-[2px] pr-2 pl-4': props.size === 'x-small',
            'size-small py-[5px] pr-2 pl-4': props.size === 'small',
            'size-normal py-3 pr-2 pl-4': props.size === null || props.size === 'normal',
          },
        ]
      },
      dropdownIcon: {
        class: ['w-4 h-4']
      },
      panel: {
        class: ['translate-y-[8px] shadow-menu rounded-2xl overflow-hidden']
      },
      header: {
        class: ['bg-white hidden']
      },
      list: {
        class: ['py-0']
      },
      checkboxContainer: {
        class: ['hidden']
      },
      item: {
        class: ['py-[6px] px-3 transition-all hover:bg-greyscale-50']
      },
      option: {
        class: ['text-sm font-medium text-primary-900']
      }
    }"
  >
    <template #header="{ value, options }">
      <div class="flex items-center border-b border-greyscale-200">
        <input
          type="text"
          placeholder="Введите имя..."
          class="flex-1 p-3 block outline-none font-medium text-sm text-gray-1"
        />
        <button
          v-tooltip.left="{
            value: `<h4 class='text-xs text-white -my-1'>Очистить</h4>`,
            escape: true,
            autoHide: false
          }"
          class="text-grey-500 ml-auto mr-3"
        >
          <base-icon name="XIcon" width="18" height="18" />
        </button>
      </div>
    </template>

    <template #chip="{ value }">
      <slot name="chip" :value="value" />
    </template>

    <template #option="{ option }">
      <slot name="option" :value="option" />
    </template>

    <template #removetokenicon="{ item }">
      <div @click="(event) => removeItem(event, item)">
        <slot name="removetokenicon" :item="item" />
      </div>
    </template>
  </MultiSelect>

  <template v-if="props.error.$errors.length">
    <div
      v-for="element of props.error.$errors"
      :key="element.$uid"
      class="mt-1"
    >
      <span class="block text-sm font-medium text-red-500">{{ element.$message }}</span>
    </div>
  </template>
</template>

<style>
.p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight {
  background: #EEF2FF !important;
}

.p-multiselect.p-focus {
  border-color: rgb(99 90 255 / 1);
}

.p-multiselect.p-invalid.p-component {
  border-color: #e24c4c !important;
}
</style>
