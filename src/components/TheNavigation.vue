<script setup>
// Core
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// Stores
import { useNavigationStore } from '@/stores/navigation.store'
// Composable
const router = useRouter()
const route = useRoute()
const navigationStore = useNavigationStore()
// Macros
const props = defineProps({
  navs: {
    type: Array,
    default: () => []
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
    class="flex flex-col flex-1 relative -m-6 mb-6"
  >
    <template v-if="navigationStore.sidebarCollapse">
      <div
        class="bg-primary-50 flex items-center justify-center border border-l-0 border-greyscale-200 rounded-r-lg w-5 h-8 cursor-pointer absolute top-[12px] left-0"
        @click="navigationStore.actionSidebarCollapse(false)"
      >
        <base-icon name="AltArrowLeftIcon" width="16" height="16" class="-scale-x-100 text-greyscale-500" />
      </div>
    </template>

    <div class="bg-white border-b border-greyscale-200 py-2 px-6">
      <div class="flex items-center">
        <template v-for="menu in props.navs" :key="menu.link">
          <router-link
            :to="{ name: menu.link }"
            class="collapse-link group flex items-center text-sm font-medium text-greyscale-500 mr-6 py-[10px] relative transition-all duration-[400ms] after:content-[''] after:absolute after:bottom-[-9px] after:w-full after:h-[2px] after:bg-primary-500 after:opacity-0 after:transition-all after:duration-500 hover:text-primary-900 hover:after:opacity-100"
          >
            <base-icon v-if="menu.icon" :name="menu.icon" width="18" height="18" class="text-gray-1 mr-2 transition-all duration-[400ms] group-hover:text-primary-900" />
            {{ menu.title }}
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
