<script setup>
// Core
import { ref } from 'vue'

const sidebar = ref(false)
</script>
<template>
  <div>
    <base-button
      color="bg-greyscale-800 hover:bg-greyscale-900"
      border-color="border-greyscale-800"
      icon-left="BellIcon"
      only-icon
      rounded
      @click="sidebar = !sidebar"
    />

    <base-sidebar
      v-model="sidebar"
      title="notifications"
      closeButtonClass="hidden"
      headerClass="w-full"
      rootClass="w-[506px]"
    >
      <template #headerCloseIcons>
        <base-icon name="CheckReadIcon" width="16" height="16" class="mr-3 cursor-pointer"/>
        <base-icon name="SettingsIcon" width="16" height="16" class="cursor-pointer"/>
      </template>

      <template #content>
        <div class="flex hover:bg-slate-100 p-4 rounded-xl relative">
          <div class="n-avatar mr-3.5">
            <base-avatar
              image="/images/avatars/1.jpg"
              shape="circle"
              avatar-classes="w-10 h-10"
            />
          </div>
          <div>
            <span class="block text-base font-semibold text-primary-900 mb-1">Выполнил поручение</span>
            <span class="block text-sm font-medium text-greyscale-500 mb-1">
              <router-link to="{ name: 'DashboardIndex' }" class="text-primary-500"> Азизбек Гайбуллаев </router-link>
              согласилься с вашим документом 19-77/145
            </span>
            <span class="text-xs font-sm text-greyscale-500">1 день назад</span>
            <span class="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>

        <div class="flex hover:bg-slate-100 p-4 rounded-xl relative">
          <div class="n-avatar mr-3.5">
            <base-avatar
              image="/images/avatars/1.jpg"
              shape="circle"
              avatar-classes="w-10 h-10"
            />
          </div>
          <div>
            <span class="block text-base font-semibold text-primary-900 mb-1">Выполнил поручение</span>
            <span class="block text-sm font-medium text-greyscale-500 mb-1">
              <router-link to="{ name: 'DashboardIndex' }" class="text-primary-500">Вы</router-link>
              выполнил поручение документа 19-77/145
            </span>
            <span class="text-xs font-sm text-greyscale-500">3 день назад</span>
            <span class="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>

        <div class="flex hover:bg-slate-100 p-4 rounded-xl relative">
          <div class="n-avatar mr-3.5">
            <base-avatar
              image="/images/avatars/1.jpg"
              shape="circle"
              avatar-classes="w-10 h-10"
            />
          </div>
          <div>
            <span class="block text-base font-semibold text-primary-900 mb-1">Выполнил поручение</span>
            <span class="block text-sm font-medium text-greyscale-500 mb-1">
              <router-link to="{ name: 'DashboardIndex' }" class="text-primary-500"> Азизбек Гайбуллаев </router-link>
              добавлены для рассмотрения во входяший документом 19-77/145
            </span>
            <span class="text-xs font-sm text-greyscale-500">5 день назад</span>
            <span class="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>

        <div class="flex hover:bg-slate-100 p-4 rounded-xl relative">
          <div class="n-avatar mr-3.5">
            <base-avatar
              image="/images/avatars/1.jpg"
              shape="circle"
              avatar-classes="w-10 h-10"
            />
          </div>
          <div>
            <span class="block text-base font-semibold text-primary-900 mb-1">Выполнил поручение</span>
            <span class="block text-sm font-medium text-greyscale-500 mb-1">
              <router-link to="{ name: 'DashboardIndex' }" class="text-primary-500"> Азизбек Гайбуллаев </router-link>
              подписал(а) с вашим документом
            </span>
            <span class="text-xs font-sm text-greyscale-500">6 день назад</span>
            <span class="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>
      </template>

      <template #footer>
        &nbsp
      </template>
    </base-sidebar>
  </div>
</template>
<style lang="">

</style>
