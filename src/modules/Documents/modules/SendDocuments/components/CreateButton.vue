<script setup>
// Core
import {ref, unref} from "vue";
import {useI18n} from "vue-i18n";
// Store
import {useSDStore} from "@/modules/Documents/modules/SendDocuments/stores/index.store";
import {useRoute, useRouter} from "vue-router";

const sdStore = useSDStore();
const { t } = useI18n();
const opRef = ref(null);
const router = useRouter();
const route = useRoute();
const toggle = (event) => {
  const _opRef = unref(opRef)
  _opRef.opRef.toggle(event)
}
const onChangeDocType = (menu) => {
  router.push({
    name: 'SendDocumentsCreate',
    params: { type: menu.type }
  })
}
</script>

<template>
  <base-button
    label="create"
    icon-left="AddIcon"
    rounded
    type="button"
    @click="toggle"
  />

  <base-overlay-panel
    ref="opRef"
    width="w-[269px]"
    menu-class="bg-white mt-2 overflow-hidden"
  >
    <div class="flex flex-col p-1 gap-y-1">
      <template v-for="menu in sdStore.SD_TOOLBAR_MENU_LIST">
        <div
          class="select-none cursor-pointer flex font-medium text-sm items-center hover:text-primary-dark hover:bg-greyscale-50 transition-all duration-[400ms] rounded-[8px] p-3"
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
    </div>
  </base-overlay-panel>
</template>

<style scoped>

</style>
