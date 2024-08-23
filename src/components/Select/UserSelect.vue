<script setup>
// Core
import {onMounted, ref, useModel} from "vue"
import axiosConfig from "@/services/axios.config"
// Components
import BaseDropdown from "@/components/UI/BaseDropdown.vue"
import {isObject} from "@/utils";
import { UserWithLabel, UserWithSelectable } from "@/components/Users";

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
  }
});

const list = ref([])

const modelValue = useModel(props, 'modelValue')

const emit = defineEmits(['update:modelValue'])

// Methods
const loadList = async (params) => {
  let { data } = await axiosConfig.get(`users/`, params)
  if (data.hasOwnProperty('results')){
    list.value = data.results
  }else {
    list.value = data
  }
}
// Hooks
onMounted(async () => {
  await loadList(props.apiParams)
})
</script>

<template>
  <div class="user-select">
    <base-dropdown
      v-model="modelValue"
      v-model:options="list"
      :error="props.error"
      api-url="users"
      option-label="full_name"
      :label="props.label"
      :placeholder="props.placeholder"
      :required="props.required"
      searchable
    >
      <template #option="{ option }">
        <user-with-selectable :items="[option]" />
<!--        <user-with-label-->
<!--          :compact="true"-->
<!--          :label="isObject(option?.user) ? option?.user.full_name : option?.full_name"-->
<!--          :title="isObject(option?.user) ? option?.user.full_name : option?.full_name"-->
<!--          color="#635AFF"-->
<!--          avatar-classes="w-6 h-6"-->
<!--        />-->
      </template>
    </base-dropdown>
  </div>
</template>

<style scoped>

</style>
