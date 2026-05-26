<script setup>
import NoteForm from '@/components/NoteForm.vue'
import NotesToolbar from '@/components/NotesToolbar.vue'
import NoteList from '@/components/NoteList.vue'
import ReactivityPanel from '@/components/ReactivityPanel.vue'
import ComposablesPanel from '@/components/ComposablesPanel.vue'
</script>

<template>
  <main class="page notes-view">
    <header class="notes-view__hero fade-in">
      <h1>Notes</h1>
      <p>
        Vue 3 + Vite + Pinia · concepts
        <span class="badge">01–07</span>
        integrated here
      </p>
    </header>

    <div class="notes-view__grid">
      <div class="notes-view__main">
        <NoteForm />
        <NotesToolbar />
        <NoteList />
      </div>
      <aside class="notes-view__aside">
        <ReactivityPanel />
        <ComposablesPanel />
      </aside>
    </div>
  </main>
</template>

<style scoped>
.notes-view__hero h1 {
  font-size: 1.75rem;
  color: var(--vt-c-text-1);
  margin-bottom: 0.25rem;
}

.notes-view__hero p {
  color: var(--vt-c-text-2);
  margin-bottom: 1.5rem;
}

.notes-view__grid {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 800px) {
  .notes-view__grid {
    grid-template-columns: 1fr 16rem;
  }
}

.notes-view__main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notes-view__aside {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
