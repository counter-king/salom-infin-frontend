import { ref, onMounted, onUnmounted, nextTick, watch, reactive, computed  } from 'vue';
import { dispatchNotify } from '@/utils/notify';
import { COLOR_TYPES } from '@/enums';
import { useDebounceFn } from '@vueuse/core';

export function useInfiniteScroll(options) {
  const {
    fetchFn,
    containerRef,
    params,
    enabled= ref(true)
  } = options;

  const list = ref([]);
  const page = computed({
    get: () => params?.page || 1,
    set: () => {}
  });
  const pageSize = computed({
    get: () => params?.page_size || 10,
    set: () => {}
  });
  const isLoading = ref(false);
  const hasNext = ref(false);
  const hasMoreLoading = ref(false);

  const fetchNextPage = async (resetList = true) => {
    if (isLoading.value || hasMoreLoading.value) return;

    if (resetList) {
      isLoading.value = true;
      page.value = params?.page || 1; // resetda page ham qayta boshlansin
    } else {
      hasMoreLoading.value = true;
    }

    try {
      const { data } = await fetchFn(
        {...params, page: page.value, page_size: pageSize.value,  },
        resetList
      );

      if (resetList) {
        list.value = data?.results || [];
      } else {
        list.value = [...list.value, ...(data?.results || [])];
      }

      hasNext.value = data?.count > page.value * pageSize.value;
      page.value++;

    } catch (err) {
      dispatchNotify(null, err?.message, COLOR_TYPES.ERROR);
    } finally {
      isLoading.value = false;
      hasMoreLoading.value = false;
    }
  };

  const handleScroll = useDebounceFn(() => {
    const container = containerRef?.value;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    if (
      scrollTop + clientHeight >= scrollHeight - 100 &&
      !isLoading.value &&
      !hasMoreLoading.value &&
      hasNext.value
    ) {
      fetchNextPage(false);
    }
  }, 300);

  const setupScroll = () => {
    const container = containerRef?.value;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
  };

  // Refetch method
  const refetch = async () => {
    // Fetch again with resetList as true
    await fetchNextPage(true);
  };
  
  const removeScroll = () => {
    const container = containerRef?.value;
    if (container) {
      container.removeEventListener('scroll', handleScroll);
    }
  };

  watch(enabled, (val) => {
    if (val) {
      fetchNextPage(true);
      setupScroll();
    } else {
      removeScroll();
    }
  });

  watch(() => params, () => {
    fetchNextPage(true);
  }, { deep: true });

  onMounted(() => {
    if (enabled.value) {
      fetchNextPage(true);
      setupScroll();
    }
  });

  onUnmounted(() => {
    removeScroll();
  });

  return {
    list,
    isLoading,
    hasMoreLoading,
    fetchNextPage, 
    refetch 
  };
}
