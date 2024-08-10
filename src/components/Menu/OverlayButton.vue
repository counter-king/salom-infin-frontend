<template>
  <div>
    <Button label="Open Menu" icon="pi pi-bars" @click="toggleMenu" />
    <TieredMenu :model="items" popup ref="menu" appendTo="body" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import Button from 'primevue/button';
import TieredMenu from 'primevue/tieredmenu';

// Define the custom directive
const subMenuPosition = {
  mounted(el) {
    el.addEventListener('mouseenter', () => {
      const submenu = el.querySelector('.p-submenu-list');
      if (submenu) {
        nextTick(() => {
          const rect = submenu.getBoundingClientRect();
          if (rect.right > window.innerWidth) {
            submenu.style.left = '-500%';
            submenu.style.right = 'auto';
          }
        });
      }
    });
  }
};

const menu = ref(null);
const items = [
  {
    label: 'File',
    icon: 'pi pi-fw pi-file',
    items: [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        items: [
          {
            label: 'Project',
            icon: 'pi pi-fw pi-folder',
          },
          {
            label: 'Other',
            icon: 'pi pi-fw pi-file',
          },
        ],
      },
      {
        label: 'Open',
        icon: 'pi pi-fw pi-external-link',
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-times',
      },
    ],
  },
  {
    label: 'Edit',
    icon: 'pi pi-fw pi-pencil',
    items: [
      {
        label: 'Undo',
        icon: 'pi pi-fw pi-undo',
      },
      {
        label: 'Redo',
        icon: 'pi pi-fw pi-repeat',
      },
    ],
  },
];

const toggleMenu = (event) => {
  menu.value.toggle(event);
};

// Apply directive to all submenus
onMounted(() => {
  nextTick(() => {
    const submenus = document.querySelectorAll('.p-submenu-list');
    submenus.forEach((submenu) => {
      subMenuPosition.mounted(submenu.parentElement);
    });
  });
});
</script>

<style>
.p-tieredmenu-overlay {
  overflow: visible !important;
}

.p-submenu-list {
  overflow: visible !important;
}
</style>
