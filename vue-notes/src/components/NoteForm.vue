<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useNotesStore } from '@/stores/notes'
import TextField from '@/components/TextField.vue'
import ScoreField from '@/components/ScoreField.vue'

const store = useNotesStore()
const { search } = storeToRefs(store)

const draft = ref('')
const priority = ref(5)
const emitHistory = ref([])

function onSubmit() {
  const text = draft.value.trim() || search.value.trim()
  if (!text) return
  store.addNote(text, priority.value)
  emitHistory.value.unshift(`Added "${text}" (P${priority.value})`)
  if (emitHistory.value.length > 4) emitHistory.value.pop()
  draft.value = ''
  search.value = ''
}

function onPriorityChange(value) {
  emitHistory.value.unshift(`Priority set to ${value}`)
  if (emitHistory.value.length > 4) emitHistory.value.pop()
}
</script>

<template>
  <form class="note-form panel" @submit.prevent="onSubmit">
    <h2 class="note-form__title">New note</h2>

    <label>
      Title (TextField + v-model.trim)
      <TextField v-model.trim="draft" placeholder="What do you need to remember?" />
    </label>

    <ScoreField
      v-model="priority"
      label="Priority"
      :min="1"
      :max="10"
      @changed="onPriorityChange"
    />

    <div class="note-form__actions">
      <button type="submit">Add note</button>
      <button
        v-if="store.doneCount"
        type="button"
        class="secondary"
        @click="store.clearDone()"
      >
        Clear done ({{ store.doneCount }})
      </button>
    </div>

    <ul v-if="emitHistory.length" class="emit-log">
      <li v-for="(line, i) in emitHistory" :key="i">{{ line }}</li>
    </ul>
  </form>
</template>

<style scoped>
.note-form__title {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--vt-c-text-1);
}

.note-form label {
  display: block;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: var(--vt-c-text-2);
}

.note-form__actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.emit-log {
  margin-top: 1rem;
  padding-left: 1.25rem;
  font-size: 0.78rem;
  color: var(--vt-c-text-3);
}
</style>
