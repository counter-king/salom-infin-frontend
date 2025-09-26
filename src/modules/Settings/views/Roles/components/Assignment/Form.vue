<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LayoutWithTabs } from '@/components/DetailLayout'
import { useRolesStore } from '../../../../stores/roles.store'
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES } from '@/enums'

const route = useRoute()
const router = useRouter()
const rolesStore = useRolesStore()

const contentLoading = ref(true)
const assignmentRoleLoading = ref(false)

const getRoleById = async () => {
  try {
    contentLoading.value = true
    await rolesStore.getRoleById(route.params.id)
  } finally {
    setTimeout(() => {
      contentLoading.value = false
    }, 500)
  }
}
const assignmentRoleToUser = async () => {
  try {
    assignmentRoleLoading.value = true
    dispatchNotify(null, 'Права доступа изменен', COLOR_TYPES.SUCCESS)
  }
  finally {
    setTimeout(() => {
      assignmentRoleLoading.value = false
    }, 500)
  }
}
const handleBackButton = async () => {
  await router.replace({ name: 'RolesIndex' })
}

onMounted(async () => {
  await getRoleById()
})
</script>

<template>
  <div class="role-view h-full">
    <template v-if="contentLoading">
      <base-spinner />
    </template>

    <template v-else>
      <layout-with-tabs
        :title="rolesStore.createModel?.name"
        self
        @emit:back-button="handleBackButton"
      >
        <template #header-end>
          <base-button
            label="save"
            rounded
            type="button"
            :loading="assignmentRoleLoading"
            @click="assignmentRoleToUser"
          />
        </template>

        <template #content>
          <div class="py-5 px-7">
            <base-row>
              <base-col col-class="w-1/4">
                123
              </base-col>

              <base-col col-class="w-1/4">
                123
              </base-col>

              <base-col col-class="w-1/4">
                123
              </base-col>

              <base-col col-class="w-1/4">
                123
              </base-col>

              <base-col col-class="w-1/4">
                123
              </base-col>
            </base-row>
          </div>
        </template>
      </layout-with-tabs>
    </template>
  </div>
</template>
