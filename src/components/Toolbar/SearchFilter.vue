<script setup>
// Core
import { ref, unref, } from 'vue'
import { useI18n } from 'vue-i18n'
// Stores
import { useCommonStore } from '@/stores/common'
// Composable
const { t } = useI18n()
const commonStore = useCommonStore()
// Reactive
const opRef = ref(null)
const register_number = ref(null)
const register_date = ref(null)
const __department = ref(null)
const author = ref(null)
const __signers = ref(null)

// Methods
const toggle = (event) => {
  const _opRef = unref(opRef)
  _opRef.opRef.toggle(event)
}
</script>
<template>
  <div>
      <base-button
        label="filter"
        icon-left="SortIcon"
        rounded
        type="button"
        class="h-8 my-1 mr-1 !px-3 btn_fliter"
        @click="toggle"
      />

      <base-overlay-panel
        ref="opRef"
        width="w-[748px]"
        has-overlay
        content="rounded-xl  relative p-0 bg-white relative"
        menu-class="bg-primary-500  mt-7  p-0"
      >

      <div class="form-search-filter p-4">
        <h1 class="text-base font-bold text-primary-900">{{ t('filtration') }}</h1>

        <base-row>
          <base-col col-class="w-1/2">
            <base-input
              v-model="register_number"
              label="reg-number"
              placeholder="reg-number"
            />
          </base-col>

          <base-col col-class="w-1/2">
            <base-calendar
              v-model="register_date"
              label="reg-date"
              placeholder="enter-reg-date" />
          </base-col>

          <base-col col-class="w-1/2">
            <base-dropdown
              v-model="__department"
              :options="commonStore.departmentList"
              option-value="id"
              label="department"
              placeholder="department" />
          </base-col>

          <base-col col-class="w-1/2">
            <base-dropdown
              v-model="author"
              :options="commonStore.author"
              option-value="id"
              label="author"
              placeholder="author" />
          </base-col>

          <base-col col-class="w-1/2">
            <base-dropdown
              v-model="__signers"
              :options="commonStore.usersList"
              option-value="id"
              label="signers"
              placeholder="signers" />
          </base-col>
        </base-row>
      </div>

      <div class="flex justify-end gap-3 bg-greyscale-50 px-6 py-5 border-t rounded-b-xl">
        <base-button
          label="cancel"
          size="large"
          border-color="border-transparent"
          outlined
          rounded
          shadow
        />

        <base-button
          label="filter"
          size="large"
          rounded
          shadow
        />
      </div>
    </base-overlay-panel>
  </div>
</template>
