<script setup>
// Core
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
// Stores
import { useUserPermissionStore } from '../stores/user-permissions.store'
// Composable
const { t } = useI18n()
const route = useRoute()
const userPermissionStore = useUserPermissionStore()
// Macros
const props = defineProps({
  navs: {
    type: Array,
    default: () => []
  },
  routeIncludeParams: {
    type: String
  }
})
// Reactive
const visible = ref(false)
// Watch
watch(route,() => checkRouteMeta(),{ deep: true })
// Hooks
onMounted(() => checkRouteMeta())
// Methods
const checkRouteMeta = () => {
  visible.value = !!(route?.meta.hasOwnProperty('navigation') && route.meta.navigation)
}
</script>

<template>
  <div
    v-if="visible"
    class="flex flex-col sticky -top-6 z-[2] -m-6 mb-6"
  >
    <div class="bg-white border-b border-greyscale-200 py-2 px-7">
      <div class="flex items-center">
        <template v-for="menu in props.navs" :key="menu.link">
          <template v-if="userPermissionStore.canAccess(menu.permission)">
            <router-link
              :to="{ name: menu.link, params: menu.params, query: menu.query }"
              class="collapse-link group flex items-center gap-2 text-sm font-medium text-greyscale-500 mr-6 py-[10px] relative transition-all duration-[400ms] after:content-[''] after:absolute after:bottom-[-9px] after:w-full after:h-[2px] after:bg-primary-500 after:opacity-0 after:transition-all after:duration-500 hover:text-primary-900 hover:after:opacity-100"
              :class="[
                { 'router-link-active router-link-exact-active': menu.params && route.fullPath.includes(menu.params[props.routeIncludeParams]) }
              ]"
            >
              <base-iconify
                v-if="menu.icon"
                :icon="menu.icon"
                class="!w-5 !h-5 text-gray-1 transition-all duration-[400ms] group-hover:text-primary-900"
              />

              {{ t(menu.title) }}

              <template v-if="menu.count">
                <div class="flex items-center justify-center w-5 h-5 rounded-full bg-critic-500 text-[10px] font-semibold text-white">{{ menu.count }}</div>
              </template>
            </router-link>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.collapse-link.router-link-active,
.collapse-link.router-link-active svg {
  color: var(--primary-900);
}

.collapse-link.router-link-active::after {
  opacity: 1;
}
</style>
