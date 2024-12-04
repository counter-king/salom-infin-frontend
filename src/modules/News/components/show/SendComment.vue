<script setup>
// Core
import { useI18n } from 'vue-i18n';
// Components
import BaseButton from '@/components/UI/BaseButton.vue';
import Textarea from 'primevue/textarea';
import UserCard from '../../components/UserCard.vue';
import { ref, useModel } from 'vue';

// internalization
const { t } = useI18n()

// props
const props = defineProps({
    isButtonLoading: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: [String],
        default: ''
    },
    data: {
        type: Object,
        default: () => ({})
    }
})

// emits
const emits = defineEmits(['emit:submit-comment', 'update:modelValue'])
// composable
const modelValue = useModel(props, 'modelValue')

</script>
<template>
    <div class="py-5">
        <!-- user info -->
        <user-card 
            :name="props.data?.created_by?.full_name"
            :info="props.data?.created_by?.top_level_department?.name"
            :avatar-color="props.data?.created_by?.color" 
            />
        <div class="ml-[52px] mt-4 relative">
            <!-- comment enter -->
            <Textarea 
                :disabled="props.isButtonLoading"
                v-model="modelValue"
                :placeholder="t('enter-answer') + '...'"
                :pt="{
                root: { 
                class: [
                    'w-full text-[14px] min-h-[123px] rounded-2xl bg-primary-50 text-greyscale-400'
                ]
                }
                }"/>
            <base-button
                :loading="props.isButtonLoading"  
                :label="t('send')" 
                :disabled="!modelValue"
                @click="emits('emit:submit-comment', comment)"
                button-class="absolute bottom-4 right-4"
            />  
        </div>
    </div>
</template>

<style></style>
