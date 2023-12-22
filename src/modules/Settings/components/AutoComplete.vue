<script setup>
import AutoComplete from 'primevue/autocomplete';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
const emit = defineEmits(['onInputChange', 'onChange', 'onClear']);
const props = defineProps({
   hasValue: [String, Boolean, Object],
   loading: Boolean,
   options: Array,
   value: [String, Boolean, Object],
});
const autocompleteConfig = {
   checkboxContainer: { class: 'hidden' },
   dropdownIcon: { class: ['w-4 h-4'] },
   header: { class: ['bg-white hidden'] },
   input: { class: ['w-full px-11'] },
   item: { class: [ 'p-0 transition-all hover:bg-greyscale-50 rounded-2xl focus:bg-greyscale-50 mt-[1px]'] },
   label: { class: [ 'text-sm font-medium text-greyscale-500' ] },
   list: { class: ['py-0'] },
   option: { class: ['text-xs font-medium text-primary-900'] },
   panel: { class: ['translate-y-[8px] shadow-menu rounded-2xl p-2 user-search-autocomplete'] },
   root: { class: ['w-[500px] group bg-greyscale-50 rounded-2xl border-greyscale-50 focus:border-primary-500 h-[44px]'] },
   token: { class: ['chip-hover shadow-button bg-white cursor-pointer'] },
   tokenLabel: { class: ['text-sm font-medium'] },
};
</script>
<template>
   <AutoComplete
      :minLength="0"
      :model-value="value"
      :pt="autocompleteConfig"
      :suggestions="options"
      @input="e => emit('onInputChange', e)"
      @item-select="e => emit('onChange', e)"
      completeOnFocus
      dataKey="id"
      dropdown
      dropdownClass="bg-white border-0 shadow-none absolute w-[42px] h-[42px] left-[1px] top-[1px] rounded-xl"
      forceSelection
      inputClass="w-full rounded-xl"
      loading
      optionLabel="full_name"
      scrollHeight="258px"
      searchMessage="full_name"
      selectionMessage="full_name"
      >
      <template #option="{ option }">
         <div class="items-center flex w-[100%] px-3 py-2 text-m font-medium text-primary-900">
            <div class="mr-3">
               <Avatar style="color: #ffffff" :label="option.full_name.slice(0, 1)" :style="{'background-color': option.color}" class="w-10 h-10" shape="circle" />
            </div>
            <div class="flex flex-col">
               <div class="text-base">{{ option.full_name }}</div>
               <div class="flex items-center">
                  <span class="text-sm font-semibold" :style="{'color': option.optionDisabled ? '#F3335C' : '#63BA3D'}">{{ option.status && option.status.name }}</span>
                  <span class="mx-2 w-[4px] h-[4px] rounded-full" style="background-color: #79889B"></span>
                  <span class="text-sm font-medium" style="color: #767994">{{ option.position }}</span>
               </div>
            </div>
         </div>
      </template>
      <template #loadingicon>
         <template v-if="loading">
            <div class="right-1.5 left-1.5 absolute flex align-center justify-center w-[36px] h-[36px]">
               <ProgressSpinner class="m-0 w-[32px] h-[32px]" animationDuration=".5s" strokeWidth="3" />
            </div>
         </template>
         <template v-else>
            <template v-if="hasValue">
               <Button
                  @click="emit('onClear')"
                  class="right-1.5 left-1.5 absolute bg-greyscale-50 rounded-3xl cursor-pointer w-[32px] h-[32px] flex justify-center items-center p-button p-component font-semibold text-sm rounded-xl !rounded-full p-0 m-0 border-none"
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
      <template #empty>
         <div class="flex items-center justify-center w-[100%] h-[40px] text-m font-medium text-primary-900">
            Сотрудник не найден
         </div>
      </template>
      <template #dropdownicon>
         <div class="cursor-pointer w-[32px] h-[32px] flex justify-center items-center">
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
   </AutoComplete>
</template>
<style></style>