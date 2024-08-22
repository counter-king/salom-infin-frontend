<script setup>
// Components
import AgreementsForm from '../components/Forms.vue'
// Const
import { FORM_TYPE_READ } from '@/constants/constants'
</script>

<template>
  <agreements-form :type="FORM_TYPE_READ" />
</template>
