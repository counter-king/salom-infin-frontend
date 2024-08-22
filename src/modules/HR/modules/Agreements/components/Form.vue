<script setup>
// Core
import { onMounted } from 'vue'
// Components
import { LayoutWithTabs } from '@/components/DetailLayout'
import { UserWithLabel, UserWithSelectable } from '@/components/Users'
import KeyWords from './KeyWords.vue'
// Stores
import { useAgreementsStore } from '../stores/agreements.store'
// Composable
const agreementsStore = useAgreementsStore()
// Hooks
onMounted(async () => {
  await agreementsStore.getNegotiationTypes()
})
</script>

<template>
  <layout-with-tabs title="Добавить документ">
    <template #content>
      <div class="h-full overflow-y-auto">
        <div class="flex gap-8 p-6">
          <div class="flex-1">
            <base-row class="gap-y-2">
              <base-col class="w-full">
                <base-dropdown
                  :options="agreementsStore.negotiationTypes"
                  required
                  option-value="id"
                  option-label="name"
                  label="Категория документа"
                  placeholder="Выберите категорию"
                />
              </base-col>

              <base-col col-class="w-1/2">
                <base-calendar
                  required
                  label="Дата начала"
                  placeholder="Выберите дата начала"
                />
                <!-- @update:modelValue="(value) => $v.register_date.$model = formatDateReverse(value)" -->
              </base-col>

              <base-col col-class="w-1/2">
                <base-calendar
                  required
                  label="Дата окончания"
                  placeholder="Выберите дата окончания"
                />
              </base-col>

              <base-col col-class="w-full">
                <base-multi-select
                  api-url="users"
                  label="reviewers"
                  display="chip"
                  placeholder="search-users"
                  menu-placeholder="search-users"
                  required
                >
                  <template #chip="{ value }">
                    <user-with-label
                      :compact="true"
                      :label="isObject(value?.user) ? value?.user.full_name : value?.full_name"
                      :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
                      color="#635AFF"
                      avatar-classes="w-5 h-5"
                    />
                  </template>

                  <template #option="{ value }">
                    <user-with-selectable :items="[value]" />
                  </template>

                  <template #hint="{ value }">
                    <user-with-label
                      :label="isObject(value?.user) ? value?.user.full_name : value?.full_name"
                      :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
                      shadow
                      color="#635AFF"
                      avatar-classes="w-5 h-5"
                    />
                  </template>
                </base-multi-select>
              </base-col>

              <base-col col-class="w-full">
                <base-label label="Текст документа" :required="true" />

                <base-froala-editor />
              </base-col>

              <base-button label="Просмотр документа" rounded />
            </base-row>
          </div>

          <div class="max-w-[420px] w-full">
            <key-words />
          </div>
        </div>
      </div>
    </template>
  </layout-with-tabs>
</template>
