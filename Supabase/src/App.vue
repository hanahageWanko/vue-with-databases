<script setup lang="ts">
/*************
 * imports
 */
import { ref } from 'vue'
import type { Ref } from 'vue'
import { supabase } from '../lib/supabase'

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
const tasks: Ref<{ [x: string]: any }[] | null> = ref([])
const task: Ref<string> = ref('')

/***********
 * functions
 */

const getTasks = async (): Promise<void> => {
  let { data, error, status } = await supabase.from('tasks').select('*')
  tasks.value = data
}

const addTask = async (): Promise<void> => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ task: task.value }])
    .select('*')
  if (tasks.value && data) {
    tasks.value.push(data[0])
    task.value = ''
  }
}

const deleteTask = async (id) => {
  const { data, error } = await supabase.from('tasks').delete().eq('id', id).select('id')
  if (tasks.value && data) {
    const index = tasks.value.findIndex((task) => task.id === data[0].id)
    tasks.value.splice(index, 1)
  }
}

const updateTask = async (task) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ completed: task.completed })
    .eq('id', task.id)
    .select('*')
  if (tasks.value && data) {
    const currentTask = tasks.value.find((task) => task.id === data[0].id)
    currentTask!.completed = data[0].completed
  }
}

/***********
 * calls
 */
getTasks()
</script>

<template>
  <h1>Tasks by Superbase</h1>
  <ul>
    <li v-for="t in tasks" :key="t.id" :style="t.completed ? 'text-decoration:line-through' : ''">
      <span><input type="checkbox" v-model="t.completed" @change="updateTask(t)" /></span>
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
