<script setup lang="ts">
import { getCurrentInstance, provide, onMounted, ref } from "vue";
const { proxy }: any = getCurrentInstance();
import { useMainStore } from "./store/main";
const store = useMainStore();
import MainFooter from "./components/MainFooter.vue";
import { darkTheme } from "naive-ui";
provide: {
  store;
}

if (proxy.$common && proxy.$common.isLogin()) {
  let sender = window.localStorage.getItem("sender");
  if (sender) {
    store.sender = JSON.parse(sender);
  }
  proxy.$router.replace({
    name: "HasChat",
  });
}

const changeTheme = (theme: string) => {
  store.theme = theme;
  window.localStorage.setItem("theme", theme);
  switch (theme) {
    case "default":
      document.documentElement.className = "theme-default";
      break;
    case "light":
      document.documentElement.className = "theme-light";
      break;
  }
};
onMounted(() => {
  let theme = window.localStorage.getItem("theme") || "default";
  changeTheme(theme);
});
</script>

<template>
  <div class="change-theme">
    <n-button
      v-if="store.theme == 'light'"
      @click="changeTheme('default')"
      color="#71ADF7"
      >深色</n-button
    >
    <n-button v-else @click="changeTheme('light')" color="#46484D"
      >明亮</n-button
    >
  </div>
  <n-message-provider>
    <router-view></router-view>
    <main-footer></main-footer>
  </n-message-provider>
</template>

<style>
@import "./assets/icon/iconfont.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
.change-theme {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
