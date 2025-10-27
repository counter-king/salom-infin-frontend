<script setup>
// Core
import {onMounted, ref, useModel} from "vue"
import axiosConfig from "@/services/axios.config"
// Components
import BaseDropdown from "@/components/UI/BaseDropdown.vue"

const props = defineProps({
  modelValue: {
    type: Object,
    default: []
  },
  required: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: ""
  },
  error: {
    type: Object,
    default: () => {}
  },
  apiUrl: {
    type: String,
    default: 'users'
  },
  apiParams: {
    type: Object,
    default: () => {}
  },
  optionLabel: {
    type: String,
    default: "name"
  },
  fillFirstItem: {
    type: Boolean,
    default: false
  }
})

const list = ref([])

const modelValue = useModel(props, 'modelValue')

const emit = defineEmits(['update:modelValue'])

// Methods
const loadList = async (params) => {
  let { data } = await axiosConfig.get(`${props.apiUrl}/`, params)
  if (data.hasOwnProperty('results')){
    list.value = data.results
  }else {
    list.value = data
  }
  if (props.fillFirstItem && list.value && list.value.length > 0) {
    fillFirstItem(list.value)
  }
}

const fillFirstItem = (list) => {
  modelValue.value = list[0]
}
// Hooks
onMounted(async () => {
  await loadList(props.apiParams)
})
</script>

<template>
  <base-dropdown
    v-model="modelValue"
    v-model:options="list"
    :error="props.error"
    :api-url="props.apiUrl"
    :api-params="props.apiParams"
    :option-label="props.optionLabel"
    :label="props.label"
    :placeholder="props.placeholder"
    :required="props.required"
    searchable
  >
  </base-dropdown>
</template>

<style scoped>

</style>
