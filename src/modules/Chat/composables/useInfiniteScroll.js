import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES } from '@/enums'
import { useDebounceFn } from '@vueuse/core';


export function useInfiniteScroll(options) {
  const {
    fetchFn,
    containerRef,
    params,
  } = options;

  const list = ref([]);
  const page = ref(params?.page || 1);
  const pageSize = ref(params?.page_size || 10);
  const isLoading = ref(false);
  const hasNext = ref(false);
  const hasMoreLoading = ref(false);
  // Keyingi sahifani yuklash
  const fetchNextPage = async (resetList = true) => {
    if(isLoading.value || hasMoreLoading.value) return;
    if(resetList){
      isLoading.value = true;
    } else {
      hasMoreLoading.value = true;
    }

    try {
        const { data } = await fetchFn({...params, page: page.value, page_size: pageSize.value }, resetList);
        if(resetList) {
          list.value = data?.results || [];
        } else{
          list.value = [...list.value, ...data?.results || []];
        }
        hasNext.value = data?.count > page.value * pageSize.value;
        hasMoreLoading.value = false;
        page.value++;        

    } catch (err) {
      dispatchNotify(null, err?.message, COLOR_TYPES.ERROR)
    } finally {
      isLoading.value = false;
      hasMoreLoading.value = false;
    }
  };

  // Scroll hodisasini boshqarish
  const handleScroll = useDebounceFn(() => {
    const container = containerRef.value;
    if (!container) return;
    
    const { scrollTop, scrollHeight, clientHeight } = container;
    
    // Pastga yaqinlashganda keyingi sahifani yuklash
    if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading.value && !hasMoreLoading.value && hasNext.value) {
      fetchNextPage(false);
    }
  },300);

  onMounted(async() => {
    await fetchNextPage(true);
    
    const container = containerRef.value;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
  });

  onUnmounted(() => {
    const container = containerRef.value;
    if (container) {
      container.removeEventListener('scroll', handleScroll);
    }
  });

  return {
    list,
    isLoading,
    hasMoreLoading
  };
}