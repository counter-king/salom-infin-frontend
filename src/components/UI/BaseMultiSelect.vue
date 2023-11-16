<script setup>
// Core
import { ref, computed, onMounted, useModel, unref } from 'vue'
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
const menuRef = ref(null)
const list = ref([])
const options = computed(() => props.options.length
  ? props.options
  : list.value
)
const optionsRest = computed(() => modelValue.value.map(option => {
  return {
    id: option.id,
    label: option.full_name
  }
}))
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
</script>

<template>
  <div class="app-multiselect">
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

    <div class="flex items-center gap-2">
      <div class="flex items-center flex-1 gap-2 py-2 truncate">
        <template v-for="user in modelValue">
          <slot name="hint" :value="user" />
        </template>

        <div></div>
      </div>

      <template v-if="modelValue.length >= 2">
        <base-button
          icon-right="AltArrowDownIcon"
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
                image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
                shape="circle"
                avatar-classes="w-5 h-5"
              />

              <h1 class="flex-1 text-xs font-semibold text-primary-900 mr-auto">{{ item.label }}</h1>

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
            </div>
          </template>
        </base-menu>
      </template>
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

.p-multiselect.p-focus {
  border-color: rgb(99 90 255 / 1);
}

.p-multiselect.p-invalid.p-component {
  border-color: #e24c4c !important;
}
</style>
