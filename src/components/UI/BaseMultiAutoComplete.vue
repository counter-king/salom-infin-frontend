<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import ProgressSpinner from 'primevue/progressspinner';
import { ref, useSlots, watch } from 'vue';
import { useElementVisibility } from '@vueuse/core';
const autocompleteConfig = {
   checkboxContainer: { class: 'hidden' },
   dropdownIcon: { class: ['w-4 h-4'] },
   emptyMessage: { class: ['text-sm font-medium text-center'] },
   header: { class: ['bg-white hidden'] },
   item: ({ context }) => ({ class: [`p-0 rounded-xl transition-all flex flex-col hover:!p-highlight ${context.focused && '!border-primary p-highlight'}`] }),
   label: { class: [ 'text-sm px-4 pr-[70px] py-0.5 h-full flex items-center flex flex-wrap' ] },
   list: { class: ['py-0'] },
   option: { class: ['text-sm font-medium text-primary-900'] },
   panel: { class: ['translate-y-[8px] shadow-menu rounded-2xl overflow-hidden'] },
   root: ({state}) => ({ class: [`w-[500px] relative group bg-greyscale-50 rounded-[12px] border-transparent focus:border-primary-500 min-h-[44px] ${state.focused && '!border-primary-500'}`] }),
   token: { class: ['chip-hover shadow-button m-0.5 bg-white cursor-pointer'] },
   tokenLabel: { class: ['text-sm font-medium'] },
   trigger: { class: ['w-[70px] h-[32px] flex items-center justify-end right-[6px] top-[4px] absolute bg-transparent'] },
   wrapper: { class: ['p-2 pt-0'] },
};
const slot = useSlots();
const emit = defineEmits(['onInputChange', 'onChange']);
const props = defineProps({
   dropdownPlaceholder: String,
   inputValue: String,
   loading: Boolean,
   noOptionsMessage: String,
   optionKey: String,
   optionLabel: String,
   options: Array,
   page: Number,
   placeholder: String,
   value: Array,
});
const dropdownRef = ref(null);
const inputRef = ref(null);
const loadingRef = ref(null);
const visible = useElementVisibility(loadingRef);
const removeItem = (e, item) => {
   e.preventDefault();
   e.stopPropagation();
   dropdownRef.value.show();
   const newValue = props.value.filter(option => option[props.optionKey] !== item[props.optionKey]);
   emit('onChange', newValue);
   emit('onInputChange', { search: '', page: 1 });
};
const clearValue = (e) => {
   e.preventDefault();
   e.stopPropagation();
   dropdownRef.value.show();
   emit('onChange', []);
   emit('onInputChange', { search: '', page: 1 });
};
const inputChange = search => {
   emit('onInputChange', { search, page: 1 });
};
const clearInput = () => {
   emit('onInputChange', { search: '', page: 1 });
};
const show = () => {
   inputRef.value.$el.focus();
   emit('onInputChange', { search: '', page: 1 });
};
const change = value => {
   emit('onChange', value.value);
   dropdownRef.value.hide();
   emit('onInputChange', { search: '', page: 1 });
};
watch(visible, visible => {
   if(visible) {
      emit('onInputChange', { search: props.inputValue, page: props?.page });
   }
});
</script>
<template>
   <MultiSelect
      :modelValue="value"
      :optionLabel="optionLabel"
      :options="options"
      :placeholder="dropdownPlaceholder"
      :pt="autocompleteConfig"
      @change="change"
      @show="show"
      autoFilterFocus
      autoOptionFocus
      display="chip"
      filter
      ref="dropdownRef"
      scrollHeight="258px"
   >
      <template #header>
         <div class="flex items-center h-[60px] p-2 border-greyscale-200">
            <div class="flex items-center justify-center w-[36px] h-[36px] absolute top-[12px] left-[13px]">
               <i class="pi pi-search" />
            </div>
            <InputText
               :modelValue="inputValue"
               :placeholder="placeholder"
               @update:modelValue="inputChange"
               class="rounded-[12px] border-transparent focus:border-primary-500 w-full h-full px-[40px] bg-greyscale-50 text-sm cursor-text"
               ref="inputRef"
               type="text"
            />
            <template v-if="loading">
               <div class="flex items-center justify-center w-[36px] h-[36px] absolute top-3.5 right-3">
                  <ProgressSpinner class="m-0 w-[28px] h-[28px]" animationDuration=".5s" strokeWidth="3.5" />
               </div>
            </template>
            <template v-else-if="inputValue">
               <div @click="clearInput" class="flex items-center justify-center w-[36px] h-[36px] absolute top-[11px] right-[13px] cursor-pointer">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                     <path d="M12 4L4 12" stroke="#757994" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                     <path d="M4 4L12 12" stroke="#757994" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
               </div>
            </template>
         </div>
      </template>
      <template #option="{ option, index }">
         <slot name="option" :option="option" />
         <template v-if="index === options.length - 1 && page">
            <div ref="loadingRef" class="flex items-center justify-center w-full h-[36px]">
               <ProgressSpinner class="m-0 w-[32px] h-[32px]" animationDuration=".5s" strokeWidth="4" />
            </div>
         </template>
      </template>
      <template #dropdownicon>
         <template v-if="value.length">
            <Button
               @click="clearValue"
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
         <div class="cursor-pointer w-[32px] h-[32px] flex justify-center items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
               <path d="M18 9L12 15L6 9" stroke="#757994" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
         </div>
      </template>
      <template #chip="{ value }">
         <slot name="chip" :value="value" :removeItem="removeItem" />
      </template>
      <template #removetokenicon>
         <span class="hidden"></span>
      </template>
      <template #emptyfilter>
         <div class="flex items-center justify-center w-[100%] h-[40px] text-m font-medium text-primary-900">
            {{ noOptionsMessage }}
         </div>
      </template>
   </MultiSelect>
</template>
<style></style>