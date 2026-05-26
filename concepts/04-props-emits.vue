<!--
  CONCEPT: Component communication (props down, events up)

  Peculiarities:
  - Props are read-only in the child — never mutate a prop directly.
  - defineProps / defineEmits are compile-time macros (no import in <script setup>).
  - Typed emits document the parent ↔ child contract.
  - v-model on a child = modelValue prop + update:modelValue emit.
  - v-model modifiers become props like modelModifiers (e.g. { trim: true }).
-->
<script setup>
import { ref, defineComponent, h } from 'vue'

// Child component defined in the same file (for demonstration)
const ScoreField = defineComponent({
  name: 'ScoreField',
  props: {
    modelValue: { type: Number, required: true },
    label: { type: String, default: 'Score' },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 10 },
  },
  emits: ['update:modelValue', 'changed'],
  setup(props, { emit }) {
    function onInput(event) {
      const value = Number(event.target.value)
      const clamped = Math.min(props.max, Math.max(props.min, value))
      emit('update:modelValue', clamped)
      emit('changed', clamped)
    }
    return () =>
      h('label', { class: 'field' }, [
        h('span', `${props.label} (${props.min}–${props.max})`),
        h('input', {
          type: 'range',
          min: props.min,
          max: props.max,
          value: props.modelValue,
          onInput,
        }),
        h('output', String(props.modelValue)),
      ])
  },
})

const TextField = defineComponent({
  name: 'TextField',
  props: {
    modelValue: { type: String, default: '' },
    modelModifiers: { type: Object, default: () => ({}) },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    function onInput(event) {
      let value = event.target.value
      if (props.modelModifiers.trim) value = value.trim()
      emit('update:modelValue', value)
    }
    return () =>
      h('input', {
        class: 'text-input',
        value: props.modelValue,
        placeholder: 'Student name',
        onInput,
      })
  },
})

const score = ref(7)
const name = ref('')
const history = ref([])

function recordChange(value) {
  history.value.unshift(`Score changed to ${value}`)
  if (history.value.length > 5) history.value.pop()
}
</script>

<template>
  <article class="demo">
    <h2>04 — Props and Emits</h2>

    <section>
      <TextField v-model.trim="name" />
      <p>Student: <strong>{{ name || '—' }}</strong></p>

      <ScoreField
        v-model="score"
        label="Exam score"
        :min="0"
        :max="10"
        @changed="recordChange"
      />
      <p>Passed: {{ score >= 6 ? 'Yes' : 'No' }}</p>
    </section>

    <section>
      <h3>Emit history</h3>
      <ul>
        <li v-for="(evt, i) in history" :key="i">{{ evt }}</li>
        <li v-if="!history.length" class="empty">Move the slider to emit events</li>
      </ul>
    </section>

    <p class="note">
      The child emits <code>update:modelValue</code>; the parent uses <code>v-model</code> as syntactic sugar.
    </p>
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
:deep(.field) {
  display: block;
  margin: 0.75rem 0;
}
:deep(.field input[type='range']) {
  width: 100%;
}
:deep(.text-input) {
  width: 100%;
  padding: 0.5rem;
}
.note {
  font-size: 0.85rem;
  color: #64748b;
}
.empty {
  color: #94a3b8;
}
</style>
