<script setup lang="ts">
/*************
 * imports
 */
import { ref } from 'vue'
import type { Ref } from 'vue'

/************
 * types
 */

type iTasks = {
  id: number
  task: string
  completed: boolean
}

/************
 * variables
 */
let id = 0
const tasks: Ref<iTasks[]> = ref([])
const task: Ref<string> = ref('')

/***********
 * functions
 */
const addTask = (): void => {
  tasks.value.push({ id, task: task.value, completed: false })
  task.value = ''
  id++
}

const deleteTask = (id: number) => {
  const index = tasks.value.findIndex((t) => t.id === id)
  tasks.value.splice(index, 1)
}
</script>

<template>
  <h1>Tasks by Superbase</h1>
  <ul>
    <li v-for="t in tasks" :key="t.id" :style="t.completed ? 'text-decoration:line-through' : ''">
      <span><input type="checkbox" v-model="t.completed" /></span>
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
