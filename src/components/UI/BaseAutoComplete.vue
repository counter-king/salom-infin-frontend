<script setup>
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import ProgressSpinner from 'primevue/progressspinner';
import { useElementVisibility } from '@vueuse/core';
import { useSlots, computed, ref, watch } from 'vue';
const autocompleteConfig = {
   checkboxContainer: { class: 'hidden' },
   emptyMessage: { class: ['p-0'] },
   header: { class: ['hidden'] },
   input: { class: ['rounded-[12px] border-transparent focus:border-primary-500 w-full pr-[70px] pl-4 bg-transparent text-sm cursor-text'] },
   item: ({ context }) => ({ class: [ `p-0 transition-all hover:bg-greyscale-50 rounded-xl mt-[1px] ${context.focused && '!border-primary !bg-greyscale-50'}` ] }),
   label: { class: [ 'text-sm font-medium text-greyscale-500' ] },
   list: { class: ['py-0'] },
   option: { class: ['text-xs font-medium text-primary-900'] },
   panel: { class: ['translate-y-[8px] shadow-menu rounded-[12px] pt-[5px] pb-[6px] pl-[6px] pr-[6px]'] },
   root: { class: ['w-[500px] relative group bg-greyscale-50 rounded-[12px] border-transparent focus:border-primary-500 h-[44px]'] },
   token: { class: ['chip-hover shadow-button bg-white cursor-pointer'] },
   tokenLabel: { class: ['text-sm font-medium'] },
   trigger: { class: ['w-[32px] h-[32px] right-[40px] top-[4px] absolute bg-transparent'] },
};
const props = defineProps({
   key: String,
   label: String,
   loading: Boolean,
   noOptionsMessage: String,
   options: Array,
   page: Number,
   placeholder: String,
   value: [String, Boolean, Object],
});
const slot = useSlots();
const emit = defineEmits(['onChange', 'onInputChange']);
const dropdownRef = ref(null);
const loadingRef = ref(null);
const visible = useElementVisibility(loadingRef);
const newValue = computed(() => {
   const value = props.value;
   const newValue = typeof value === 'string' ? value : value[props.label];
   return newValue;
})
watch(visible, visible => {
   if(visible) {
      const search = typeof props?.value === 'string' ? props?.value : props?.value[props.label];
      emit('onInputChange', { search, page: props?.page });
   }
});
</script>
<template>
   <Dropdown
      :modelValue="newValue"
      :optionLabel="label"
      :optionValue="key"
      :options="options"
      :placeholder="placeholder"
      :pt="autocompleteConfig"
      :searchMessage="label"
      editable
      ref="dropdownRef"
      scrollHeight="258px"
      showClear
      @change="({ value, originalEvent }) => {
         if(originalEvent?.type === 'input') {
            emit('onInputChange', { search: value, page: 1 })
         } else {
            emit('onChange', value)
         }
      }"
      @click="() => {
         dropdownRef.show();
         emit('onInputChange', { search: newValue, page: 1 })
      }"
      >
      <template #clearicon>
         <div class="cursor-pointer absolute right-1.5 top-1 w-[32px] h-[32px] flex justify-center items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M18 9L12 15L6 9" stroke="#757994" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
         </div>
      </template>
      <template #value="{ value }">
         <div v-if="value" class="flex align-items-center">
            <div>{{ value[label] }}</div>
         </div>
         <span v-else>
            {{ slotProps.placeholder }}
         </span>
      </template>
      <template #dropdownicon>
         <template v-if="loading">
            <div class="flex items-center justify-center w-[36px] h-[36px]">
               <ProgressSpinner class="m-0 w-[28px] h-[28px]" animationDuration=".5s" strokeWidth="3.5" />
            </div>
         </template>
         <template v-else>
            <template v-if="value">
               <Button
                  @click="() => {
                     emit('onInputChange', { search: '', page: 1 })
                  }"
                  class="bg-greyscale-50 rounded-3xl cursor-pointer w-[30px] h-[30px] flex justify-center items-center p-button p-component font-semibold text-sm rounded-xl !rounded-full p-0 m-0 border-none"
                  rounded
                  type="button"
                  >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                     <path d="M12 4L4 12" stroke="#757994" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                     <path d="M4 4L12 12" stroke="#757994" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
               </Button>
            </template>
            <template v-else>
               <span></span>
            </template>
         </template>
      </template>
      <template #option="{ option, index }">
         <slot name="option" :option="option" />
         <template v-if="index === options.length - 1 && page">
            <div ref="loadingRef" class="flex items-center justify-center w-full h-[36px]">
               <ProgressSpinner class="m-0 w-[32px] h-[32px]" animationDuration=".5s" strokeWidth="4" />
            </div>
         </template>
      </template>
      <template #empty>
         <div class="flex items-center justify-center w-[100%] h-[40px] text-m font-medium text-primary-900">
            {{ noOptionsMessage }}
         </div>
      </template>
   </Dropdown>
</template>
<style></style>