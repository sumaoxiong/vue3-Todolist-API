<!-- 新增待辦表單 -->
<template>
  <div class="inputBox">
    <input type="text" placeholder="請輸入待辦事項" v-model="newTodo" />
    <a href="#" @click.prevent="handleAddTodo">
      <i class="fa fa-plus"></i>
    </a>
  </div>
</template>
<script setup>
import { ref } from 'vue'

// --- State 狀態管理 ---
// newTodo 用來雙向綁定輸入框的內容 (新增待辦事項的文字)
const newTodo = ref('')

// --- Emits ---
// 定義可向父元件觸發的事件
// add-todo -> 新增一筆待辦事項
const emit = defineEmits('add-todo')

// --- Methods ---
// 新增待辦事項
// 1. 觸發 add-todo 事件，把 newTodo 的值傳給父元件
// 2. 新增完成後清空輸入框
const handleAddTodo = () => {
  emit('add-todo', newTodo.value)
  newTodo.value = ''
}
</script>
