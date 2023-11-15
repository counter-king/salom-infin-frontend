<script setup>
// Core
import {ref, unref} from "vue";
import {useI18n} from "vue-i18n";
// Utils
import {removeStorageItem, saveStorageItem} from "../../utils/storage";
import {useToast} from "primevue/usetoast";

const toast = useToast();

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  storageColumnsName: {
    type: String,
    default: () => "",
    required: true
  }
})

const opRef = ref(null);
const { t } = useI18n();

const toggle = (event) => {
  const _opRef = unref(opRef)
  _opRef.opRef.toggle(event)
}

const resetStorageColumns = () => {
  removeStorageItem(props.storageColumnsName);
  toast.add({ severity: 'success', summary: t('headers-reset'), life: 3000 });
  toggle();
  emits('emit:resetHeaders');
}

const saveColumnsToStorage = () => {
  saveStorageItem(props.storageColumnsName, JSON.stringify(props.items));
  toast.add({ severity: 'success', summary: t('headers-saved'), life: 3000 });
  toggle();
}

const emits = defineEmits(['emit:resetHeaders']);
</script>

<template>
  <base-button
    color="bg-primary-0 hover:bg-greyscale-100 text-primary-dark"
    border-color="border-transparent"
    label="customize-columns"
    icon-color="#767994"
    icon-left="SettingsMinimalisticIcon"
    rounded
    shadow
    type="button"
    @click="toggle"
  />

  <base-overlay-panel
    ref="opRef"
    width="w-60"
    menu-class="bg-white  mt-1"
  >
    <div class="p-2">
      <template v-for="item in items">
        <div class="rounded-2 w-full h-10 p-3 flex items-center gap-3 hover:bg-gray-5 justify-between">
          <span class="text-primary-900 text-sm font-semibold">{{ t(item.header) }}</span>
          <base-switch
            v-model="item.active"
            class-switch-root="mr-0"
            class-body="flex"
            size="small"
          />
        </div>
      </template>
    </div>

    <template #actions>
      <div class="flex justify-end gap-2 py-2">
        <base-button
          color="bg-white hover:bg-greyscale-100 text-primary-900"
          border-color="border-transparent"
          label="reset"
          :rounded="true"
          shadow
          type="button"
          size="small"
          @click="resetStorageColumns"
        />

        <base-button
          border-color="border-transparent"
          label="save"
          :rounded="true"
          shadow
          type="button"
          size="small"
          @click="saveColumnsToStorage"
        />
      </div>
    </template>
  </base-overlay-panel>
</template>

<style scoped>

</style>
