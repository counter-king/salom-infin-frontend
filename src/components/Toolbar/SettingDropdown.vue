<script setup>
// Core
import {ref, unref, computed } from 'vue'
import { useI18n } from "vue-i18n"
// Composable
const { t } = useI18n()
// Reactive
const opRef = ref(null)
const darkSwitch = ref(false);
const sidePanelSwitch = ref(false);
const colorRadio = ref('colorSelection4');
// Methods
const toggle = (event) => {
  const _opRef = unref(opRef)
  _opRef.opRef.toggle(event)
}
</script>
<template>
  <div>
    <base-button
      color="bg-greyscale-800 hover:bg-greyscale-900"
      border-color="border-greyscale-800"
      icon-left="SettingsIcon"
      only-icon
      rounded
      @click="toggle"
    />

    <base-overlay-panel
      ref="opRef"
      width="w-[406px]"
      has-overlay
      content="p-3"
      menu-class="bg-primary-50  mt-7  p-0"
    >
      <div class="block">
        <div class="flex justify-between items-start px-4 py-5 mb-1 rounded-xl bg-white cursor-pointer shadow-button">
          <base-icon
            width="24"
            height="24"
            name="MoonStarsIcon"
            class="text-primary-500 transition-all duration-[400ms"
          />
          <div class="block ml-3 flex-1">
            <h1 class="text-base font-semibold text-primary-900">Темный режим</h1>
            <span class="text-xs font-medium text-greyscale-500">Выбор режима программы</span>
          </div>

          <base-switch
            v-model="darkSwitch"
            class="mt-2"
          />
        </div>

        <div class="flex justify-between items-start px-4 py-5 mb-1 rounded-xl bg-white cursor-pointer shadow-button">
          <base-icon
            width="24"
            height="24"
            name="RefreshIcon"
            class="text-primary-500 transition-all duration-[400ms"
          />
          <div class="block ml-3 flex-1">
            <h1 class="text-base font-semibold text-primary-900">Системная изменения</h1>
            <span class="text-xs font-medium text-greyscale-500">Выбор режима программы</span>
          </div>

          <base-button
            :label="t('renew')"
            rounded="rounded-full"
            class="text-sm px-2 py-1.5"
          >
          </base-button>
        </div>

        <base-row>
          <base-col col-class="w-1/2 py-0 pr-0.5">
            <div class="flex justify-between items-start px-4 py-5 mb-1 rounded-xl bg-white cursor-pointer shadow-button">
              <base-icon
                width="24"
                height="24"
                name="ClockCircleIcon"
                class="text-primary-500 transition-all duration-[400ms"
              />
              <div class="block ml-3 flex-1">
                <h1 class="text-base font-semibold text-primary-900">Чась</h1>
                <span class="text-xs font-medium text-greyscale-500">Выбор режима</span>
                <h1 class="text-xl font-semibold text-primary-900">09:32</h1>
              </div>
            </div>
          </base-col>

          <base-col col-class="w-1/2 py-0 pl-0.5">
            <div class="flex justify-between items-start px-4 py-5 mb-1 rounded-xl bg-white cursor-pointer shadow-button">
              <base-icon
                width="24"
                height="24"
                name="CalendarIcon"
                class="text-primary-500 transition-all duration-[400ms"
              />
              <div class="block ml-3 flex-1">
                <h1 class="text-base font-semibold text-primary-900">Дата</h1>
                <span class="text-xs font-medium text-greyscale-500">Выбор режима</span>
                <h1 class="text-xl font-semibold text-primary-900">12.09.2023</h1>
              </div>
            </div>
          </base-col>
        </base-row>

        <div class="flex justify-between items-start px-4 py-5 mb-1 rounded-xl bg-white cursor-pointer shadow-button">
          <base-icon
            width="24"
            height="24"
            name="FiltersIcon"
            class="text-primary-500 transition-all duration-[400ms"
          />
          <div class="block ml-3 flex-1">
            <h1 class="text-base font-semibold text-primary-900">Выбор цвета</h1>
            <span class="text-xs font-medium text-greyscale-500">Выбор режима программы</span>

            <div class="flex">
              <base-radio
                v-model="colorRadio"
                inputId="colorSelection1"
                name="colorSelection1"
                value="colorSelection1"
                bgRadio="bg-pink-600"
              />
              <base-radio
                v-model="colorRadio"
                inputId="colorSelection2"
                name="colorSelection2"
                value="colorSelection2"
                bgRadio="bg-lime-500"
              />
              <base-radio
                v-model="colorRadio"
                inputId="colorSelection3"
                name="colorSelection3"
                value="colorSelection3"
                bgRadio="bg-cyan-500"
              />
              <base-radio
                v-model="colorRadio"
                inputId="colorSelection4"
                name="colorSelection4"
                value="colorSelection4"
                bgRadio="bg-primary-600"
              />
              <base-radio
                v-model="colorRadio"
                inputId="colorSelection5"
                name="colorSelection5"
                value="colorSelection5"
                bgRadio="bg-yellow-400"
              />
              <base-radio
                v-model="colorRadio"
                inputId="colorSelection6"
                name="colorSelection6"
                value="colorSelection6"
                bgRadio="bg-blue-800"
              />

              <base-radio
                v-model="colorRadio"
                inputId="colorSelection7"
                name="colorSelection7"
                value="colorSelection7"
                bgRadio="bg-teal-600"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-between items-start px-4 py-5 mb-1 rounded-xl bg-white cursor-pointer shadow-button">
          <base-icon
            width="24"
            height="24"
            name="MirrorRightIcon"
            class="text-primary-500 transition-all duration-[400ms"
          />
          <div class="block ml-3 flex-1">
            <h1 class="text-base font-semibold text-primary-900">Правая боковая панель</h1>
            <span class="text-xs font-medium text-greyscale-500">Выбор режима программы</span>
          </div>

          <base-switch
            v-model="sidePanelSwitch"
            class="mt-2"
          />
        </div>

        <base-button
          :label="t('save')"
          class="w-full"
        >
        </base-button>
      </div>
    </base-overlay-panel>
  </div>
</template>
<style>
.base-menu-logout-icons {
  background-color: var(--primary-50);
  color: var(--primary-500);
  border-color: var(--greyscale-200);
}
</style>
