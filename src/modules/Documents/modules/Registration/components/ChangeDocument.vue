<script setup>
// Core
import { ref, unref } from 'vue'
// Store
import { useDocFlowStore } from '../stores/docflow.store'
// Components
import IncomingForm from '../components/Form/Incoming.vue'
// Composable
const docFlowStore = useDocFlowStore()
// Reactive
const sidebarRef = ref(null)
const formRef = ref(null)
const sidebar = ref(false)
// Methods
const updateDocument = async () => {
  const _sidebarRef = unref(sidebarRef)
  const _formRef = unref(formRef)
  const valid = await _formRef.$v.$validate()

  if(!valid) return

  try {
    _sidebarRef.successButtonLoading = true
    await docFlowStore.actionUpdateDocument()
    _sidebarRef.successButtonLoading = false
    sidebar.value = false
  }
  catch (error) {
    _sidebarRef.successButtonLoading = false
  }
}
</script>

<template>
  <div class="change-document-view">
    <base-button
      label="update-document"
      rounded
      @click="sidebar = !sidebar"
    />

    <base-sidebar
      ref="sidebarRef"
      v-model="sidebar"
      title="update-document"
      @emit:cancel-button="(value) => sidebar = value"
      @emit:success-button="updateDocument"
    >
      <template #content>
        <incoming-form ref="formRef" :form-model="docFlowStore.detailModel">
          <template #end>
            <div class="shadow-block border-[0.095rem] border-greyscale-200 rounded-2xl overflow-hidden">
              <div class="bg-greyscale-50 border-b px-5 py-3">
                <h1 class="text-base font-semibold text-greyscale-900">Прикрепить файл</h1>
              </div>

              <div class="px-5 py-3">
                <base-row>
                  <base-col col-class="w-full">
                    <base-file-upload
                      :files="docFlowStore.detailModel.__files"
                      label="attach-file"
                      @emit:file-upload="(files) => docFlowStore.detailModel.__files = files"
                    />
                  </base-col>
                </base-row>
              </div>
            </div>
          </template>
        </incoming-form>
      </template>
    </base-sidebar>
  </div>
</template>

<style scoped>

</style>
