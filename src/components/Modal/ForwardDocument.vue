<script setup>
// Core
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDebounce } from '@vueuse/core'
import Divider from 'primevue/divider'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// Store
import { useUsersStore } from '@/stores/users.store'
import { useDocumentCountStore } from '@/modules/Documents/stores/count.store'
import { useReviewStore } from '@/modules/Documents/modules/Boxes/stores/review.store'
// Components
import { RefreshIcon, MagniferIcon } from '@/components/Icons'
import { UserWithSelectable } from '@/components/Users'
// Composable
const route = useRoute()
const router = useRouter()
const userStore = useUsersStore()
const countStore = useDocumentCountStore()
const reviewStore = useReviewStore()
// Macros
const props = defineProps({
  modelValue: {
    type: Boolean
  }
})
const emit = defineEmits(['emit:up'])
// Reactive
const modal = ref(false)
const buttonLoading = ref(false)
const model = ref({
  document: reviewStore.detailModel.document.id,
  user: null,
  comment: null
})
const search = ref(null)
// Non-reactive
const rules = {
  comment: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}
// Composable
const $v = useVuelidate(rules, model)
const debounced = useDebounce(search, 750)
// Methods
const send = async () => {
  const valid = await $v.value.$validate()

  if(!valid) {
    return
  }

  try {
    buttonLoading.value = true
    await reviewStore.actionChangeReviewer({
      id: Number(route.params.id),
      body: model.value
    })
    await countStore.actionDocumentCountList()
    await router.replace({ name: 'ReviewIndex' })
  }
  finally {
    buttonLoading.value = false
  }
}
// Watch
watch(debounced, async () => {
  await userStore.actionUsersList({ params: { search: search.value } })
})
</script>

<template>
  <base-button
    label="move-document"
    :icon-left="RefreshIcon"
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
          v-model="search"
          :icon-left="MagniferIcon"
          placeholder="search-users"
          class="p-input-icon-left w-full !mb-3"
        />

        <user-with-selectable
          v-model:checkbox-index="model.user"
          :items="userStore.usersList"
          :multiple="false"
          selectable
        />
      </div>

      <Divider />

      <div class="p-6 pt-0">
        <base-textarea
          v-model="$v.comment.$model"
          :error="$v.comment"
          required
          label="enter-content"
        />
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
        :loading="buttonLoading"
        label="send"
        rounded
        @click="send"
      />
    </template>
  </base-dialog>
</template>
