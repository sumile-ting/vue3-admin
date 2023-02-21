<template>
  <router-view #="{ Component }">
    <keep-alive >
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>