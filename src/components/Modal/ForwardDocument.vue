<script setup>
// Core
import { ref } from 'vue'
import Divider from 'primevue/divider'
// Store
import { useUsersStore } from '@/stores/users.store'
// Components
import { UserWithSelectable } from '@/components/Users'
// Composable
const userStore = useUsersStore()
// Macros
const props = defineProps({
  modelValue: {
    type: Boolean
  }
})
const emit = defineEmits(['emit:up'])
// Reactive
const modal = ref(false)
</script>

<template>
  <base-button
    label="move-document"
    icon-left="RefreshIcon"
    rounded
    outlined
    shadow
    type="button"
    border-color="border-transparent"
    @click="modal = true"
  />

  <base-dialog
    v-model="modal"
    label="move-document"
    content-classes="p-0"
    max-width="max-w-[610px]"
  >
    <template #content>
      <div class="p-6 pb-0">
        <base-input
          icon-left="MagniferIcon"
          placeholder="search-users"
          class="p-input-icon-left w-full !mb-3"
        />

        <template v-for="user in userStore.usersList">
          <user-with-selectable
            :label="user.full_name"
            :color="user.color"
            :multiple="false"
            selectable
          />
        </template>
      </div>

      <Divider />

      <div class="p-6 pt-0">
        <base-textarea label="enter-content" />
      </div>
    </template>

    <template #footer>
      <base-button
        label="back"
        rounded
        outlined
        shadow
        color="text-primary-900"
        border-color="border-transparent"
        @click="modal = false"
      />

      <base-button
        label="send"
        rounded
      />
    </template>
  </base-dialog>
</template>
