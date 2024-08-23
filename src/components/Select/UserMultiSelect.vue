<script setup>
// Components
import {useModel} from "vue";
// Components
import BaseMultiSelect from '@/components/UI/BaseMultiSelect.vue';
import { UserWithLabel, UserWithRadio, UserWithSelectable } from "@/components/Users";
import {isObject} from "@/utils";

const props = defineProps({
  modelValue: {
    type: [Array],
    default: []
  },
  required: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ""
  }
});
const modelValue = useModel(props, 'modelValue')

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <base-multi-select
    v-model="modelValue"
    api-url="users"
    :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
    display="chip"
    selectable
    :label="props.label"
    :required="props.required"
    type="user"
  >
    <template #chip="{ value }">
      <user-with-label
        :compact="true"
        :label="isObject(value?.user) ? value?.user.full_name : value?.full_name"
        :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
        color="#635AFF"
        avatar-classes="w-5 h-5"
      />
    </template>

    <template #option="{ value }">
      <user-with-selectable :items="[value]" />
    </template>

    <template #hint="{ value }">
      <user-with-label
        :label="isObject(value?.user) ? value?.user.full_name : value?.full_name"
        :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
        shadow
        color="#635AFF"
        avatar-classes="w-5 h-5"
      />
    </template>
  </base-multi-select>
</template>

<style scoped>

</style>
