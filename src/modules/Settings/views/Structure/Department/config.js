export const tableConfig = {
   bodyRow: { class: ['cursor-pointer hover:bg-greyscale-100 !rounded-xl relative', `after:content-[''] after:bg-greyscale-200 after:absolute after:bottom-0 after:left-[9px]`] },
   emptymessagecell: { class: ['bg-white !rounded-xl'] },
   loadingoverlay: { class: ['bg-transparent'] },
   rowExpansionCell: { class: '!bg-white rounded-xl' },
   rowStyle: { borderRadius: '4px' },
   table: { class: ['border-separate '] },
   thead: { class: ['bg-greyscale-100'] },
};
export const columnConfig = {
   bodyCell: { class: ['text-xs py-2 h-[44px] min-w-[40px] px-3 border-none'] },
   bodyCellContent: {class: ['text-sm font-semibold text-greyscale-500']},
   headerCell: { class: ['bg-inherit h-[44px] text-left px-3 py-2 border-none'] },
   headerContent: { class: ['text-sm font-semibold text-greyscale-500'] },
};
export const dialogConfig = {
   closeButton: { class: ['w-9 h-9 shadow-button bg-white'] },
   closeButtonIcon: { class: ['w-3 h-3'] },
   content: { class: ['p-6 p-ripple-disabled w-full shadow-none max-w-[610px]'] },
   footer: { class: ['rounded-b-2xl bg-greyscale-50 border border-solid border-t-greyscale-200 p-6'] },
   header: { class: ['rounded-t-2xl bg-greyscale-50 border border-solid border-b-greyscale-200'] },
   root: { class: ['p-dialog rounded-2xl'] },
};
export const paginationConfig = {
   current: { class: ['text-xs text-greyscale-300 mr-auto h-full'] },
   firstPageButton: { class: ['rounded-[6px] h-6 w-6 min-w-[24px] border border-solid border-border-1'] },
   lastPageButton: { class: ['rounded-[6px] h-6 w-6 min-w-[24px] border border-solid border-border-1'] },
   nextPageButton: { class: ['rounded-[6px] h-6 w-6 min-w-[24px] border border-solid border-border-1'] },
   pageButton: ({ context }) => ({ class:  [ context.active ? ['bg-primary-500 text-primary-0'] : undefined, 'rounded-[6px] h-6 w-6 min-w-[24px] text-xs'] }),
   paginatorWrapper: { class: ['w-[100%]'] },
   previousPageButton: { class: ['rounded-[6px] h-6 w-6 min-w-[24px] border border-solid border-border-1'] },
   root: { class: ['h-9 rounded-4 w-full rounded-[12px] pt-2 px-0 pb-0'] },
   start: { class: ['m-0'] }
};
export const dropdownConfig = {
   dropdownicon: { class: ['w-3', 'h-3'] },
   input: { class: ['flex', 'items-center', 'text-xs', 'font-semibold'] },
   item: { class: ['h-8', 'text-xs', 'flex', 'items-center'] },
   list: { class: ['p-0'] },
   paginatorWrapper: ['flex', 'justify-between', 'border', 'border-solid'],
   root: { class: ['h-7', 'rounded-2',  'm-0'] },
   trigger: { class: ['w-[30px]'] },
};
export const menuConfig = {
   action: { class: ['py-[6px] pl-3 min-h-[32px]'] },
   content: { class: ['rounded-lg'] },
   label: { class: ['text-sm font-medium text-primary-900'] },
   menuitem: { class: 'group mb-1' },
   root: { class: 'rounded-xl shadow-menu px-1.5 pb-0 pt-1.5' },
   submenuHeader: { class: 'py-[6px] pl-3 text-sm font-semibold text-primary-500' }
};
export const menu2Config = {
   action: { class: ['py-[6px] pl-3 min-h-[32px]'] },
   content: { class: ['rounded-lg'] },
   label: { class: ['text-sm font-medium text-primary-900'] },
   menuitem: { class: 'group mb-1' },
   root: { class: 'translate-y-1 rounded-xl shadow-menu px-1 pb-0' },
   submenuHeader: { class: 'py-[6px] pl-3 text-sm font-semibold text-primary-500' }
};
export const dropdownOptions = [
   { name: '10', page_size: 10 },
   { name: '15', page_size: 15 },
   { name: '20', page_size: 20 },
   { name: '30', page_size: 30 },
];
export const overlayConfig = {
   content: ['p-0'],
   root: ['translate-y-0 rounded-2xl shadow-menu after_none bg-white mt-[6px] overflow-hidden'],
};