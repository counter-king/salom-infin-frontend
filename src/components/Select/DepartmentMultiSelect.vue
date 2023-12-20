<script setup>
// Components
import {useModel} from "vue";
// Components
import BaseMultiSelect from '@/components/UI/BaseMultiSelect.vue';
import {UserWithLabel, UserWithRadio} from "@/components/Users";
import {isObject} from "@/utils";

const props = defineProps({
  modelValue: {
    type: [Array],
    default: []
  },
});
const modelValue = useModel(props, 'modelValue')

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <base-multi-select
    v-model="modelValue"
    api-url="departments"
    :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
    display="chip"
    selectable
    label="department"
    required
    type="department"
  >
    <template #chip="{ value }">
      {{ value.name }}
    </template>

    <template #option="{ value }">
      <user-with-radio
        :title="value.name"
      >
      </user-with-radio>
    </template>
  </base-multi-select>
</template>

<style scoped>

</style>
