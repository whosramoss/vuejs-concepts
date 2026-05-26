<script setup>
import { ref, reactive, computed, toRefs, isRef } from 'vue'

const counter = ref(0)
const author = ref({ name: 'Ana', age: 28 })

const meta = reactive({
  email: '',
  acceptsTerms: false,
})

const doubled = computed(() => counter.value * 2)
const { email } = toRefs(meta)

function increment() {
  counter.value++
}

function toggleName() {
  author.value.name = author.value.name === 'Ana' ? 'Bruno' : 'Ana'
}
</script>

<template>
  <section class="reactivity panel fade-in">
    <h2>Reactivity snapshot</h2>
    <p>Counter: <strong>{{ counter }}</strong> · doubled: {{ doubled }}</p>
    <button type="button" @click="increment">+1 ref</button>
    <p>Author: {{ author.name }}, {{ author.age }}y</p>
    <button type="button" class="secondary" @click="toggleName">Toggle name</button>
    <label>
      Email (reactive + toRefs)
      <input v-model="email" type="email" placeholder="you@example.com" />
    </label>
    <p class="meta">isRef(counter): {{ isRef(counter) }}</p>
  </section>
</template>

<style scoped>
h2 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

p,
label {
  margin-bottom: 0.5rem;
  display: block;
}

button {
  margin-bottom: 0.5rem;
  margin-right: 0.35rem;
}

.meta {
  font-size: 0.8rem;
  color: var(--vt-c-text-3);
}
</style>
