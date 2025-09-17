<template>
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
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
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
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
          <span v-if="!email">此欄位不可留空</span>
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
          <input class="formControls_btnSubmit" type="button" @click="handleLogin" value="登入" />
          <router-link class="formControls_btnLink" to="/register">註冊帳號</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { login } from '@/utils/api' // 引入登入 API
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter() // 建立 router 物件，後續可以進行頁面導向

// --- 表單資料 (響應式變數) ---
// 使用者在登入表單輸入的資料
const email = ref('') // 信箱
const password = ref('') // 密碼

// --- Methods ---
// 處理登入流程
const handleLogin = async () => {
  try {
    const response = await login(email.value, password.value) // 呼叫登入 API，傳入 email 與 password
    const { token, exp } = response.data // 從回應中解構出 token 與 exp (token 過期時間)
    document.cookie = `vue3-todolist-token=${token}; expires=${exp}` // 將 token 存到 cookie，並設定過期時間
    alert('登入成功') // 登入成功提示
    router.push('/todolist') // 導向待辦清單頁面
  } catch (error) {
    alert(error.response.data.message) // 若登入失敗 (帳號或密碼錯誤等)，顯示錯誤訊息
  }
}
</script>
