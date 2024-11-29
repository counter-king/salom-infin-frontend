<script setup>
// Core
import { useI18n } from 'vue-i18n';
// Components
import BaseButton from '@/components/UI/BaseButton.vue';
import Textarea from 'primevue/textarea';
import { AltArrowDownIcon, AltArrowUpIcon } from '@/components/Icons';
import UserCard from '../../components/UserCard.vue';
import { ref } from 'vue';

// internalization
const { t } = useI18n()

// props
const props = defineProps({
    type: {
        type: String,
        default: 'comment',
        validator:(value) => ['comment' | 'Info'].includes(value)
    }
})

// reactive 
const toggleComment = ref(false);
</script>
<template>
    <div class="py-5">
        <!-- user info -->
        <user-card/>
        <div class="ml-[52px] mt-4 relative">
            <!-- comment enter -->
            <template v-if="props.type === 'comment'" >
                <Textarea 
                :placeholder="t('enter-answer') + '...'"
                :pt="{
                    root: { 
                    class: [
                        'w-full text-[14px] min-h-[123px] rounded-2xl bg-primary-50 text-greyscale-400',
                        {
                        'p-invalid !shadow-none': false
                        },
                    ]
                    }
                }"/>
                <base-button :label="t('send')" button-class="absolute bottom-4 right-4"/>
            </template>

            <!-- commment info -->
            <template v-else>
                <p class="text-lg font-medium text-greyscale-800">Спасибо всем за великолепный день! Было очень весело и полезно поработать вместе в неформальной обстановке. Команда стала ещё сплочённее</p>
                <div class="flex gap-[10px] mt-4">
                    <base-button :label="t('answer')" class="px-3 py-1 rounded-[80px] bg-greyscale-50 text-sm font-medium text-greyscale-900 border-none focus:shadow-none focus:outline-none"  />
                    <base-button 
                     :iconRight="toggleComment ? AltArrowUpIcon : AltArrowDownIcon"
                     @click="toggleComment = !toggleComment"
                     iconWidth="!w-4"
                     iconHeight="!h-4"
                     iconColor="text-primary-500"
                     :label="t('answers')" 
                     class="px-3 py-1 rounded-[80px] bg-greyscale-50 text-sm font-medium text-greyscale-900 border-none focus:shadow-none focus:outline-none" 
                     >
                        <template #badge>
                            <div class="ml-1 w-5 h-5 min-w-5 min-h-5 rounded-full text-primary-500 bg-white flex justify-center items-center text-xs font-semibold">2</div>
                        </template>
                     </base-button>
                </div>
                <slot name="answer"></slot>
            </template>
        </div>
    </div>
</template>

<style></style>
