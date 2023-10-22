<script setup>
// Core
import { ref, computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
// Store
import { useNavigation } from "@/stores/navigation.store"
// Composable
const route = useRoute()
const router = useRouter()
const navigationStore = useNavigation()
// Reactive
const collapseMenus = ref([])
// Computed
const noChildRoute = computed(() => navigationStore.currentMenu.children.length === 0)
// Hooks
onMounted(() => {
  const currentParentRoute = route.matched[2]
  collapseMenus.value = noChildRoute.value
    ? []
    : navigationStore.currentMenu.children.find(menu => menu.link === currentParentRoute.name).children
})
// Methods
const openCollapseMenus = (menu) => {
  collapseMenus.value = menu
}
</script>

<template>
  <div class="app-sidebar-wrap flex w-full">
    <div class="app-sidebar w-[250px] overflow-y-auto border-r border-r-gray-3 py-6 px-4" :class="{ 'hidden' : noChildRoute }">
      <template v-for="menu in navigationStore.currentMenu.children">
        <template v-if="menu.prefix">
          <span class="block font-medium text-sm text-gray-4 mb-3">{{ menu.title }}</span>
        </template>

        <template v-else>
          <router-link
            :to="{ name: menu.link }" class="sidebar-link group flex items-center text-sm font-medium text-gray-1 rounded-xl p-3 pr-4 mb-1 border-b-2 border-transparent transition-all duration-[400ms] hover:text-primary-500 hover:border-gray-3 hover:bg-primary-50"
            @click="openCollapseMenus(menu.children)"
          >
            <base-icon v-if="menu.icon" :name="menu.icon" class="text-gray-1 mr-3 transition-all duration-[400ms] group-hover:text-primary-500" />
            {{ menu.title }}
          </router-link>
        </template>
      </template>
    </div>

    <div class="flex-1">
      <template v-if="collapseMenus.length">
        <div class="border-b border-greyscale-200 py-2 px-6">
          <div class="flex items-center">
            <template v-for="menu in collapseMenus">
              <router-link
                :to="{ name: menu.link }"
                class="collapse-link group flex items-center text-sm font-medium text-greyscale-500 mr-6 py-[10px] relative transition-all duration-[400ms] after:content-[''] after:absolute after:bottom-[-9px] after:w-full after:h-[2px] after:bg-primary-500 after:opacity-0 after:transition-all after:duration-500 hover:text-primary-900 hover:after:opacity-100"
              >
                <base-icon v-if="menu.icon" :name="menu.icon" class="text-gray-1 mr-2 transition-all duration-[400ms] group-hover:text-primary-900" />
                {{ menu.title }}
              </router-link>
            </template>
          </div>
        </div>
      </template>

      <slot name="content" />
    </div>
  </div>
</template>

<style>
.sidebar-link.router-link-active {
  background-color: var(--primary-50);
  color: var(--primary-500);
  border-color: var(--greyscale-200);
}

.sidebar-link.router-link-active svg {
  color: var(--primary-500);
}

.collapse-link.router-link-active,
.collapse-link.router-link-active svg {
  color: var(--primary-900);
}

.collapse-link.router-link-active::after {
  opacity: 1;
}
</style>
