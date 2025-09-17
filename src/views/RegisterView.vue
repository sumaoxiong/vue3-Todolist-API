<!-- 註冊頁面 -->
<template>
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">註冊帳號</h2>
          <h3 style="color: red">(後端每天都會清空資料，包含帳號)</h3>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            v-model="email"
            required
          />
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            placeholder="請輸入您的暱稱"
            v-model="nickname"
          />
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            v-model="password"
            required
          />
          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請再次輸入密碼"
            v-model="confirmPassword"
            required
          />
          <input
            class="formControls_btnSubmit"
            type="button"
            @click="handleRegister"
            value="註冊帳號"
          />
          <router-link class="formControls_btnLink" to="/login">登入</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { register } from '@/utils/api' // 引入註冊 API 方法
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter() // 建立 router 物件，方便程式中做頁面導向

// --- 表單資料 (響應式變數) ---
// 使用者在註冊表單中輸入的資料
const email = ref('') // 信箱
const nickname = ref('') // 暱稱
const password = ref('') // 密碼
const confirmPassword = ref('') // 確認密碼

// --- Methods ---
// 處理註冊流程
const handleRegister = async () => {
  try {
    // 呼叫註冊 API，傳入表單資料
    await register(email.value, password.value, nickname.value)

    // 註冊成功提示
    alert('註冊成功')

    // 導向登入頁面
    router.push('/login')
  } catch (error) {
    // 若 API 回傳錯誤，顯示錯誤訊息
    alert(error.response.data.message)
  }
}
</script>
