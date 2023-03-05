<script setup lang="ts">
/***********
 * imports
 */
import { ref } from 'vue'
import type { Ref } from 'vue'
import { db } from '../lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

/***********
 * types
 */
type iTasks = {
  id: string
  task?: string
  completed?: boolean
}

/***********
 * variables
 */
const tasks: Ref<(iTasks | null)[]> = ref([])
const task: Ref<string> = ref('')

/***********
 * functions
 */
const getTasks = async () => {
  const querySnapshot = await getDocs(collection(db, 'tasks'))
  if (tasks.value) {
    tasks.value = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }))
  }
}

const addTask = () => {
  tasks.value.push({ id: '', task: task.value, completed: false })
  task.value = ''
  id++
}

const deleteTask = (id) => {
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
