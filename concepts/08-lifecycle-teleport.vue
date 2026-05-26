<!--
  CONCEPT: Lifecycle, Teleport, and async components

  Peculiarities:
  - Composition API lifecycle hooks: onMounted, onUpdated, onUnmounted, etc.
  - onMounted does NOT guarantee children are mounted — use onMounted in the child or nextTick.
  - Teleport renders children in another DOM node (modals, toasts) while keeping Vue logic in the tree.
  - defineAsyncComponent + Suspense for code-splitting and loading states.
  - onUnmounted is the right place to clear timers, listeners, and abort fetch.
-->
<script setup>
import {
  ref,
  onMounted,
  onUpdated,
  onUnmounted,
  nextTick,
  defineAsyncComponent,
  defineComponent,
  h,
} from 'vue'

const logs = ref([])
const modalOpen = ref(false)
const renderCount = ref(0)

function log(msg) {
  logs.value.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`)
  if (logs.value.length > 8) logs.value.pop()
}

onMounted(async () => {
  log('onMounted: component DOM is available')
  await nextTick()
  log('nextTick: DOM updated after initial reactive change')
})

onUpdated(() => {
  renderCount.value++
})

let intervalId = null
onMounted(() => {
  intervalId = setInterval(() => {
    // demo only — cleared in onUnmounted
  }, 60_000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
  log("onUnmounted: cleanup ran (this log won't show unless you unmount)")
})

// Lazy-loaded component (simulates network delay)
const HeavyWidget = defineAsyncComponent({
  loader: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          defineComponent({
            name: 'HeavyWidget',
            setup() {
              onMounted(() => log('Async widget mounted'))
              return () => h('p', { class: 'widget' }, 'Module loaded successfully!')
            },
          })
        )
      }, 800)
    }),
  loadingComponent: defineComponent({
    setup: () => () => h('p', { class: 'loading' }, 'Loading module...'),
  }),
  delay: 200,
})

const showWidget = ref(false)
</script>

<template>
  <article class="demo">
    <h2>08 — Lifecycle, Teleport, and Async</h2>

    <section>
      <p>Updates detected (onUpdated): {{ renderCount }}</p>
      <button type="button" @click="modalOpen = !modalOpen">
        {{ modalOpen ? 'Close' : 'Open' }} modal (Teleport)
      </button>
      <button type="button" @click="showWidget = !showWidget">
        {{ showWidget ? 'Hide' : 'Load' }} async widget
      </button>
    </section>

    <!-- Teleport: markup goes to body, reactivity stays here -->
    <Teleport to="body">
      <div v-if="modalOpen" class="modal-overlay" @click.self="modalOpen = false">
        <div class="modal" role="dialog" aria-modal="true">
          <h3>Modal via Teleport</h3>
          <p>Rendered in <code>document.body</code>, outside this &lt;article&gt;.</p>
          <button type="button" @click="modalOpen = false">Close</button>
        </div>
      </div>
    </Teleport>

    <section v-if="showWidget">
      <Suspense>
        <HeavyWidget />
        <template #fallback>
          <p class="loading">Suspense fallback...</p>
        </template>
      </Suspense>
    </section>

    <section>
      <h3>Lifecycle log</h3>
      <ul>
        <li v-for="(line, i) in logs" :key="i">{{ line }}</li>
      </ul>
    </section>
  </article>
</template>

<style scoped>
.demo {
  font-family: system-ui, sans-serif;
  max-width: 32rem;
  padding: 1rem;
}
section {
  margin-block: 1rem;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
ul {
  font-size: 0.8rem;
  padding-left: 1.25rem;
  margin: 0;
}
:deep(.widget) {
  color: #42b883;
  font-weight: 600;
}
:deep(.loading) {
  color: #64748b;
}
</style>

<!-- Global modal styles (Teleport renders outside scoped) -->
<style>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 20rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
</style>
