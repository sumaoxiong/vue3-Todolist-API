<!-- 單個待辦事項 -->
<template>
  <li>
    <!-- todolist 項目內容 -->
    <label class="todoList_label">
      <!-- 顯示模式 -->
      <input class="todoList_input" type="checkbox" :checked="todo.status" @change="onToggle" />
      <span v-if="!isEditing">{{ todo.content }}</span>

      <!-- 編輯模式 -->
      <input
        v-else
        type="text"
        v-model="draft"
        @keyup.enter.prevent="confirmEdit"
        @keyup.esc.prevent="cancelEdit"
        @blur="confirmEdit"
        class="todoList_edit_input"
      />
    </label>
    <!-- 編輯 icon & 功能 -->
    <a v-if="!isEditing" href="#" @click.prevent="startEdit">
      <i class="fa-solid fa-pencil"></i>
    </a>
    <!-- 儲存 icon & 功能 -->
    <a v-else href="#" @click.prevent="confirmEdit" title="儲存">
      <i class="fa-solid fa-floppy-disk"></i>
    </a>
    <!-- 移除 icon & 功能 -->
    <a href="#" @click.prevent="handleRemoveTodo(todo.id)">
      <i class="fa fa-times"></i>
    </a>
  </li>
</template>
<script setup>
import { ref, watch } from 'vue'

// --- Props ---
// 接收從父元件傳入的 todo 物件 (包含 id, content, status 等資料)
const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

// --- Emits ---
// 定義可向父元件觸發的事件
// remove-todo   -> 刪除待辦事項
// toggle-todo   -> 切換完成/未完成狀態
// update-todo   -> 更新待辦事項內容
const emit = defineEmits(['remove-todo', 'toggle-todo', 'update-todo'])

// --- State 狀態管理 ---
const isEditing = ref(false) // 是否進入編輯模式
const draft = ref(props.todo.content) // 暫存編輯中的文字內容 (不直接修改 props)

// --- Watch ---
// 監聽 props.todo.content 的變化
// 當父層更新 todo 時 (例如 API 回傳最新資料)，若目前不是編輯模式，就同步更新 draft
watch(
  () => props.todo.content,
  (v) => {
    if (!isEditing.value) draft.value = v // 若外部更新了 content，非編輯狀態下同步顯示
  },
)

// --- Methods ---
// 切換完成狀態 (勾選 checkbox 時觸發)
const onToggle = () => {
  emit('toggle-todo', props.todo.id)
}

// 進入編輯模式 (點擊編輯 icon 時觸發)
const startEdit = () => {
  isEditing.value = true
  draft.value = props.todo.content
}

// 確認編輯 (按 Enter 或點擊儲存 icon 時觸發)
const confirmEdit = () => {
  const next = draft.value.trim()
  isEditing.value = false
  if (next && next !== props.todo.content) {
    emit('update-todo', { id: props.todo.id, content: next })
  } else {
    // 還原顯示
    draft.value = props.todo.content
  }
}

// 取消編輯 (按 Esc 或離開輸入框時觸發)
const cancelEdit = () => {
  isEditing.value = false
  draft.value = props.todo.content
}

// 刪除待辦事項
const handleRemoveTodo = (id) => {
  emit('remove-todo', id)
}
</script>
