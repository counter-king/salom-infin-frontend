<script setup>
// Core
import {computed, ref, useModel, watch} from "vue";
import {useI18n} from "vue-i18n";
// Store
import {useSDStore} from "@/modules/Documents/modules/SendDocuments/stores/index.store";
// Utils
import {removeStorageItem, saveStorageItem} from "@/utils/storage";
import {dispatchNotify} from "@/utils/notify";
// Const
import {
  SD_TOOLBAR_MENU_LENGTH,
  SD_TOOLBAR_MENU_STORAGE_NAME
} from "@/modules/Documents/modules/SendDocuments/constants";
import {COLOR_TYPES} from "@/enums";

const props = defineProps({
  modelValue: {
    type: Boolean
  },
  limitExceeded: {
    type: Boolean,
    default: false
  }
})
const modelValue = useModel(props, 'modelValue');
const sdStore = useSDStore();
const { t } = useI18n();


const selectedMenuItems = computed(() => {
  return sdStore.SD_TOOLBAR_MENU_LIST.filter(menu => menu.selected);
})

const unSelectedMenuItems = computed(() => {
  return sdStore.SD_TOOLBAR_MENU_LIST.filter(menu => !menu.selected);
})

// Methods
const toggle = () => {
  modelValue.value = !modelValue.value;
}
const saveMenuToStorage = () => {
  saveStorageItem(SD_TOOLBAR_MENU_STORAGE_NAME, JSON.stringify(sdStore.SD_TOOLBAR_MENU_LIST));
  dispatchNotify(t('menu-saved'), null, COLOR_TYPES.SUCCESS);
  toggle();
}
const resetToolbarMenu = () => {
  removeStorageItem(SD_TOOLBAR_MENU_STORAGE_NAME);
  sdStore.resetToolbarMenu();
  dispatchNotify(t('menu-reset'), null, COLOR_TYPES.SUCCESS);
  toggle();
}
</script>

<template>
  <base-dialog
    v-model="modelValue"
    label="customize-menu"
    max-width="max-w-[672px]"
    :draggable="false"
    content-classes="p-0 h-[448px]"
  >
    <template #content>
      <div class="flex h-full">
        <div class="w-2/4 p-5">
          <div class="flex text-base font-semibold px-4 text-primary-900">
            <span>{{ t('active-menu') }}</span>
            <span
              class="block ml-2"
              :class="{ 'text-critic-500' : props.limitExceeded }"
            >
              {{ selectedMenuItems.length }}/{{ SD_TOOLBAR_MENU_LENGTH }}
            </span>
          </div>

          <div class="mt-2">
            <template v-for="menu in selectedMenuItems">
              <div class="flex items-center justify-between px-4 cursor-pointer hover:bg-greyscale-50 transition-all duration-[300ms] rounded-xl h-11">
                <span class="text-sm font-medium">{{ t(menu.label) }}</span>

                <base-switch
                  v-model="menu.selected"
                  class-switch-root="mr-0"
                  class-body="flex"
                  :disabled="menu.disabled"
                />
              </div>
            </template>
          </div>
        </div>

        <div class="w-2/4 border-l pt-5">
          <div class="flex text-base font-semibold px-4 text-primary-900">
            {{ t('available=menu') }}
          </div>

          <div class="mt-2 overflow-y-auto h-[388px] px-5">
            <template v-for="menu in unSelectedMenuItems">
              <div class="flex items-center justify-between px-4 cursor-pointer hover:bg-greyscale-50 transition-all duration-[300ms] rounded-xl h-11">
                <span class="text-sm font-medium">{{ t(menu.label) }}</span>

                <base-switch
                  v-model="menu.selected"
                  class-switch-root="mr-0"
                  class-body="flex"
                  :disabled="menu.disabled || props.limitExceeded"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex items-center justify-between">
<!--        <base-button
          label="reset"
          rounded
          outlined
          shadow
          color="text-primary-900"
          border-color="border-transparent"
          @click="resetToolbarMenu"
        />-->
        <div class="flex items-center justify-end w-full">
          <base-button
            label="cancel"
            rounded
            outlined
            shadow
            color="text-primary-900"
            border-color="border-transparent"
            @click="toggle"
          />

          <base-button
            label="save"
            rounded
            @click="saveMenuToStorage"
          />
        </div>
      </div>
    </template>
  </base-dialog>
</template>

<style scoped>

</style>
