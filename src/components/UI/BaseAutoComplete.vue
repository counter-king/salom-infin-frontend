<script setup>
import AutoComplete from 'primevue/autocomplete';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import { useSlots, computed, ref } from 'vue';
import Dropdown from 'primevue/dropdown';
const slot = useSlots();
const emit = defineEmits(['onInputChange', 'onChange', 'onClear']);
const dropdownRef = ref(null);
const props = defineProps({
   key: String,
   label: String,
   loading: Boolean,
   noOptionMessage: String,
   options: Array,
   placeholder: String,
   value: [String, Boolean, Object],
});
const newValue = computed(() => {
   const value = props.value;
   const newValue = typeof value === 'string' ? value : value[props.label];
   return newValue;
})
const autocompleteConfig = {
   checkboxContainer: { class: 'hidden' },
   trigger: { class: ['w-[32px] h-[32px] right-[6px] top-[6px] absolute bg-transparent'] },
   header: { class: ['bg-white hidden'] },
   input: { class: ['rounded-[12px] border-transparent focus:border-primary-500 w-full px-11 bg-transparent text-sm cursor-text'] },
   item: { class: [ 'p-0 transition-all hover:bg-greyscale-50 rounded-xl focus:border-primary focus:bg-greyscale-50 mt-[1px]'] },
   label: { class: [ 'text-sm font-medium text-greyscale-500' ] },
   list: { class: ['py-0'] },
   option: { class: ['text-xs font-medium text-primary-900 focus:border-primary'] },
   panel: { class: ['translate-y-[8px] shadow-menu rounded-[12px] pt-[5px] pb-[6px] pl-[6px] pr-[6px] user-search-autocomplete'] },
   root: { class: ['w-[500px] relative group bg-greyscale-50 rounded-[12px] border-transparent focus:border-primary-500 h-[44px]'] },
   token: { class: ['chip-hover shadow-button bg-white cursor-pointer'] },
   tokenLabel: { class: ['text-sm font-medium'] },
   emptyMessage: {class: ['p-0']}
};
</script>
<template>
   <Dropdown
      :dataKey="key"
      :modelValue="newValue"
      :optionLabel="label"
      :options="options"
      :placeholder="placeholder"
      :pt="autocompleteConfig"
      :searchMessage="label"
      @update:modelValue="e => emit('onInputChange', e)"
      editable
      ref="dropdownRef"
      scrollHeight="258px"
      showClear
      @focus="() => {
         dropdownRef.show();
         emit('onInputChange', newValue)
      }"
      >
      <template #clearicon>
         <div class="cursor-pointer absolute left-1.5 top-1 w-[32px] h-[32px] flex justify-center items-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
               <g clip-path="url(#clip0_2859_31081)">
                  <circle cx="9.58317" cy="9.58268" r="7.91667" stroke="#757993" stroke-width="1.5"/>
                  <path d="M15.4165 15.416L18.3332 18.3327" stroke="#757993" stroke-width="1.5" stroke-linecap="round"/>
               </g>
               <defs>
                  <clipPath id="clip0_2859_31081">
                     <rect width="20" height="20" fill="white"/>
                  </clipPath>
               </defs>
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
               <ProgressSpinner class="m-0 w-[30px] h-[30px]" animationDuration=".5s" strokeWidth="3.5" />
            </div>
         </template>
         <template v-else>
            <template v-if="value">
               <Button
                  @click="emit('onClear')"
                  class="bg-greyscale-50 rounded-3xl cursor-pointer w-[32px] h-[32px] flex justify-center items-center p-button p-component font-semibold text-sm rounded-xl !rounded-full p-0 m-0 border-none"
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
      <template #option="{ option }">
         <slot name="option" :option="option" />
      </template>
      <template #empty>
         <div class="flex items-center justify-center w-[100%] h-[40px] text-m font-medium text-primary-900">
            {{ noOptionMessage }}
         </div>
      </template>
      <template #loader>
         <div class="h-[100px]">Loader</div>
      </template>
   </Dropdown>
</template>
<style></style>