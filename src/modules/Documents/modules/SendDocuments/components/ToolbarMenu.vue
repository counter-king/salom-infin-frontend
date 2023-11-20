<script setup>
// Core
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
// Constants
import { useSDStore } from "@/modules/Documents/modules/SendDocuments/stores/index.store";
// Const
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const emit = defineEmits(['emit:changeDocType']);
const sdStore = useSDStore();

// Methods
const onChangeDocType = (menu) => {
  sdStore.SD_TOOLBAR_MENU_LIST.forEach(item => {
    item.active = item === menu;
  });
  router.replace({
    query: {
      sub_type: menu.sub_type
    }
  });
  sdStore.actionGetDocumentList({ ...route.query, sub_type: menu.sub_type })
  emit('emit:changeDocType', menu);
}
</script>

<template>
  <div class="bg-white border-b border-greyscale-200 py-2 px-6 -mt-7 -mx-6 mb-6">
    <div class="flex items-center">
      <template v-for="menu in sdStore.SD_TOOLBAR_MENU_LIST">
        <div
          class="cursor-pointer collapse-link group flex items-center text-sm font-medium text-greyscale-500 mr-6 py-[10px] relative transition-all duration-[400ms] after:content-[''] after:absolute after:bottom-[-9px] after:w-full after:h-[2px] after:bg-primary-500 after:opacity-0 after:transition-all after:duration-500 hover:text-primary-900 hover:after:opacity-100"
          :class="{ 'router-link-active' : menu.active }"
          @click="onChangeDocType(menu)"
        >
          <base-icon v-if="menu.icon" :name="menu.icon" class="text-gray-1 mr-2 transition-all duration-[400ms] group-hover:text-primary-900 w-4 h-4" />
          {{ t(menu.label) }}
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>
