<template>
    <div class="flex items-end gap-1">
      <div class="text-sm font-medium text-success-500 select-none">typing</div>
      <div class="dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </template>
    
  <style scoped>
    .dots {
      display: flex;
      gap: 2px;
      margin-bottom: 3px;
    }
    
    .dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background-color: var(--success-500);
      opacity: 0.6;
      transform: scale(0.6);
      animation: fadeInOut 0.8s infinite;
    }
    
    .dot:nth-child(1) {
      animation-delay: 0s; 
    }
    
    .dot:nth-child(2) {
      animation-delay: 0.16s; 
    }
    
    .dot:nth-child(3) {
      animation-delay: 0.32s; 
    }
    
    @keyframes fadeInOut {
      0% { opacity: 0.6; transform: scale(0.6); }
      50% { opacity: 1; transform: scale(1); }
      100% { opacity: 0.6; transform: scale(0.6); }
    }
  </style>