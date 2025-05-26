<script setup>
// Core
import { useI18n } from 'vue-i18n'
// Components
import TheFooter from '@/components/TheFooter.vue'
import {
  WidgetDocFlow,
  WidgetBirthday,
  WidgetContacts,
  WidgetApplications,
  WidgetSlider,
  WidgetSurvey,
  WidgetNewsList
} from '../components/widgets'
import { onMounted } from "vue";
import axios from "axios";
// Composable
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col flex-1 overflow-y-auto">
    <div class="dashboard-home w-full p-10 pt-6 pb-0">
      <h1 class="text-2xl text-primary-900 font-bold mb-5">{{ t('dashboard') }}</h1>

      <div class="dashboard-grid flex h-[calc(100%-52px)] gap-5">
        <div class="flex flex-col flex-1">
          <widget-doc-flow class="h-[272px] mb-5" />

          <div class="flex flex-1 gap-5 overflow-y-auto min-h-[calc(100vh-480px)]">
            <widget-news-list class="flex-1" />

            <widget-contacts class="w-[356px]" />
          </div>
        </div>

        <div class="flex flex-col max-w-[350px] w-full">
          <widget-slider class="h-[155px]" />

          <widget-survey class="h-[156px] mb-5" />

          <widget-birthday class="overflow-y-auto mb-5" />

  <!--        <widget-applications class="flex-1 overflow-y-auto" />-->
        </div>
      </div>
    </div>
    <div class="pl-10 pb-2">
      <the-footer/>
    </div>
  </div>
</template>

<style>

</style>
