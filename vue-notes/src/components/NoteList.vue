<script setup>
import { inject } from 'vue'
import { storeToRefs } from 'pinia'

import { useNotesStore } from '@/stores/notes'
import { THEME_KEY } from '@/keys/injection'
import NoteCardLayout from '@/components/NoteCardLayout.vue'
import ScoreField from '@/components/ScoreField.vue'

const store = useNotesStore()
const { filteredNotes, viewMode } = storeToRefs(store)
const { primaryColor } = inject(THEME_KEY)
</script>

<template>
  <p v-if="!store.notes.length" class="empty">No notes yet. Add one above.</p>
  <p
    v-show="store.notes.length && !filteredNotes.length"
    class="empty"
  >
    No results for "{{ store.search }}".
  </p>

  <ul v-if="viewMode === 'list' && filteredNotes.length" class="note-list">
    <li
      v-for="note in filteredNotes"
      :key="note.id"
      class="fade-in"
    >
      <NoteCardLayout>
        <template #header>
          <span :class="{ done: note.done }">{{ note.text }}</span>
        </template>

        <div class="row">
          <label class="check">
            <input
              type="checkbox"
              :checked="note.done"
              @change="store.toggleNote(note.id)"
            />
            {{ note.done ? 'Done' : 'Active' }}
          </label>
          <ScoreField
            :model-value="note.priority"
            label="Priority"
            :min="1"
            :max="10"
            @update:model-value="store.setPriority(note.id, $event)"
          />
        </div>

        <template #footer>
          <button
            type="button"
            class="secondary"
            @click="store.removeNote(note.id)"
          >
            Remove
          </button>
        </template>
      </NoteCardLayout>
    </li>
  </ul>

  <div v-else-if="viewMode === 'grid' && filteredNotes.length" class="note-grid">
    <NoteCardLayout
      v-for="(note, index) in filteredNotes"
      :key="note.id"
      :title="note.text"
      class="fade-in"
      :style="{ animationDelay: `${index * 0.05}s` }"
    >
      <p :class="{ done: note.done }">{{ note.text }}</p>
      <span class="badge">P{{ note.priority }}</span>
      <template #footer>
        <button type="button" class="secondary" @click="store.toggleNote(note.id)">
          Toggle
        </button>
        <button
          type="button"
          class="danger"
          :style="{ borderColor: primaryColor }"
          @click="store.removeNote(note.id)"
        >
          Delete
        </button>
      </template>
    </NoteCardLayout>
  </div>
</template>

<style scoped>
.note-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.note-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 0.75rem;
}

.row {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.done {
  text-decoration: line-through;
  opacity: 0.65;
}

.empty {
  color: var(--vt-c-text-2);
  text-align: center;
  padding: 1.5rem;
}

.note-grid .badge {
  margin-top: 0.5rem;
}

.note-grid footer {
  display: flex;
  gap: 0.35rem;
}

.note-grid footer button {
  flex: 1;
  font-size: 0.78rem;
  padding: 0.35rem;
}
</style>
