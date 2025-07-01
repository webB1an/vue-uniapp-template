<template>
  <view class="content text-red">
    <wd-button size="small">主要按钮</wd-button>
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store/modules/user";
// 使用 pinia
const userStore = useUserStore();

const isLoggedIn = computed(() => userStore.token);
const userInfo = computed(() => userStore.userInfo);

// 跳转到登录页面
const goToLoginPage = () => {
  uni.navigateTo({ url: "/pages/login/index" });
};

// 退出登录处理
const handleLogout = async () => {
  await userStore.logout();
  uni.showToast({ title: "已退出登录", icon: "success" });
};

console.log(import.meta.env.BASE_URL)
const title = ref("Hello");
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin-top: 200rpx;
  margin-right: auto;
  margin-bottom: 50rpx;
  margin-left: auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
