
export function useTextSelection() {
  const handleMessageClick = (event) => { 
    // when text selected, avoid message click
    if(!!window.getSelection().toString().length){
      event.stopPropagation(); 
    }
};

  return {
    handleMessageClick,
  };
}