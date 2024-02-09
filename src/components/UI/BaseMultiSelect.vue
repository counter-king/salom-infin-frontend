<script setup>
// Core
import { ref, computed, onMounted, useModel, unref, watch } from 'vue'
import { useDebounce } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import MultiSelect from 'primevue/multiselect'
import axiosConfig from "@/services/axios.config"
// Utils
import { isObject } from '@/utils'
// Composable
const modelValue = useModel(props, 'modelValue')
const { t } = useI18n()
// Macros
const emit = defineEmits(['update:modelValue', 'emit:select-item'])
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean
  },
  label: {
    type: String,
    default: null
  },
  required: {
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
    default: 'search'
  },
  menuPlaceholder: {
    type: String,
    default: 'search'
  },
  borderColor: {
    type: String
  },
  tokenClass: {
    type: Array,
    default: () => []
  },
  selectable: {
    type: Boolean
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
  type: {
    type: String,
    default: 'user',
    validator(value) {
      return ['user', 'department'].includes(value)
    }
  }
})
// Reactive
const menuRef = ref(null)
const inputRef = ref(null)
const list = ref([])
const search = ref(null)
// Composable
const debounced = useDebounce(search, 500)
// Computed
const options = computed(() => props.options.length
  ? props.options
  : list.value
)
const optionsRest = computed(() => modelValue.value.map(option => {
  if (props.type === 'user') {
    return {
      id: isObject(option.user) ? option.user.id : option.id,
      label: isObject(option.user) ? option.user.full_name : option.full_name,
      image: isObject(option.user) ? option.user.image : option.image
    }
  } else if (props.type === 'department') {
    return {
      id: option.id,
      label: option.name,
      image: null
    }
  }
}))
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
  if (data.hasOwnProperty('results')){
    list.value = data.results
  }else {
    list.value = data
  }

}
const removeItem = (event, value) => {
  event.stopImmediatePropagation()
  modelValue.value = modelValue.value.filter(item => isObject(value.user)
    ? item.user?.id !== value.user?.id
    : isObject(item.user)
      ? item.user?.id !== value.id
      : item.id !== value.id
  )
}
const selectItem = (event, value) => {
  search.value = null
  emit('emit:select-item', value)
}
const toggle = (event) => {
  const _menuRef = unref(menuRef)
  _menuRef.menuRef.toggle(event)
}
// Hooks
onMounted(async () => {
  // Если не переданы props.options
  if(!props.options.length) {
    await loadList(props.apiParams)
  }
})
// Watch
watch(debounced, async () => {
  // Если не переданы props.options
  if(!props.options.length) {
    await loadList({
      ...props.apiParams,
      search: search.value
    })
  }
  else {
    console.log('filter is not done for props options :)')
  }
})
</script>

<template>
  <div class="app-multiselect">
    <base-label :label="props.label" :required="props.required" />

    <MultiSelect
      v-model="modelValue"
      :options="options"
      :option-label="props.optionLabel"
      :option-value="props.optionValue"
      :placeholder="t(props.placeholder)"
      :display="props.display"
      :disabled="props.disabled"
      filter
      @show="() => inputRef.focus()"
      :pt="{
        root: {
          class: rootClasses
        },
        token: {
          class: [
            props.tokenClass,
            'chip-hover shadow-button bg-white cursor-pointer'
          ]
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
            }
          ]
        },
        dropdownIcon: {
          class: ['w-3 h-3']
        },
        panel: {
          class: ['translate-y-[8px] shadow-menu rounded-2xl overflow-hidden']
        },
        header: {
          class: ['bg-white hidden']
        },
        list: {
          class: [
            'py-0',
            {
              'py-1 px-2': props.selectable
            }
          ]
        },
        checkboxContainer: {
          class: 'hidden'
        },
        item: {
          class: [
            'py-[6px] px-3 transition-all hover:!bg-greyscale-50',
            {
              'item-selectable border border-solid border-transparent rounded-xl mb-1': props.selectable
            }
          ]
        },
        option: {
          class: ['text-sm font-medium text-primary-900']
        },
        emptyMessage: {
          class: ['text-sm font-medium text-center']
        }
      }"
    >
      <template #header="{ value, options }">
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

      <template #chip="{ value }">
        <slot name="chip" :value="value" />
      </template>

      <template #option="{ option }">
        <div
          class="absolute top-0 left-0 w-full h-full"
          @click="(event) => selectItem(event, option)"
        ></div>
        <slot name="option" :value="option" />
      </template>

      <template #removetokenicon="{ item }">
        <div @click="(event) => removeItem(event, item)">
          <slot name="removetokenicon" :item="item">
            <base-icon name="XIcon" width="16" height="16" class="ml-[6px] hover:text-critic-500" />
          </slot>
        </div>
      </template>
    </MultiSelect>

    <div v-if="modelValue.length !== 0" class="flex items-center gap-2">
      <div class="flex items-center flex-1 gap-2 py-2 truncate">
        <template v-for="user in modelValue">
          <slot name="hint" :value="user" />
        </template>
      </div>

      <base-button
        icon-right="AltArrowDownIcon"
        icon-height="16"
        button-class="shadow-md border-t border-r border-l border-greyscale-100"
        rounded
        outlined
        size="small"
        icon-width="18"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        @click="toggle"
      >
        <template #label>
          <span class="text-sm">+{{ modelValue.length }}</span>
        </template>
      </base-button>

      <base-menu
        ref="menuRef"
        id="overlay_menu"
        :items="optionsRest"
        width="w-52"
      >
        <template #item="{ item }">
          <div class="flex items-center gap-2 cursor-pointer py-[0.375rem] px-2">
            <base-avatar
              v-if="item.image"
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
              shape="circle"
              avatar-classes="w-5 h-5"
            />

            <h1 class="flex-1 text-xs font-semibold text-primary-900 mr-auto">{{ item.label }}</h1>

            <template v-if="!props.disabled">
              <button
                v-tooltip.right="{
                  value: `<h4 class='text-xs text-white -my-1'>Удалить</h4>`,
                  escape: true,
                  autoHide: false
                }"
                @click="(event) => removeItem(event, item)"
              >
                <base-icon name="TrashIcon" width="16" class="text-critic-500" />
              </button>
            </template>
          </div>
        </template>
      </base-menu>
    </div>

    <template v-if="props.error.$errors.length">
      <div
        v-for="element of props.error.$errors"
        :key="element.$uid"
        class="mt-1"
      >
        <span class="block text-sm font-medium text-red-500">{{ element.$message }}</span>
      </div>
    </template>
  </div>
</template>

<style>
.p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight {
  background: #EEF2FF !important;
}

.p-multiselect.p-focus,
.p-multiselect-item.p-highlight.item-selectable {
  border-color: rgb(99 90 255 / 1);
}

.p-multiselect.p-invalid.p-component {
  border-color: #e24c4c !important;
}

.p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight.item-selectable {
  background: transparent !important;
}
</style>
