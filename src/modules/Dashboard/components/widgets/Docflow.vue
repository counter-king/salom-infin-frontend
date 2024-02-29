<script setup>
// Core
import { ref, unref } from 'vue'
import Listbox from 'primevue/listbox'
// Reactive
const overlayPanelRef = ref(null)
const activeTabMenuIndex = ref(0)
const tabMenuItems = ref([
  {
    label: 'Новые',
    name: 'Preview',
  },
  {
    label: 'В процессе',
    name: 'History',
  },
  {
    label: 'Все',
    name: 'Comments',
  }
])
const selectedCity = ref([
  {
    "name": "Rome",
    "code": "RM",
    "status": true
  },
  {
    "name": "London",
    "code": "LDN",
    "status": true
  }
])
const cities = ref([
  { name: 'New York', code: 'NY', status: false },
  { name: 'Rome', code: 'RM', status: true },
  { name: 'London', code: 'LDN', status: true },
  { name: 'Istanbul', code: 'IST', status: false },
  { name: 'Paris', code: 'PRS', status: false }
]);
// Methods
const toggle = (event) => {
  console.log(event);
  const _overlayPanelRef = unref(overlayPanelRef)
  _overlayPanelRef.opRef.toggle(event)
}
</script>

<template>
  <div class="doc-flow-view shadow-button rounded-xl bg-white p-5 pt-4">
    <div class="flex items-center justify-between gap-4">
      <h1 class="text-lg font-semibold text-primary-900">Входящие</h1>

      <div class="flex items-center justify-end">
        <base-tab-menu
          v-model="activeTabMenuIndex"
          :tab-items="tabMenuItems"
          bricks
        />

        <div class="bg-greyscale-200 w-[1px] h-4 ml-2 mx-2"></div>

        <base-button
          :rounded="false"
          rounded
          shadow
          size="small"
          label="Настроить"
          icon-left="SettingsMinimalisticIcon"
          icon-width="16"
          icon-height="16"
          button-class="bg-transparent text-greyscale-500 !text-sm border-none shadow-none !rounded-[6px] !py-1 !px-2 hover:bg-greyscale-50"
          @click="toggle"
        />

        <base-overlay-panel
          ref="overlayPanelRef"
          width="w-60"
          menu-class="bg-white mt-1 overflow-hidden"
        >
          <div class="p-2">
            <pre>{{ selectedCity }}</pre>
            <Listbox
              v-model="selectedCity"
              :options="cities"
              multiple
              optionLabel="name"
              :pt="{
                root: [
                  'border-none shadow-none'
                ],
                list: [
                  'p-0'
                ],
                item: [
                  'text-sm font-medium p-0 rounded-lg'
                ]
              }"
            >
              <template #option="{ option }">
                <base-toggle v-model="option.status" #default="{ state }">
                  <pre>{{ state }}</pre>
                  <pre>{{ option?.name }}</pre>
                  <pre>FFF --- {{ option?.status }}</pre>
                </base-toggle>
              </template>
            </Listbox>
          </div>

          <template #actions>
            <div class="flex justify-center gap-2 p-1">
              <base-button
                label="reset"
                :rounded="true"
                shadow
                type="button"
                size="small"
                border-color="border-transparent"
                button-class="w-[100px] bg-white text-primary-900 hover:bg-greyscale-100"
              />

              <base-button
                label="save"
                :rounded="true"
                shadow
                type="button"
                size="small"
                border-color="border-transparent"
                button-class="w-[100px]"
              />
            </div>
          </template>
        </base-overlay-panel>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
