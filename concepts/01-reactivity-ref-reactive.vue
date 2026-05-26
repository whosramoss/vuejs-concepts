<!--
  CONCEPT: Vue 3 reactivity system (Proxy)

  Peculiarities:
  - ref() wraps primitives and objects; use .value in script, Vue auto-unwraps in template.
  - reactive() only accepts objects (incl. arrays); do not use with primitives — reactivity is lost.
  - Destructuring reactive() breaks the link; use toRefs() or toRef() to preserve reactivity.
  - shallowRef / shallowReactive only track the top layer (useful for external libs or huge lists).
-->
<script setup>
import { ref, reactive, computed, toRefs, isRef } from 'vue'

// ref: best for primitives and when you need to replace the entire reference
const counter = ref(0)
const user = ref({ name: 'Ana', age: 28 })

// reactive: best for forms or grouped state you mutate, not replace
const form = reactive({
  email: '',
  acceptsTerms: false,
})

// computed derives state — recalculates only when dependencies change (cached)
const doubledCounter = computed(() => counter.value * 2)

// COMMON MISTAKE: const { email } = form — email is no longer reactive
// FIX: destructure with toRefs
const { email } = toRefs(form)

function increment() {
  counter.value++
}

function updateName() {
  // With object refs, mutating properties stays reactive
  user.value.name = user.value.name === 'Ana' ? 'Bruno' : 'Ana'
}

function resetForm() {
  form.email = ''
  form.acceptsTerms = false
}
</script>

<template>
  <article class="demo">
    <h2>01 — Reactivity: ref vs reactive</h2>

    <section>
      <p>Counter (ref): <strong>{{ counter }}</strong> → doubled: {{ doubledCounter }}</p>
      <button type="button" @click="increment">+1</button>
      <p class="note">In the template, <code>counter</code> is auto-unwrapped — no <code>.value</code>.</p>
    </section>

    <section>
      <p>User (object ref): {{ user.name }}, {{ user.age }} years old</p>
      <button type="button" @click="updateName">Toggle name</button>
    </section>

    <section>
      <label>
        Email (reactive + toRefs):
        <input v-model="email" type="email" placeholder="you@example.com" />
      </label>
      <label class="checkbox">
        <input v-model="form.acceptsTerms" type="checkbox" />
        I accept the terms
      </label>
      <p>Reactive email value: {{ email || '—' }}</p>
      <p>isRef(counter): {{ isRef(counter) }}</p>
      <button type="button" @click="resetForm">Clear form</button>
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
.note {
  font-size: 0.85rem;
  color: #64748b;
}
.checkbox {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.5rem;
}
input[type='email'] {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
}
</style>
