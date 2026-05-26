<script setup>
import Concept01 from '@concepts/01-reactivity-ref-reactive.vue'
import Concept02 from '@concepts/02-computed-watchers.vue'
import Concept03 from '@concepts/03-template-directives.vue'
import Concept04 from '@concepts/04-props-emits.vue'
import Concept05 from '@concepts/05-composables.vue'
import Concept06 from '@concepts/06-provide-inject.vue'
import Concept07 from '@concepts/07-slots.vue'

const sections = [
  { id: '01', component: Concept01, delay: '0.05s' },
  { id: '02', component: Concept02, delay: '0.1s' },
  { id: '03', component: Concept03, delay: '0.15s' },
  { id: '04', component: Concept04, delay: '0.2s' },
  { id: '05', component: Concept05, delay: '0.25s' },
  { id: '06', component: Concept06, delay: '0.3s' },
  { id: '07', component: Concept07, delay: '0.35s' },
]
</script>

<template>
  <main class="page concepts-view">
    <header class="concepts-view__hero fade-in">
      <h1>Vue Concepts</h1>
      <p>
        Interactive demos from
        <code>concepts/</code>
        (01–07). Styled with
        <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a>
        colors.
      </p>
    </header>

    <section
      v-for="block in sections"
      :key="block.id"
      class="concept-block panel fade-in"
      :style="{ animationDelay: block.delay }"
    >
      <component :is="block.component" />
    </section>
  </main>
</template>

<style scoped>
.concepts-view__hero {
  margin-bottom: 1.5rem;
}

.concepts-view__hero h1 {
  font-size: 1.75rem;
  margin-bottom: 0.25rem;
}

.concepts-view__hero p {
  color: var(--vt-c-text-2);
}

.concept-block {
  margin-bottom: 1.25rem;
  padding: 0;
  overflow: hidden;
}

.concept-block :deep(.demo) {
  max-width: none;
  padding: 1.25rem;
}

.concept-block :deep(section) {
  border-color: var(--vt-c-border);
}

.concept-block :deep(.toolbar button.active),
.concept-block :deep(.card-layout__head) {
  background: var(--vt-c-brand);
}
</style>
