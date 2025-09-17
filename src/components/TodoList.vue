<!-- 待辦列表 -->
<template>
  <div class="todoList_list">
    <ul class="todoList_tab">
      <li>
        <a
          href="#"
          @click.prevent="filterStatus = 'all'"
          :class="{ active: filterStatus === 'all' }"
          >全部</a
        >
      </li>
      <li>
        <a
          href="#"
          @click.prevent="filterStatus = 'incomplete'"
          :class="{ active: filterStatus === 'incomplete' }"
          >待完成</a
        >
      </li>
      <li>
        <a
          href="#"
          @click.prevent="filterStatus = 'complete'"
          :class="{ active: filterStatus === 'complete' }"
          >已完成</a
        >
      </li>
    </ul>
    <div class="todoList_items">
      <ul class="todoList_item">
        <TodoItem
          v-for="todo in filterTodos"
          :key="todo.id"
          :todo="todo"
          @remove-todo="emit('remove-todo', $event)"
          @toggle-todo="emit('toggle-todo', $event)"
          @update-todo="emit('update-todo', $event)"
        ></TodoItem>
      </ul>
      <div class="todoList_statistics">
        <p>{{ incompleteTodos.length }} 個未完成項目</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import TodoItem from './TodoItem.vue' // 引入 TodoItem 元件 (用來顯示單筆待辦事項)
import { computed, ref } from 'vue'

// --- Props ---
// 接收從父元件傳入的 todos 陣列
// todos: [{ id, content, status }, ...]
const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
})

// --- Emits ---
// 定義可向父元件觸發的事件
// remove-todo -> 刪除待辦事項
// toggle-todo -> 切換完成/未完成狀態
// update-todo -> 更新待辦事項內容
const emit = defineEmits(['remove-todo', 'toggle-todo', 'update-todo'])

// --- State 狀態管理 ---
// filterStatus 紀錄目前的篩選條件 (all, complete, incomplete)
const filterStatus = ref('all')

// --- Computed 計算屬性 ---
// 根據 filterStatus 決定要顯示哪些待辦事項
const filterTodos = computed(() => {
  switch (filterStatus.value) {
    case 'incomplete': // 篩選「未完成」的待辦事項
      return props.todos.filter((t) => !t.status)
    case 'complete': // 篩選「已完成」的待辦事項
      return props.todos.filter((t) => t.status)
    default: // all -> 顯示全部
      return props.todos
  }
})

// 計算所有「未完成」的待辦事項，用來顯示剩餘數量
const incompleteTodos = computed(() => props.todos.filter((t) => !t.status))
</script>
