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
  required: {
    type: Boolean,
    default: true
  }
});
const modelValue = useModel(props, 'modelValue')

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <base-multi-select
    v-model="modelValue"
    api-url="companies"
    :api-params="{ condition: 'A' }"
    :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
    display="chip"
    selectable
    label="branch"
    :required="props.required"
    type="department"
    :selection-length="2"
    placeholder="enter-branch"
  >
    <template #chip="{ value }">
      {{ value.name }}
    </template>

    <template #option="{ value }">
      <user-with-radio
        :title="value.name"
        :text-truncate="false"
      >
      </user-with-radio>
    </template>
  </base-multi-select>
</template>

<style scoped>

</style>
