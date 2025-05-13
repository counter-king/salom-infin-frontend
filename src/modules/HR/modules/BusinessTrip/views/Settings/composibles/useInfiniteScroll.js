import { ref, onMounted, onUnmounted, nextTick, watch, computed  } from 'vue';
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES } from '@/enums'
import { useDebounceFn } from '@vueuse/core';


export function useInfiniteScroll(options) {
  const {
    fetchFn,
    containerRef,
    params,
    enabled= ref(true)
  } = options;

  const list = ref([]);
  const page = ref(params?.page || 1);
  const pageSize = ref(params?.page_size || 10);
  const isLoading = ref();
  const hasNext = ref(false);
  const hasMoreLoading = ref(false);

  // Keyingi sahifani yuklash
  const fetchNextPage = async (resetList = true, paramsArg = params) => {
    if(isLoading.value || hasMoreLoading.value) return;
    if(resetList){
      isLoading.value = true;
    } else {
      hasMoreLoading.value = true;
    }

    try {
        const { data } = await fetchFn({...paramsArg, page: page.value, page_size: pageSize.value }, resetList);
        if(resetList) {
          list.value = data?.results || [];
        } else {
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
    const container = containerRef?.value;
    if (!container) return;
    
    const { scrollTop, scrollHeight, clientHeight } = container;
    
    // Pastga yaqinlashganda keyingi sahifani yuklash
    if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading.value && !hasMoreLoading.value && hasNext.value) {
      fetchNextPage(false);
    }
  },300);

  const scrollSetUp = ()=>{
    const container = containerRef?.value;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
  }

  const scrollRemove = ()=>{
    const container = containerRef?.value;
    if (container) {
      container.removeEventListener('scroll', handleScroll);
    }
  }

  const refetch = (params) => {
    page.value = 1;
    fetchNextPage(true, params);
  }
  watch(enabled, (val) => {
    if (val) {
      fetchNextPage(true);
      scrollSetUp();
    }
  })
  onMounted(async() => {
    if(enabled.value){
      await fetchNextPage(true);
      scrollSetUp()
    }
  });

  onUnmounted(() => {
    scrollRemove()
  });

  return {
    list,
    isLoading,
    hasMoreLoading,
    hasNext,
    page,
    pageSize,
    refetch
  };
}