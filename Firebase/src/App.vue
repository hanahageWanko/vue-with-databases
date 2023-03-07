<script setup lang="ts">
/***********
 * imports
 */
import { ref, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { db } from '../lib/firebase'
import { collection, onSnapshot, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore'

/***********
 * types
 */
type iTasks = {
  id: string
  task?: string
  completed?: boolean
}

/***********
 * variablesonSnapshot
 */
const tasks: Ref<(iTasks | null)[]> = ref([])
const task: Ref<string> = ref('')

/***********
 * functions
 */

const getTasks = async () => {
  // リアルタイム連携がしたいため、onSnapshotを使用
  // リアルタイムでなくてもよい場合は、getDocs
  const unsubscribe = onSnapshot(collection(db, 'tasks'), (querySnapshot) => {
    tasks.value = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }))
  })
}

const addTask = async () => {
  await addDoc(collection(db, 'tasks'), {
    task: task.value,
    completed: false
  })
  task.value = ''
}

const deleteTask = async (id: string) => {
  await deleteDoc(doc(db, 'tasks', id))
}

const updateTask = async (task: iTasks) => {
  await setDoc(doc(db, 'tasks', task.id), {
    task: task.task,
    completed: task.completed
  })
}

/***********
 * Calls
 */
getTasks()

/***********
 * LifeCycles
 */
onUnmounted(() => {
  getTasks()
})
</script>

<template>
  <h1>Tasks</h1>
  <ul>
    <li v-for="t in tasks" :key="t!.id" :style="t!.completed ? 'text-decoration:line-through' : ''">
      <span><input type="checkbox" v-model="t!.completed" @change="updateTask(t!)" /></span>
      <span>{{ t!.task }}</span>
      <button @click="deleteTask(t!.id)">削除</button>
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
