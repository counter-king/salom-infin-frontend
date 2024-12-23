<script setup>
// Core
import { useI18n } from "vue-i18n"
import { InfoCircleBoldIcon, LocalTaxiIcon, PlaneIcon, TrainIcon } from "@/components/Icons"
import BaseBrickRadio from "@/components/UI/BaseBrickRadio.vue";
import { useBusinessTripStore } from "@/modules/Documents/modules/SendDocuments/stores/businessTrip.store"
import { UserWithRadio } from "@/components/Users";
import BaseIconify from "@/components/UI/BaseIconify.vue";

// Composable
const { t } = useI18n()
const store = useBusinessTripStore()

// Methods
const onRouteTabChange = (item) => {
  store.routeTabItems.forEach(route => route.active = route.id === item.id)
}
const onRouteTypeTabChange = (item) => {
  store.routeTypeTabItems.forEach(route => route.active = route.id === item.id)
}
</script>

<template>
  <div class="route-component flex flex-col gap-y-3">
    <div
      class="border-[1.5px] border-greyscale-200 rounded-2xl px-5 py-4"
    >
      <div class="flex items-center gap-x-4">
        <span class="text-base text-primary-900 font-semibold mb-1">{{ t('route') }}-1</span>

        <base-brick-radio
          :items="store.routeTabItems"
          @emit:on-change="onRouteTabChange"
        />

        <base-brick-radio
          :items="store.routeTypeTabItems"
          @emit:on-change="onRouteTypeTabChange"
        />
      </div>

      <div>
        <div class="flex items-center rounded-lg p-2 gap-x-2 bg-warning-50 border border-warning-100 mt-3 mb-2">
          <base-iconify :icon="InfoCircleBoldIcon" class="text-warning-500" />

          <span class="text-xs text-greyscale-900 font-medium">{{ t('route-warning') }}</span>
        </div>

        <base-row>
          <base-col col-class="w-1/4">
            <base-multi-select
              api-url="tags"
              :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
              display="chip"
              selectable
              label="where-from"
              type="department"
              placeholder="select-targets"
              required
            >
              <template #chip="{ value }">
                {{ value.name }}
              </template>

              <template #option="{ value }">
                <user-with-radio
                  :title="value.name"
                  :text-truncate="false"
                >
                </user-with-radio>
              </template>
            </base-multi-select>
          </base-col>

          <base-col col-class="w-1/4">
            <base-multi-select
              api-url="tags"
              :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
              display="chip"
              selectable
              label="where-to"
              type="department"
              placeholder="select-targets"
              required
            >
              <template #chip="{ value }">
                {{ value.name }}
              </template>

              <template #option="{ value }">
                <user-with-radio
                  :title="value.name"
                  :text-truncate="false"
                >
                </user-with-radio>
              </template>
            </base-multi-select>
          </base-col>
        </base-row>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
