<script setup>
// Core
import { useModel } from "vue";
import { useI18n } from "vue-i18n";
// Components
import { Froala } from "vue-froala-wysiwyg/src/vue-froala";
// JS
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins/table.min';
import 'froala-editor/js/languages/ru'
// CSS
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/plugins/table.min.css';

const props = defineProps({
	modelValue: {
		type: String,
	}
});

const { t } = useI18n();
const modelValue = useModel(props, 'modelValue');
const emit = defineEmits(['update:modelValue']);

const config = {
	placeholderText: t('enter-text'),
	charCounterCount: false,
	immediateVueModelUpdate: true,
	toolbarButtons: ['bold', 'italic', 'underline', 'fontSize', 'lineHeight', 'textColor', 'backgroundColor', 'clearFormatting', 'insertTable'],
	attribution: false,
	// enter: 'ENTER_BR',
	heightMax: 500,
	heightMin: 300,
	imagePaste: false,
	fontSize: ['8', '10', '12', '13', '14', '16', '18', '30', '60', '96'],
	language: 'ru',
	quickInsertEnabled: false,
	lineHeights: { '1': '1', '1.15': '1.15', '1.5': '1.5', '2': '2'},
	tableStyles: {
		customTable: t('default-table'),
	},
	tableEditButtons: ['tableStyle', 'tableRows', 'tableColumns', 'tableCells', 'tableCellBackground', 'tableCellVerticalAlign', 'tableCellHorizontalAlign', 'tableRemove'],
	events: {
		initialized: () => {
			console.log('initialized')
		},
		'table.inserted': (table) => {
			table.classList.add('customTable');
		}
	}
}
</script>

<template>
	<froala
		v-model:value="modelValue"
		:config="config"
		ref="editor"
	></froala>
<!--	<pre>{{ modelValue }}</pre>-->
</template>

<style>
.customTable thead tr th,
.customTable tbody tr td  {
	border: 1px solid;
	padding: 5px;
}
.fr-wrapper, .fr-second-toolbar {
	background: var(--greyscale-50)!important;
	border: none!important;
	border-radius: 0 0 10px 10px!important;
}
.fr-toolbar {
	background: var(--greyscale-70)!important;
	border: none!important;
}

.fr-command svg path {
	fill: var(--greyscale-900)!important;
}

.fr-active, .fr-btn:hover {
	background: var(--greyscale-90)!important;
}

/*.fr-second-toolbar,
.fr-wrapper a {
	display: none!important;
}*/

/*a[href='https://www.froala.com/wysiwyg-editor?k=u'] {
	font-size: 0px !important;
	padding: 0px !important;
	height: 0px !important;
}*/
.fr-wrapper>div>a {
	opacity: 0!important;
}

p[data-f-id="pbf"] {
	display: none!important;
}
</style>
