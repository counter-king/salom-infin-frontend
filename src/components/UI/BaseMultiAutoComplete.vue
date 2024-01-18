<script setup>
import AutoComplete from 'primevue/autocomplete';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import { useSlots } from 'vue';
const slot = useSlots();
const emit = defineEmits(['onInputChange', 'onChange']);
const props = defineProps({
   key: String,
   label: String,
   loading: Boolean,
   noOptionMessage: String,
   options: Array,
   page: Number,
   placeholder: String,
   value: [String, Boolean, Object],
});
const autocompleteConfig = {
   checkboxContainer: { class: 'hidden' },
   container: { class: ['w-[500px] group bg-transparent p-0 rounded-[12px] border-none min-h-[44px]'] },
   dropdown: { class: ['bg-transparent border-0 shadow-none absolute w-[42px] h-[42px] left-[1px] top-[1px] rounded-xl'] },
   dropdownIcon: { class: ['w-4 h-4 bg-transparent'] },
   header: { class: ['hidden'] },
   input: { class: ['w-full pr-[70px] pl-4 text-sm w-full rounded-[12px] focus:border-primary-500 focus:border'] },
   inputToken: { class: ['p-0 w-full h-full'] },
   item: { class: ['p-0 transition-all hover:bg-greyscale-50 rounded-xl focus:bg-greyscale-50 mt-[1px]'] },
   label: { class: ['text-sm font-medium text-greyscale-500'] },
   list: { class: ['py-0'] },
   option: { class: ['text-xs font-medium text-primary-900'] },
   panel: { class: ['translate-y-[8px] shadow-menu rounded-[12px] p-2 user-search-autocomplete'] },
   root: { class: ['w-[500px] group bg-greyscale-50 rounded-[12px] h-[44px]'] },
   token: { class: ['chip-hover shadow-button bg-white cursor-pointer'] },
   tokenLabel: { class: ['text-sm font-medium'] },
};
</script>
<template>
   <AutoComplete
      :dataKey="key"
      :minLength="0"
      :modelValue="value"
      :optionLabel="label"
      :optionValue="key"
      :placeholder="placeholder"
      :pt="autocompleteConfig"
      :searchMessage="label"
      :selectionMessage="label"
      :suggestions="options"
      @input="e => emit('onInputChange', e)"
      autoOptionFocus
      completeOnFocus
      loading
      multiple
      scrollHeight="258px"
      >
      <template #dropdown>
         <template v-if="loading">
            <div class="right-1.5 top-1.5 absolute flex align-center justify-center w-[36px] h-[36px]">
               <ProgressSpinner class="m-0 w-[32px] h-[32px]" animationDuration=".5s" strokeWidth="3" />
            </div>
         </template>
         <template v-else>
            <template v-if="value && value?.length">
               <Button
                  @click="emit('onClear')"
                  class="right-1.5 top-1.5 absolute bg-greyscale-50 rounded-3xl cursor-pointer w-[32px] h-[32px] flex justify-center items-center p-button p-component font-semibold text-sm rounded-xl !rounded-full p-0 m-0 border-none bg-transparent"
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
      <template #loadingicon>
         <span class="hidden"></span>
      </template>
      <template #removetokenicon="{ index }">
         <div @click="() => { emit('onChange', value.filter((_, order) => order !== index)) }" class="flex justify-center items-center w-[20px] h-[20px] ml-1">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
               <path d="M12 4L4 12" stroke="#757994" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
               <path d="M4 4L12 12" stroke="#757994" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
         </div>
      </template>
      <template #option="{ option }">
         <slot name="option" :option="option" />
      </template>
      <template #empty>
         <div class="flex items-center justify-center w-[100%] h-[40px] text-m font-medium text-primary-900">
            {{ noOptionMessage }}
         </div>
      </template>
   </AutoComplete>
</template>
<style></style>