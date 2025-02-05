<script setup>
// Core
import { ref, onMounted, computed } from 'vue'
// Components
import { PenBoldIcon, UnreadLinearIcon, TrashBinTrashIcon, AddPlusIcon } from '@/components/Icons'
// Stores
import { useAuthStore } from '@/modules/Auth/stores'
// Service
import axiosConfig from '@/services/axios.config'
// Utils
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
// Composable
const authStore = useAuthStore()
// Reactive
const dialog = ref(false)
const avatars = ref([])
const avatarSelected = ref(authStore.currentUser?.avatar?.id ?? null)
const loading = ref(false)
const loadingDelete = ref(false)
const loadingFile = ref(false)
// Computed
const avatarUrls = computed(() => {
  let avatars = []

  for (let i = 1; i <= 25; i++) {
    avatars.push({
      id: 972 + i,
      url: `/images/avatars/${i}.png`
    })
  }

  return avatars
})
// Methods
const handleAvatar = (file) => {
  avatarSelected.value = file
}
const handleCancel = () => {
  dialog.value = false
  avatarSelected.value = null
}
const handleUpdate = async () => {
  let model = {
    avatar: avatarSelected.value
  }

  try {
    loading.value = true
    await authStore.actionCurrentUserUpdate(model)
    dispatchNotify(null, 'Аватар изменен', COLOR_TYPES.SUCCESS)
    dialog.value = false
  }
  catch (error) {

  }
  finally {
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
}
const handleDelete = async (id) => {
  if(!confirm(`Действительно хотите удалить ?`)) {
    return
  }

  try {
    loadingDelete.value = true
    await authStore.actionDeleteUserAvatar(id)
    await customAvatars()
    dispatchNotify(null, 'Аватар удален', COLOR_TYPES.SUCCESS)
    handleCancel()
  }
  catch(error) {

  }
  finally {
    setTimeout(() => {
      loadingDelete.value = false
    }, 500)
  }
}
const handleFileSelect = async (event) => {
  const files = event.target.files

  if (files.length === 0) return
  loadingFile.value = true

  for (const file of files) {
    let formData = new FormData()
    formData.append('file', file)

    let { data } = await axiosConfig.post(`/upload/`, formData)
    await authStore.actionUpdateUserAvatar({ file: data.id })
    await customAvatars()
    loadingFile.value = false
    dispatchNotify(null, 'Аватар загружен', COLOR_TYPES.SUCCESS)
    handleCancel()
  }

}
const customAvatars = async () => {
  await axiosConfig.get(`/custom-avatars/`, {
    page_size: 50
  })
  .then(({ data }) => {
    avatars.value = data.results
  })
}
// Hooks
onMounted(async () => {
  await customAvatars()
})
</script>

<template>
  <div class="flex items-center justify-center w-[26px] h-[26px] absolute bottom-0 right-[10px] rounded-full overflow-hidden bg-white z-20 cursor-pointer">
    <div
      class="flex items-center justify-center w-5 h-5 bg-primary-500 rounded-full"
      v-tooltip.top="{
        value: `<h4 class='text-xs text-white -my-1'>Изменить аватар</h4>`,
        escape: true,
        autoHide: false
      }"
      @click="dialog = true"
    >
      <div class="flex items-center justify-center w-4 h-4 rounded-full bg-primary-500">
        <base-iconify :icon="PenBoldIcon" class="!w-3 !h-3 text-white" />
      </div>
    </div>
  </div>

  <base-dialog
    v-model="dialog"
    label="Выберите аватар"
    max-width="max-w-[610px]"
  >
    <template #content>
      <div class="grid grid-cols-5 gap-x-3 gap-y-4">
        <label
          for="avatar-uploader"
          v-tooltip.top="{
            value: `<h4 class='text-xs text-white -my-1'>Загрузить свое фото</h4>`,
            escape: true,
            autoHide: false
          }"
          class="flex items-center justify-center rounded-full border-2 border-greyscale-70 cursor-pointer"
        >
          <input
            id="avatar-uploader"
            type="file"
            name="file"
            hidden
            @change="handleFileSelect"
          >

          <template v-if="!loadingFile">
            <base-iconify :icon="AddPlusIcon" class="!w-8 !h-8 text-primary-500" />
          </template>

          <template v-else>
            <base-spinner />
          </template>
        </label>

        <template v-for="avatar in avatars">
          <div
            class="w-[98px] h-[98px] relative rounded-full cursor-pointer"
            :class="{ 'ring-4 ring-primary-500': avatarSelected === avatar.file }"
            @click="handleAvatar(avatar.file)"
          >
            <img :src="avatar.url" alt="avatar" class="w-full h-full object-cover rounded-full" />

            <div
              v-if="avatarSelected === avatar.file"
              class="flex justify-center items-center absolute bottom-0 right-0 w-6 h-6 rounded-full bg-primary-500 text-white"
            >
              <base-iconify :icon="UnreadLinearIcon" />
            </div>

            <div
              v-if="avatarSelected === avatar.file"
              class="flex justify-center items-center bg-critic-500 hover:bg-critic-300 w-8 h-8 absolute -top-2 -right-2 rounded-full text-white"
              @click="handleDelete(avatar.id)"
            >
              <base-spinner
                v-if="loadingDelete"
                app-classes="bg-white rounded-full"
                root-classes="!w-5 !h-5"
              />

              <base-iconify v-if="!loadingDelete" :icon="TrashBinTrashIcon" />
            </div>
          </div>
        </template>
      </div>
    </template>

    <template #footer>
      <base-button
        color="bg-white hover:bg-greyscale-100 text-primary-dark"
        border-color="border-transparent"
        label="cancel"
        rounded
        shadow
        type="button"
        @click="handleCancel"
      />

      <base-button
        :loading="loading"
        label="update"
        rounded
        shadow
        type="button"
        @click="handleUpdate"
      />
    </template>
  </base-dialog>
</template>

<style scoped>

</style>
