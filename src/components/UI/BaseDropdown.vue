<script setup>
// Core
import { useModel, ref, watch, computed } from 'vue'
import { useDebounce } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import Dropdown from 'primevue/dropdown'
// Services
import axiosConfig from '@/services/axios.config'
// Composable
const modelValue = useModel(props, 'modelValue')
const { t } = useI18n()
// Macros
const props = defineProps({
  modelValue: {
    type: [Number, String, Object]
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
  disabled: {
    type: Boolean
  },
  optionDisabled: {
    type: [Function],
    default: () => void 0
  },
  label: {
    type: String,
    default: null
  },
	searchable: {
		type: Boolean
	},
	apiUrl: {
		type: String,
		default: null
	},
	apiParams: {
		type: Object,
		default: () => {}
	},
  placeholder: {
    type: String,
    default: 'choose-one'
  },
	menuPlaceholder: {
		type: String,
		default: 'search'
	},
  required: {
    type: Boolean
  },
  border: {
    type: Boolean
  },
  borderColor: {
    type: String
  },
  rootClass: {
    type: String
  },
  error: {
    type: Object,
    default: () => ({
      $error: false,
      $errors: []
    })
  },
  size: {
    type: String,
    default: 'normal',
    validator(value) {
      return ['x-small', 'small', 'normal', 'large'].includes(value)
    }
  },
})
const emit = defineEmits(['update:modelValue', 'update:options', 'emit:change'])
// Reactive
const inputRef = ref(null)
const search = ref(null)
const list = ref([])
// Composable
const debounced = useDebounce(search, 500)
// Computed
const rootClasses = computed(() => {
  return [
    'group w-full bg-greyscale-50 rounded-xl border-greyscale-50 focus:border-transparent',
    // Root
    props.rootClass,
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
const options = computed({
	get() {
		return props.options
	},
	set(value) {
		emit('update:options', value)
	}
})
// Watch
watch(debounced, async () => {
	props.searchable && await loadList({
		...props.apiParams,
		search: search.value
	})
})
// Methods
const loadList = async (params) => {
	let { data } = await axiosConfig.get(`${props.apiUrl}/`, params)
	options.value = data.results
}
</script>

<template>
  <div class="app-input">
    <base-label :label="props.label" :required="props.required" />

    <Dropdown
      v-model="modelValue"
      :options="options"
      :option-label="props.optionLabel"
      :option-value="props.optionValue"
      :option-disabled="props.optionDisabled"
      :placeholder="t(props.placeholder)"
      :disabled="props.disabled"
      filter
      @show="() => props.searchable && inputRef.focus()"
      @change="({ value }) => emit('emit:change', value)"
      :pt="{
        root: {
          class: rootClasses
        },
        input: {
          class: [
            'text-sm font-regular text-greyscale-400',
            {
              'text-greyscale-900 !font-medium': modelValue
            },
            {
              'size-small py-[2px] pr-2 pl-4': props.size === 'x-small',
              'size-small py-[5px] pr-2 pl-4': props.size === 'small',
              'size-normal py-2 pr-2 pl-3': props.size === null || props.size === 'normal',
            },
          ]
        },
        header: {
					class: ['bg-white hidden']
        },
        panel: {
          class: ['translate-y-[8px] shadow-menu rounded-2xl overflow-hidden']
        },
        list: {
          class: ['py-0']
        },
        dropdownIcon: {
          class: 'w-3 h-3'
        },
        item: {
          class: ['py-[6px] px-3 text-sm font-medium text-primary-900 transition-all hover:!bg-greyscale-50']
        },
        option: {
          class: ['text-sm font-medium text-primary-900']
        },
        emptyMessage: {
          class: ['text-sm font-medium text-center']
        }
      }"
    >
	    <template
		    v-if="props.searchable"
		    #header="{ value, options }"
	    >
		    <div class="flex items-center border-b border-greyscale-200 px-3">
          <base-icon name="MagniferIcon" width="16" />

			    <input
            ref="inputRef"
				    v-model="search"
				    type="text"
				    :placeholder="t(props.menuPlaceholder)"
				    class="flex-1 p-3 block outline-none font-medium text-sm text-gray-1"
			    />
			    <button
				    v-tooltip.left="{
	            value: `<h4 class='text-xs text-white -my-1'>Очистить</h4>`,
	            escape: true,
	            autoHide: false
	          }"
				    class="text-grey-500 ml-auto"
				    @click="search = null"
			    >
				    <base-icon name="XIcon" width="18" height="18" />
			    </button>
		    </div>
	    </template>

      <template #value="{ value }">
        <slot name="value" :value="value" />
      </template>

	    <template #option="{ option }">
		    <slot name="option" :option="option" />
	    </template>

      <template #dropdownicon>
        <slot name="dropdownicon">
          <base-icon name="AltArrowDownIcon" width="18" />
        </slot>
      </template>
    </Dropdown>

    <template v-if="props.error.$errors.length">
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

<style>
.p-dropdown.p-focus {
  border-color: transparent !important;
  box-shadow: none !important;
  /* border-color: rgb(99 90 255 / 1); */
}

.p-dropdown.p-invalid.p-component {
  border-color: #e24c4c !important;
}
</style>
