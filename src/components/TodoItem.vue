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

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['remove-todo', 'toggle-todo', 'update-todo'])

const isEditing = ref(false)
const draft = ref(props.todo.content)

watch(
  () => props.todo.content,
  (v) => {
    if (!isEditing.value) draft.value = v // 若外部更新了 content，非編輯狀態下同步顯示
  },
)

const onToggle = () => {
  emit('toggle-todo', props.todo.id)
}

const startEdit = () => {
  isEditing.value = true
  draft.value = props.todo.content
}

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

const cancelEdit = () => {
  isEditing.value = false
  draft.value = props.todo.content
}

const handleRemoveTodo = (id) => {
  emit('remove-todo', id)
}
</script>
