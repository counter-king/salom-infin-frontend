<script setup>
// Core
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
// Constants
import { useSDStore } from "@/modules/Documents/modules/SendDocuments/stores/index.store";
import {computed, onMounted, onUnmounted, ref, unref, watch} from "vue";
// Store
import { useFilterStore } from "@/stores/filter.store";
// Components
import CustomizeMenuDialog from "@/modules/Documents/modules/SendDocuments/components/CustomizeMenuDialog.vue";
// Utils
import {getStorageItem, saveStorageItem} from "@/utils/storage";
import {
  SD_TOOLBAR_MENU_LENGTH,
  SD_TOOLBAR_MENU_STORAGE_NAME
} from "@/modules/Documents/modules/SendDocuments/constants";
// Const
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const emit = defineEmits(['emit:changeDocType']);
const sdStore = useSDStore();
const opRef = ref(null);
const moreVisible = ref(false);
const dialog = ref(false);
const limitExceeded = ref(false);
const filterStore = useFilterStore();

const selectedMenuItems = computed(() => {
  return sdStore.SD_TOOLBAR_MENU_LIST.filter(item => item.selected);
})

const unSelectedMenuItems = computed(() => {
  return sdStore.SD_TOOLBAR_MENU_LIST.filter(item => !item.selected);
})

// Methods
const onChangeDocType = async (menu) => {
  sdStore.SD_TOOLBAR_MENU_LIST.forEach(item => {
    item.active = item === menu;
  });
  await router.replace({
    query: {
      journal: menu.journal
    }
  });
  await sdStore.actionGetDocumentList({ ...route.query, journal: menu.journal });
  filterStore.resetFilterState();
  saveStorageItem(SD_TOOLBAR_MENU_STORAGE_NAME, JSON.stringify(sdStore.SD_TOOLBAR_MENU_LIST));
  emit('emit:changeDocType', menu);
}
const toggle = (event) => {
  const _opRef = unref(opRef)
  _opRef.opRef.toggle(event)
}

const manageStorageMenu = () => {
  if (getStorageItem(SD_TOOLBAR_MENU_STORAGE_NAME)){
    sdStore.SD_TOOLBAR_MENU_LIST = JSON.parse(getStorageItem(SD_TOOLBAR_MENU_STORAGE_NAME));

    watch(sdStore.SD_TOOLBAR_MENU_LIST, (newVal) => {
      if (newVal && newVal.length){
        limitExceeded.value = newVal.filter(menu => menu.selected).length >= SD_TOOLBAR_MENU_LENGTH;
      }
    }, { immediate: true });
  }else {
    watch(sdStore.SD_TOOLBAR_MENU_LIST, (newVal) => {
      if (newVal && newVal.length){
        limitExceeded.value = newVal.filter(menu => menu.selected).length >= SD_TOOLBAR_MENU_LENGTH;
      }
    }, { immediate: true });
  }
}

onMounted(() => {
  manageStorageMenu();
});

onUnmounted(() => {
  filterStore.resetFilterState();
})
</script>

<template>
  <div class="bg-white border-b border-greyscale-200 py-2 px-6 -mt-7 -mx-6 mb-7 flex justify-between">
    <div class="flex items-center">
      <template v-for="menu in selectedMenuItems">
        <div
          class="cursor-pointer collapse-link group flex items-center text-sm font-medium text-greyscale-500 mr-6 py-[10px] relative transition-all duration-[400ms] after:content-[''] after:absolute after:bottom-[-9px] after:w-full after:h-[2px] after:bg-primary-500 after:opacity-0 after:transition-all after:duration-500 hover:text-primary-900 hover:after:opacity-100"
          :class="{ 'toolbar-menu-active' : menu.active }"
          @click="onChangeDocType(menu)"
        >
          <base-icon v-if="menu.icon" :name="menu.icon" class="text-gray-1 mr-2 transition-all duration-[400ms] group-hover:text-primary-900 w-4 h-4" />
          {{ t(menu.label) }}
        </div>
      </template>
    </div>

    <div
      class="select-none cursor-pointer collapse-link group flex items-center text-sm font-medium text-greyscale-500 mr-6 py-[10px] relative transition-all duration-[400ms] after:content-[''] after:absolute after:bottom-[-9px] after:w-full after:h-[2px] after:bg-primary-500 after:opacity-0 after:transition-all after:duration-500 hover:text-primary-900 hover:after:opacity-100"
      :class="{ 'toolbar-menu-active' : moreVisible }"
      @click="toggle"
    >
      <base-icon name="VerticalDotsIcon" class="text-gray-1 mr-2 transition-all duration-[400ms] group-hover:text-primary-900 w-4 h-4" />
        {{ t('more') }}
      <base-icon name="AltArrowDownIcon" class="text-gray-1 ml-2 transition-all duration-[400ms] group-hover:text-primary-900 w-4 h-4" />
    </div>
  </div>

  <base-overlay-panel
    ref="opRef"
    width="w-[269px]"
    menu-class="bg-white mt-2 overflow-hidden"
    @emit:change-state="val => moreVisible = val"
  >
    <div class="flex flex-col p-1 gap-y-1">
      <template v-for="menu in unSelectedMenuItems">
        <div
          class="select-none cursor-pointer flex font-medium text-sm items-center hover:text-primary-dark hover:bg-greyscale-50 transition-all duration-[400ms] rounded-[8px] p-3"
          :class="menu.active ? 'before:content-[\'\'] before:absolute before:left-1 before:h-5 before:w-[2px] before:bg-primary-500 bg-greyscale-50 text-primary-dark font-semibold' : ''"
          @click="onChangeDocType(menu)"
        >
          <base-icon
            :name="menu.icon"
            class="text-greyscale-500 mr-2 w-4 h-4 hover:text-primary-dark"
            :class="menu.active ? 'text-primary-dark font-semibold' : ''"
          />
          {{ t(menu.label) }}
        </div>
      </template>

      <div
        class="select-none cursor-pointer flex font-medium text-sm items-center hover:bg-greyscale-50 transition-all duration-[400ms] hover:text-primary-900 rounded-[8px] p-3"
        @click="dialog = !dialog"
      >
        <base-icon name="SettingsIcon" class="text-greyscale-500 mr-2 w-4 h-4" />
        {{ t('customize-menu') }}
      </div>
    </div>
  </base-overlay-panel>

  <customize-menu-dialog
    v-model="dialog"
    :limit-exceeded="limitExceeded"
  />
</template>

<style scoped>
.toolbar-menu-active {
  color: var(--greyscale-900);
}

.toolbar-menu-active:after {
  opacity: 1;
}

.toolbar-menu-active svg {
  color: var(--greyscale-900);
}
</style>
