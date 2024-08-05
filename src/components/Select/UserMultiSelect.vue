<script setup>
// Components
import {useModel} from "vue";
// Components
import BaseMultiSelect from '@/components/UI/BaseMultiSelect.vue';
import { UserWithLabel, UserWithRadio } from "@/components/Users";
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
        :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
        avatar-classes="w-5 h-5"
      />
    </template>

    <template #option="{ value }">
      <user-with-label
        :compact="true"
        :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
        avatar-classes="w-6 h-6"
      />
    </template>

    <template #hint="{ value }">
      <user-with-label
        :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
        shadow
        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
        avatar-classes="w-5 h-5"
      />
    </template>
  </base-multi-select>
</template>

<style scoped>

</style>
