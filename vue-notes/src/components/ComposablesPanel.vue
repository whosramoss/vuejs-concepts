<script setup>
import { useCounter } from '@/composables/useCounter'

const { value, history, increment, decrement, reset } = useCounter(0)
</script>

<template>
  <section class="composables panel fade-in" style="animation-delay: 0.1s">
    <h2>useCounter()</h2>
    <p>Value: <strong>{{ value }}</strong></p>
    <div class="actions">
      <button type="button" @click="decrement">−</button>
      <button type="button" @click="increment">+</button>
      <button type="button" class="secondary" @click="reset">Reset</button>
    </div>
    <ul class="hist">
      <li v-for="(line, i) in history" :key="i">{{ line }}</li>
    </ul>
  </section>
</template>

<style scoped>
h2 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.actions {
  display: flex;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}

.hist {
  font-size: 0.75rem;
  padding-left: 1.1rem;
  color: var(--vt-c-text-3);
}
</style>
