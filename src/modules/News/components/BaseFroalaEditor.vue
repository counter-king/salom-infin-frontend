<script setup>
// Core
import { ref, onMounted, useModel } from "vue";
import { useI18n } from "vue-i18n";
// Components
import { Froala } from "vue-froala-wysiwyg/src/vue-froala";
// JS
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins/table.min';
import 'froala-editor/js/languages/ru'
import "froala-editor/js/plugins/char_counter.min.js"; 
import "froala-editor/js/plugins/link.min.js"; 

// CSS
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/plugins/table.min.css';


const props = defineProps({
	modelValue: {
		type: String,
	},
  disabled: {
    type: Boolean
  },
  error: {
    type: Object,
    default: () => ({
      $error: false,
      $errors: []
    })
  },
  charMaxList: {
    type: Number,
  }
});

const { t } = useI18n();
const modelValue = useModel(props, 'modelValue');
const emit = defineEmits(['update:modelValue']);
// Reactive
const editor = ref(null)
// Macros
defineExpose({ editor })

const cleanContent = (cleanContentPaste) => {
  const editorContent = editor.value?.$el.querySelector('.fr-element')?.innerHTML || '';

  // DOMParser orqali tarkibni manipulyatsiya qilish
  const parser = new DOMParser();
  const doc = parser.parseFromString(!!cleanContentPaste ? cleanContentPaste : editorContent, 'text/html');

  // Barcha elementlarni olish
  const elements = Array.from(doc.body.children);
    
  // Boshi va oxiridan bo'sh yoki faqat <br> bo'lgan elementlarni olib tashlash
  while (elements.length && (!elements[0].textContent.trim() || elements[0].innerHTML.trim() === '<br>')) {
    elements.shift(); // Boshi bo'sh bo'lganini olib tashlash
  }

  while (elements.length && (!elements[elements.length - 1].textContent.trim() || elements[elements.length - 1].innerHTML.trim() === '<br>')) {
    elements.pop(); // Oxiri bo'sh bo'lganini olib tashlash
  }

  // agar birinichi elemetni ichida <br> bo'lsa o'chirib tashlash
  while (elements[0]?.children.length && elements[0].firstChild.nodeName == "BR") {
    elements[0].removeChild(elements[0].firstChild);
  }

  // agar oxirgini elemetni ichida <br> bo'lsa o'chirib tashlash
  while (elements[elements.length - 1]?.children.length && elements[elements.length - 1]?.lastChild?.nodeName == "BR") {
    elements[elements.length - 1].removeChild(elements[elements.length - 1].lastChild);
  }

  // Tozalangan tarkibni qayta yig'ish
  const cleanedContent = elements.map((el) => el.outerHTML).join('').trim();

  if(!!cleanContentPaste){
    return cleanedContent
  } else {
    // Tozalangan tarkibni emit qilish
    emit('update:modelValue', cleanedContent);
  }
};

const cleanContentPaste = (content) => {
  if (typeof content !== 'string') return content;

  content = cleanContent(content);
  // Trim leading and trailing whitespace, including non-breaking spaces
  content = content.replace(/^[\s\u00A0]+|[\s\u00A0]+$/g, '');
  
  // Remove inline styles
  content = content.replace(/ style="[^"]*"/g, '');
  
  // Remove specific style-related tags (e.g., <i>, <b>, <em>, etc.)
  content = content.replace(/<(i|b|em|strong|u|s|strike)>/g, ''); // Remove opening tags
  content = content.replace(/<\/(i|b|em|strong|u|s|strike)>/g, ''); // Remove closing tags
  
  // Remove empty tags (e.g., <p></p>, <div></div>)
  content = content.replace(/<([a-z][a-z0-9]*)[^>]*>(\s*)<\/\1>/gi, '');

  // Remove empty <p> tags at the beginning and end
  content = content.replace(/^<p>\s*<\/p>/g, '').replace(/<p>\s*<\/p>$/g, '');

  // Trim leading and trailing <br> and &nbsp;
  content = content.replace(/^(<br\s*\/?>|&nbsp;)+|(<br\s*\/?>|&nbsp;)+$/g, '');
  
  return content;
};


const config = {
	placeholderText: '',
	charCounterCount: false,
	immediateVueModelUpdate: true,
	toolbarButtons: ['bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'lineHeight', 'formatOL', 'formatUL', 'indent', 'outdent', 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'textColor', 'backgroundColor', 'clearFormatting', 'insertTable', 'insertLink', "linkRemove"],
	attribution: false,
	// enter: 'ENTER_BR',
	heightMax: 500,
	heightMin: 300,
  charCounterMax: props.charMaxList ? props.charMaxList : -1,
  charCounterCount: !!props.charMaxList,
  linkAlwaysBlank: true, // Havolalarni yangi tabda ochadi
  linkEditButtons: ["linkEdit", "linkRemove"], // Havola tahrirlash tugmalari
  linkAutoPrefix: true, // URL avtomatik to'ldiriladi
  linkAttributes: {
  },
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
  pasteAllowedStyleProps:[],
  events: {
		'table.inserted': (table) => {
			table.classList.add('customTable');
		},
    'commands.after': (cmd, param1, param2) => {
      commandAfter(cmd, param1, param2);
    },
	'blur': () => {		
		cleanContent();
	},
	'paste.afterCleanup': function (clipboardHTML) {    
      return cleanContentPaste(clipboardHTML);
    },
	},
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


  setTimeout(() => {
    const element = document.querySelector('.fr-element');
     if (element && process.env.NODE_ENV !== 'development') {
       const child = element.querySelector('div')
       const a = child.querySelector('a')

       if(child && a && child.style.zIndex === '9999' && child.style.position === 'relative' 
          && a.style.zIndex === '9999' && a.style.position === 'relative' && child.style.width === '100%')
        {
          child.style.display = 'none'
        }
    }
  }, 100);
})
</script>

<template>
	<froala
		v-model:value="modelValue"
		:config="config"
		ref="editor"
		:class="{
		'froala-editor rounded-[10px] border border-transparent': true,
		'p-invalid': props.error.$error,
		'opacity-60 pointer-events-none': props.disabled
		}"
	></froala>

  <template v-if="props.error.$errors.length">
    <div class="space-y-1 mt-2">
      <div
        v-for="element of props.error.$errors"
        :key="element.$uid"
      >
        <span class="block text-sm font-medium text-red-500">{{ element.$message }}</span>
      </div>
    </div>
  </template>
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

.froala-editor.p-invalid {
  border-color: #e24c4c !important;
}

.fr-sticky-on {
  position: relative; 
}

.fr-sticky-dummy {
  height: 0px!important;
}
</style>
