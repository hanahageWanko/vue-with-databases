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

const addTask = async (): Promise<void> => {
  const response = await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task: task.value, completed: false })
  })
  const data = await response.json()
  tasks.value.push(data)
  task.value = ''
}

const putTask = async (id: number): Promise<void> => {
  const target = tasks.value.find((t) => t.id === id)
  const response = await fetch('http://localhost:3000/tasks', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, completed: target?.completed })
  })
  const data = await response.json()
  if (tasks.value && data) {
    const currentTask = tasks.value.find((task) => task.id === data[0].id)
    currentTask!.completed = data[0].completed
  }
}

const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch('http://localhost:3000/tasks', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  })
  const data = await response.json()
  if (tasks.value && data) {
    const index = tasks.value.findIndex((task) => task.id === data.id)
    tasks.value.splice(index, 1)
  }
}

/***********
 * calls
 */
getTasks()
</script>

<template>
  <h1>Tasks</h1>
  <ul>
    <li v-for="t in tasks" :key="t.id" :style="t.completed ? 'text-decoration:line-through' : ''">
      <span><input type="checkbox" v-model="t.completed" @change="putTask(t.id)" /></span>
      <span>{{ t.task }}</span>
      <button @click="deleteTask(t.id)">削除</button>
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
