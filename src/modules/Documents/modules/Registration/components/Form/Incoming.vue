<script setup>
// Core
import { ref } from 'vue'
// Components
import MultipleUser from '@/components/Combobox/MultipleUser.vue'
// Reactive
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
])
</script>

<template>
  <div class="incoming-form-view">
    <base-row>
      <base-col col-class="w-1/2">
        <base-input label="reg-number" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-input label="out-number" placeholder="enter-out-number" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown :options="cities" label="grif" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown :options="cities" label="language-document" placeholder="enter-language-document" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown :options="cities" label="number-sheets" placeholder="number-sheets" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown :options="cities" label="content-sheet" placeholder="content-sheet" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-calendar label="reg-date" placeholder="enter-reg-date" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-calendar label="out-date" placeholder="enter-out-date" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown :options="cities" label="correspondent" placeholder="enter-correspondent" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown :options="cities" label="document-type" placeholder="enter-document-type" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown :options="cities" label="priority-document" placeholder="enter-priority" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-input label="naming" placeholder="naming" />
      </base-col>

      <base-col col-class="w-1/2">
        <multiple-user display="chip" label="reviewers" placeholder="enter-reviewers" />
      </base-col>

      <base-col col-class="w-full">
        <base-textarea label="content" />
      </base-col>
    </base-row>
  </div>
</template>
