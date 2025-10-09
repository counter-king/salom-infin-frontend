export const extractPaginationCursors = (response) => {
    const nextParams = response?.next && new URL(response.next).searchParams;
    const previousParams = response?.previous && new URL(response.previous).searchParams;
    
    return {
      next: nextParams?.get("cursor") || null,
      previous: previousParams?.get("cursor") || null
    };
  };