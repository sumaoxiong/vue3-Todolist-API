<!-- 404頁面 -->
<template>
  <div class="not-found">
    <h1>404 - 頁面不存在</h1>
    <p>抱歉，您輸入的網址有誤。</p>
    <router-link to="/todolist">回到首頁</router-link>
  </div>
</template>

<script setup></script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}
</style>
