<!--
  CONCEPT: Template directives and declarative syntax

  Peculiarities:
  - v-if removes the node from the DOM; v-show only toggles display (better for frequent toggles).
  - v-for requires a stable :key — never use index if the list is reorderable/filterable.
  - v-model in Vue 3 is shorthand for :modelValue + @update:modelValue (custom components).
  - Modifiers: .number, .trim, .lazy (blur), .prevent, .stop, etc.
  - v-once renders once and ignores updates (point-in-time micro-optimization).
-->
<script setup>
import { ref } from 'vue'

const mode = ref('list') // 'list' | 'grid'
const search = ref('')
const tasks = ref([
  { id: 1, text: 'Study Composition API', done: true },
  { id: 2, text: 'Practice directives', done: false },
  { id: 3, text: 'Review :key in v-for', done: false },
])

const filteredTasks = () =>
  tasks.value.filter((t) =>
    t.text.toLowerCase().includes(search.value.trim().toLowerCase())
  )

function toggleDone(id) {
  const task = tasks.value.find((t) => t.id === id)
  if (task) task.done = !task.done
}

function addTask() {
  const text = search.value.trim()
  if (!text) return
  tasks.value.push({ id: Date.now(), text, done: false })
  search.value = ''
}
</script>

<template>
  <article class="demo">
    <h2>03 — Template directives</h2>

    <!-- dynamic v-bind + v-on with modifier -->
    <section
      :class="['panel', mode === 'grid' ? 'panel--grid' : 'panel--list']"
      :aria-label="`View mode: ${mode}`"
    >
      <div class="toolbar">
        <button
          type="button"
          :class="{ active: mode === 'list' }"
          @click="mode = 'list'"
        >
          List
        </button>
        <button
          type="button"
          :class="{ active: mode === 'grid' }"
          @click="mode = 'grid'"
        >
          Grid
        </button>
      </div>

      <!-- v-model with modifiers -->
      <form @submit.prevent="addTask">
        <input
          v-model.trim="search"
          type="search"
          placeholder="Search or add a task..."
        />
        <button type="submit">Add</button>
      </form>

      <!-- v-if vs v-show -->
      <p v-if="!tasks.length" class="warning">No tasks yet.</p>
      <p v-show="tasks.length && !filteredTasks().length" class="warning">
        No results for "{{ search }}".
      </p>

      <!-- v-for + :key required for efficient reconciliation -->
      <ul v-if="mode === 'list'" class="list">
        <li
          v-for="task in filteredTasks()"
          :key="task.id"
          :class="{ done: task.done }"
        >
          <input
            :id="'t-' + task.id"
            type="checkbox"
            :checked="task.done"
            @change="toggleDone(task.id)"
          />
          <label :for="'t-' + task.id">{{ task.text }}</label>
        </li>
      </ul>

      <div v-else class="grid">
        <article
          v-for="task in filteredTasks()"
          :key="task.id"
          class="card"
        >
          <span v-text="task.text" />
          <span v-if="task.done" class="badge">✓</span>
        </article>
      </div>
    </section>

    <p v-once class="note">
      This paragraph uses v-once: rendered once, it does not update with the rest.
    </p>
  </article>
</template>

<style scoped>
.demo {
  font-family: system-ui, sans-serif;
  max-width: 32rem;
  padding: 1rem;
}
.panel {
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.toolbar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
.toolbar button.active {
  background: #42b883;
  color: #fff;
}
form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
form input {
  flex: 1;
}
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.list li.done label {
  text-decoration: line-through;
  opacity: 0.6;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  gap: 0.5rem;
}
.card {
  padding: 0.5rem;
  background: #f1f5f9;
  border-radius: 6px;
  font-size: 0.9rem;
}
.badge {
  margin-left: 0.25rem;
  color: #42b883;
}
.warning {
  color: #b45309;
}
.note {
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 1rem;
}
</style>
