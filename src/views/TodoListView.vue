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

const router = useRouter()

const todos = ref([])
const loading = ref(false)

//取得todos
const fetchTodos = async () => {
  loading.value = true
  try {
    const ok = await handlecheckout() // 登入驗證，並取得用戶名稱
    const res = await get_todos() //抓取用戶的todolist資料
    // 依你的後端回傳格式調整
    // 假設 res.data = { data: [ { id, content, status }, ... ] }
    todos.value = res.data.data
  } catch (err) {
    console.error('取得待辦失敗：', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchTodos)

//新增todo
const addTodo = async (content) => {
  const text = content.trim()
  if (!text) return
  try {
    await post_todos({ content: text, status: false })
    await fetchTodos()
  } catch (err) {
    console.error('新增待辦失敗：', err)
  }
}

//項目移除
const removeTodo = async (id) => {
  try {
    await delete_todos(id)
    todos.value = todos.value.filter((t) => t.id !== id)
  } catch (err) {
    console.error('刪除待辦失敗：', err)
  }
}

//狀態更新
const toggleTodo = async (id) => {
  const idx = todos.value.findIndex((t) => t.id === id)
  if (idx === -1) return
  const prev = todos.value[idx].status
  // 樂觀更新
  todos.value[idx].status = !prev
  try {
    await toggle_todos(id)
  } catch (err) {
    // 失敗回滾
    todos.value[idx].status = prev
    console.error('切換狀態失敗：', err)
  }
}

//項目編輯
const updateTodo = async ({ id, content }) => {
  const idx = todos.value.findIndex((t) => t.id === id)
  if (idx === -1) return
  const prev = todos.value[idx].content
  // 樂觀更新
  todos.value[idx].content = content
  try {
    // 視後端需求，只送 content（或一起送 status）
    await put_todos(id, { content })
  } catch (err) {
    todos.value[idx].content = prev
    console.error('更新待辦失敗：', err)
  }
}

//登出
const signout = async () => {
  try {
    await logout()
    router.push('/login')
  } catch (error) {
    alert(error.response.data.message)
  }
}

//登入驗證
const checkoutmessage = ref('')

const handlecheckout = async () => {
  try {
    const response = await checkout()
    checkoutmessage.value = response.data.nickname
  } catch (error) {
    checkoutmessage.value = '驗證失敗'
  }
}
</script>
