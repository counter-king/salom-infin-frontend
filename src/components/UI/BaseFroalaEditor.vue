<script setup>
// Core
import { nextTick, onMounted, useModel } from "vue";
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
	placeholderText: '',
	charCounterCount: false,
	immediateVueModelUpdate: true,
	toolbarButtons: ['bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'lineHeight', 'formatOL', 'formatUL', 'indent', 'outdent', 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'textColor', 'backgroundColor', 'clearFormatting', 'insertTable'],
	attribution: false,
	// enter: 'ENTER_BR',
	heightMax: 500,
	heightMin: 300,
	imagePaste: false,
  fontFamily: {
    'Arial,Helvetica,sans-serif': 'Arial',
    "'Times New Roman',Times,serif": 'Times New Roman',
  },
  fontFamilyDefaultSelection: 'Arial',
  fontFamilySelection: true,
	fontSize: ['8', '10', '12', '13', '14', '16', '18', '30', '60', '96'],
  fontSizeSelection: true,
	language: 'ru',
	quickInsertEnabled: false,
	lineHeights: { '1': '1', '1.15': '1.15', '1.5': '1.5', '2': '2'},
	tableStyles: {
		customTable: t('default-table'),
	},
	tableEditButtons: ['tableStyle', 'tableRows', 'tableColumns', 'tableCells', 'tableCellBackground', 'tableCellVerticalAlign', 'tableCellHorizontalAlign', 'tableRemove'],
  tabSpaces: 8,
  events: {
		'table.inserted': (table) => {
			table.classList.add('customTable');
		},
    'commands.after': (cmd, param1, param2) => {
      commandAfter(cmd, param1, param2);
    }
	}
}

// Methods
const commandAfter = (cmd, param1, param2) => {
  if (['formatOL','formatUL'].includes(cmd)) {
    let editor = document.querySelector('.fr-element');
    if (editor) {
      let ol = editor.getElementsByTagName('ol');
      let ul = editor.getElementsByTagName('ul');
      if (ol){
        for (let i = 0; i < ol.length; i++) {
          ol[i].classList.add('customParagraph');
        }
      }
      if (ul){
        for (let i = 0; i < ul.length; i++) {
          ul[i].classList.add('customParagraph');
        }
      }
    }
  }
}

// Hooks
onMounted(() => {
	// Insert production-class in production mode to eradicate red alert of froala editor
	setTimeout(() => {
		const element = document.querySelector('.fr-element');
		const parentElement = document.querySelector('.fr-wrapper');
		if (parentElement && process.env.NODE_ENV !== 'development') {
			const firstChild = parentElement.querySelector(':first-child');
			if (firstChild && firstChild.tagName.toLowerCase() === 'div' && !firstChild.classList.length){
				firstChild.classList.add('negative-z-index');
			}
		}
		if (element && process.env.NODE_ENV !== 'development') {
			element.classList.add('production-class');
		}
	}, 100);
})
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
.customParagraph {
  margin-left: 48px;
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
	background: var(--greyscale-200)!important;
}

.fr-wrapper>div>a {
	opacity: 0!important;
	z-index: -1!important;
	pointer-events: none!important;
}

p[data-f-id="pbf"] {
	display: none!important;
}

.production-class {
	margin-top: -48px!important;
}

.fr-second-toolbar {
	display: none!important;
}

.negative-z-index {
	z-index: -1!important;
}
</style>
