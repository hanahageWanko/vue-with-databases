<script setup lang="ts">
/*********
 * imports
 */
import { ref } from 'vue'
import type { Ref } from 'vue'

/*********
 * types
 */

// type iTasks = { [x: string]: string | number | boolean }[] | null
type iTasks = {
  id: number
  task: string
  completed: boolean
}

/**********
 * variables
 */
const tasks: Ref<iTasks[]> = ref([])
const task: Ref<string> = ref('')

/**********
 * functions
 */
const getTasks = async (): Promise<void> => {
  const response = await fetch('http://localhost:3000/tasks')
  const data = await response.json()
  tasks.value = data
}

const addTask = (): void => {
  tasks.value.push({ id: 0, task: task.value, completed: false })
  task.value = ''
  // id++
}

const deleteTask = (id: number): void => {
  const index = tasks.value.findIndex((task) => task.id === id)
  tasks.value.splice(index, 1)
}

/***********
 * calls
 */
getTasks()
</script>

<template>
  <h1>Tasks</h1>
  <ul>
    <li
      v-for="task in tasks"
      :key="task.id"
      :style="task.completed ? 'text-decoration:line-through' : ''"
    >
      <span><input type="checkbox" v-model="task.completed" /></span>
      <span>{{ task.task }}</span>
      <button @click="deleteTask(task.id)">削除</button>
    </li>
  </ul>
  <form @submit.prevent="addTask">
    <div>
      <input v-model="task" />
    </div>
    <div>
      <button type="submit">タスクを登録</button>
    </div>
  </form>
</template>

<style scoped></style>
