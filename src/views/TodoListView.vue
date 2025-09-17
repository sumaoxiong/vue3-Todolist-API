<!-- TodoList 主頁 -->
<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#"
            ><span>{{ checkoutmessage }}的代辦</span></a
          >
        </li>
        <li><a href="#" @click.prevent="signout">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <TodoForm @add-todo="addTodo"></TodoForm>
        <TodoList
          v-if="todos.length"
          :todos="todos"
          @remove-todo="removeTodo"
          @toggle-todo="toggleTodo"
          @update-todo="updateTodo"
        ></TodoList>
        <p v-else>尚無待辦事項</p>
      </div>
    </div>
    <input class="formControls_btnSubmit" type="button" @click="handlecheckout" value="登入驗證" />
  </div>
</template>

<script setup>
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'
import {
  get_todos,
  post_todos,
  delete_todos,
  checkout,
  logout,
  put_todos,
  toggle_todos,
} from '@/utils/api'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

//靜態測試
/* const todos = ref([
  { id: 1, content: '把冰箱發霉的檸檬拿去丟', status: false },
  { id: 2, content: '打電話叫媽媽匯款給我', status: true },
]) */

const router = useRouter() // 建立 router，控制頁面跳轉

// --- 狀態管理 ---
const todos = ref([]) // 儲存待辦清單資料，資料內容為矩陣，所以用`[]`來接收
const loading = ref(false) // 資料載入中狀態 (控制 loading 畫面)

// --- 取得 todos (載入清單資料) ---
const fetchTodos = async () => {
  loading.value = true
  try {
    const ok = await handlecheckout() // 先做登入驗證 (確認用戶狀態/名稱)
    const res = await get_todos() // 呼叫 API 取得用戶的待辦清單
    todos.value = res.data.data
  } catch (err) {
    console.error('取得待辦失敗：', err)
  } finally {
    loading.value = false
  }
}
// 元件加載時，自動抓取 todos
onMounted(fetchTodos)

// --- 新增 todo ---
const addTodo = async (content) => {
  const text = content.trim()
  if (!text) return // 空字串不處理
  try {
    await post_todos({ content: text, status: false }) // 新增一筆未完成的待辦
    await fetchTodos() // 新增後重新抓取清單
  } catch (err) {
    console.error('新增待辦失敗：', err)
  }
}

// --- 刪除 todo ---
const removeTodo = async (id) => {
  try {
    await delete_todos(id) // 呼叫 API 刪除
    todos.value = todos.value.filter((t) => t.id !== id) // 前端也同步移除 (避免重新載入)
  } catch (err) {
    console.error('刪除待辦失敗：', err)
  }
}
/*
(t) => t.id !== id 的語義
- t 為陣列中的每一個代辦事項
- t.id 為每個代辦事項的id
- t.id !== id → 當前這筆待辦的 id 不等於 傳進來的 id 時，才會被保留下來
*/

// --- 切換完成/未完成狀態 ---
const toggleTodo = async (id) => {
  const idx = todos.value.findIndex((t) => t.id === id) //找到要切換的那一筆資料在陣列中的索引
  if (idx === -1) return // 找不到就直接結束，因為findIndex如果沒找到資料就會回傳-1，而當idx為-1時就強制結束
  const prev = todos.value[idx].status //暫存「切換前」的狀態，等失敗時用於回滾
  todos.value[idx].status = !prev //先把畫面上的狀態切了，讓使用者馬上看到變化，等後端回應再說
  try {
    await toggle_todos(id) //呼叫 API 真正更新後端資料
  } catch (err) {
    // 失敗回滾
    todos.value[idx].status = prev //如果 API 失敗，把畫面狀態「回滾」到原本的值，維持資料一致
    console.error('切換狀態失敗：', err)
  }
}

// --- 編輯待辦 (更新內容) ---
const updateTodo = async ({ id, content }) => {
  const idx = todos.value.findIndex((t) => t.id === id) //找到要編輯的那一筆資料在陣列中的索引
  if (idx === -1) return // 找不到就直接結束，因為findIndex如果沒找到資料就會回傳-1，而當idx為-1時就強制結束
  const prev = todos.value[idx].content //暫存「編輯前」的狀態，等失敗時用於回滾
  todos.value[idx].content = content //先把畫面上的狀態切了，讓使用者馬上看到變化，等後端回應再說
  try {
    await put_todos(id, { content }) //呼叫 API，通知後端更新
  } catch (err) {
    todos.value[idx].content = prev //如果 API 失敗，把畫面狀態「回滾」到原本的值，維持資料一致
    console.error('更新待辦失敗：', err)
  }
}

// --- 登出 ---
const signout = async () => {
  try {
    await logout() // 呼叫 API 登出
    router.push('/login') // 登出後跳轉回登入頁
  } catch (error) {
    alert(error.response.data.message)
  }
}

// --- 登入驗證 (檢查使用者狀態) ---
const checkoutmessage = ref('') // 紀錄驗證訊息 (或使用者暱稱)

const handlecheckout = async () => {
  try {
    const response = await checkout() // 呼叫 API 做登入驗證
    checkoutmessage.value = response.data.nickname // 成功 -> 顯示用戶暱稱
  } catch (error) {
    checkoutmessage.value = '驗證失敗'
  }
}
</script>
