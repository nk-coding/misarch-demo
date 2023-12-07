<template>
  <router-view />
</template>

<script lang="ts" setup>
  //
</script>
<style>
body,
html,
#app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden !important;
}

::-webkit-scrollbar {
    width: 9px !important;
    height: 9px !important;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    border: 3px solid transparent;
    border-radius: 10px;
    background: rgba(var(--v-theme-on-surface), 0.25);
    background-clip: padding-box;
}

::-webkit-scrollbar-thumb:hover {
    border: 0;
}

::-webkit-scrollbar-corner {
    visibility: hidden;
}

.full-opacity {
    opacity: 1 !important;
}

.full-width {
    width: 100%;
}

.flex-1-1-0 {
    flex: 1 1 0 !important;
}

.text-ellipses {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>