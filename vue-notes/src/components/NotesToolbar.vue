<script setup>
import { storeToRefs } from 'pinia'
import { useNotesStore } from '@/stores/notes'

const store = useNotesStore()
const { search, viewMode, status, activeCount, doneCount, averagePriority, activityLog } =
  storeToRefs(store)
</script>

<template>
  <section
    class="toolbar panel"
    :class="['toolbar--' + viewMode]"
    :aria-label="`View mode: ${viewMode}`"
  >
    <div class="toolbar__modes">
      <button
        type="button"
        :class="{ active: viewMode === 'list' }"
        @click="viewMode = 'list'"
      >
        List
      </button>
      <button
        type="button"
        :class="{ active: viewMode === 'grid' }"
        @click="viewMode = 'grid'"
      >
        Grid
      </button>
    </div>

    <form class="toolbar__search" @submit.prevent>
      <input
        v-model.trim="search"
        type="search"
        placeholder="Search notes (v-model.trim)..."
      />
    </form>

    <div class="toolbar__filters">
      <button
        type="button"
        class="secondary"
        :class="{ active: status === 'all' }"
        @click="status = 'all'"
      >
        All
      </button>
      <button
        type="button"
        class="secondary"
        :class="{ active: status === 'active' }"
        @click="status = 'active'"
      >
        Active ({{ activeCount }})
      </button>
      <button
        type="button"
        class="secondary"
        :class="{ active: status === 'done' }"
        @click="status = 'done'"
      >
        Done ({{ doneCount }})
      </button>
    </div>

    <p class="toolbar__stats">
      <span class="badge">Pinia computed</span>
      Avg priority: {{ averagePriority }}
    </p>

    <ul v-if="activityLog.length" class="activity-log">
      <li v-for="(line, i) in activityLog" :key="i">{{ line }}</li>
    </ul>

    <p v-once class="toolbar__once">
      v-once: stats refresh via Pinia — this line is rendered once.
    </p>
  </section>
</template>

<style scoped>
.toolbar__modes,
.toolbar__filters {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.toolbar__modes button.active,
.toolbar__filters button.active {
  background: var(--vt-c-brand);
  color: #fff;
  border-color: var(--vt-c-brand);
}

.toolbar__search {
  margin-bottom: 0.75rem;
}

.toolbar__stats {
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.activity-log {
  margin-top: 0.75rem;
  padding-left: 1.25rem;
  font-size: 0.75rem;
  color: var(--vt-c-text-3);
}

.toolbar__once {
  margin-top: 0.75rem;
  font-size: 0.78rem;
  color: var(--vt-c-text-3);
  font-style: italic;
}
</style>
