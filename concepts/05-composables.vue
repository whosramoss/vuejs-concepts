<!--
  CONCEPT: Composables (reusable logic with the Composition API)

  Peculiarities:
  - Composables are functions that use Vue's reactive APIs and can be shared across components.
  - Convention: name starts with "use" (useMouse, useFetch, useLocalStorage).
  - Each composable call creates independent state unless you explicitly export a singleton.
  - Composables can call other composables — chained composition.
  - Replaces mixins (name collisions, opaque origin) with explicit, tree-shakeable flow.
-->
<script setup>
import { ref, onMounted, onUnmounted, watch, readonly } from 'vue'

/** Composable: mouse position in the window */
function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.clientX
    y.value = event.clientY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}

/** Composable: mirrors a ref to localStorage */
function useLocalStorage(key, initialValue) {
  const stored = localStorage.getItem(key)
  const data = ref(stored !== null ? JSON.parse(stored) : initialValue)

  watch(
    data,
    (value) => {
      localStorage.setItem(key, JSON.stringify(value))
    },
    { deep: true }
  )

  // readonly prevents consumers from replacing the ref without going through setters
  return { data: readonly(data), setData: (v) => { data.value = v } }
}

/** Composable: counter with history */
function useCounter(initial = 0) {
  const value = ref(initial)
  const history = ref([])

  function record(action) {
    history.value.unshift(`${action}: ${value.value}`)
    if (history.value.length > 6) history.value.pop()
  }

  return {
    value,
    history,
    increment: () => { value.value++; record('inc') },
    decrement: () => { value.value--; record('dec') },
    reset: () => { value.value = initial; record('reset') },
  }
}

const { x, y } = useMouse()
const { value, history, increment, decrement, reset } = useCounter(0)
const { data: preferences, setData } = useLocalStorage('vue-concepts-prefs', {
  theme: 'light',
  notifications: true,
})

function toggleTheme() {
  setData({
    ...preferences.value,
    theme: preferences.value.theme === 'light' ? 'dark' : 'light',
  })
}
</script>

<template>
  <article class="demo" :class="'theme--' + preferences.theme">
    <h2>05 — Composables</h2>

    <section>
      <h3>useMouse()</h3>
      <p>Coordinates: X={{ x }}, Y={{ y }}</p>
      <p class="note">Listeners registered in onMounted and removed in onUnmounted.</p>
    </section>

    <section>
      <h3>useCounter()</h3>
      <p>Value: <strong>{{ value }}</strong></p>
      <div class="actions">
        <button type="button" @click="decrement">−</button>
        <button type="button" @click="increment">+</button>
        <button type="button" @click="reset">Reset</button>
      </div>
      <ul class="hist">
        <li v-for="(line, i) in history" :key="i">{{ line }}</li>
      </ul>
    </section>

    <section>
      <h3>useLocalStorage()</h3>
      <p>Saved theme: {{ preferences.theme }}</p>
      <button type="button" @click="toggleTheme">Toggle theme (persists)</button>
    </section>
  </article>
</template>

<style scoped>
.demo {
  font-family: system-ui, sans-serif;
  max-width: 32rem;
  padding: 1rem;
  transition: background 0.2s, color 0.2s;
}
.theme--light {
  background: #fff;
  color: #1e293b;
}
.theme--dark {
  background: #1e293b;
  color: #f8fafc;
}
section {
  margin-block: 1rem;
  padding: 0.75rem;
  border: 1px solid currentColor;
  border-opacity: 0.2;
  border-radius: 8px;
}
.actions {
  display: flex;
  gap: 0.5rem;
}
.hist {
  font-size: 0.8rem;
  padding-left: 1.25rem;
}
.note {
  font-size: 0.85rem;
  opacity: 0.7;
}
</style>
