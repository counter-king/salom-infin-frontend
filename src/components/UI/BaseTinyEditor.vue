<script setup>
// Core
import Editor from '@tinymce/tinymce-vue'
import {useModel} from "vue"

const props = defineProps({
  modelValue: {
    type: [String]
  },
  pastePlainText: {
    type: Boolean,
    default: true
  },
  height: {
    type: [String, Number],
    default: 400
  },
  disabled: {
    type: Boolean,
    default: false
  },
})

const modelValue = useModel(props, 'modelValue')

</script>


<template>
  <editor
    v-model="modelValue"
    api-key="5ifk23mj486i9ebzgl4zzkd89v3am3i5onttuut1ub8n5dll"
    tinymce-script-src="/tinymce/tinymce.min.js"
    placeholder="Введите текст..."
    :disable="disabled"
    :paste_as_text="true"
    :init="{
        plugins: [
           'table', `${pastePlainText ? 'paste' : ''}`, 'link'
         ],
        language: 'ru',
        toolbar: 'undo redo | bold italic underline forecolor fontsizeselect lineheight | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | link | unlink',
        height: `${height}`,
        menubar: '',
        fontsize_formats: `6px 8px 9px 10px 11px 12px 13px 14px 16px 18px 24px 36px`,
        font_size_input_default_unit: 'px',
        paste_as_text: pastePlainText,
        content_style: `body {font-size: 16px;}`,
        link_protocol: 'https://',
        link_default_target: '_blank',
        link_target: '_blank',
        link_title: false,
        link_list: undefined  
        // table_default_attributes: {
        //   class: 'tinymce-table'
        // },
        // table_default_styles: {
        //   width: '100%',
        //   border: '1px solid #000000'
        // },
        // powerpaste_allow_local_images: true,
			  // powerpaste_word_import: 'prompt',
			  // powerpaste_html_import: 'prompt',
			  // paste_webkit_styles: 'font-style, font-size'
      }"
  />
</template>

<style>
.tox-tinymce{
  border: none!important;
  border-radius: 16px!important;
}

.tox-toolbar__group{
  border-right: none!important;
}

.tox-toolbar__primary{
  border-top: none!important;
  margin-top: 0!important;
  background: var(--greyscale-50)!important;
}

.tox-edit-area__iframe{
  background-color: var(--greyscale-50) !important;
}

.tox-statusbar{
  border-top: 0!important;
  background-color: var(--greyscale-50) !important;
}

.tox-statusbar__branding{
  display: none!important;
}

.tox-statusbar__path{
  display: none!important;
}

.tox-promotion{
  display: none!important;
}

.tox-editor-header{
  box-shadow: none!important;
  padding: 2px 0!important;
}

.tox-toolbar-overlord{
  margin: 0!important;
  padding: 0!important;
  border: 0!important;
}

.tox-tbtn__select-label{
  width: 3em!important;
}
</style>
