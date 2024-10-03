// Core
import { defineStore } from 'pinia'
// Services
import { fetchUserPermissions } from '../services/user.permissions.service'
// Stores
import { useAuthStore } from '../modules/Auth/stores'

export const useUserPermissionStore = defineStore('user-permissions', {
  state: () => ({
    userPermissions: []
  }),
  actions: {
    async getUserPermisission() {
      let { data } = await fetchUserPermissions()
      this.userPermissions = data
    },
    /**
     * Проверка доступа модули/разделы
     * @param { string } permission
     * @returns { boolean }
     * */
    canAccess(permission) {
      const authStore = useAuthStore()

      // Если юзер суперадмин или
      // permission не определен или null
      // пропускаем проверку
      if(!permission) {
        // authStore.currentUser.is_superuser ||
        return true
      }

      return this.userPermissions.some(({ value }) => value === permission)
    }
  }
})
