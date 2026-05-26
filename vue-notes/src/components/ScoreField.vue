<script setup>
const props = defineProps({
  modelValue: { type: Number, required: true },
  label: { type: String, default: 'Priority' },
  min: { type: Number, default: 1 },
  max: { type: Number, default: 10 },
})

const emit = defineEmits(['update:modelValue', 'changed'])

function onInput(event) {
  const value = Number(event.target.value)
  const clamped = Math.min(props.max, Math.max(props.min, value))
  emit('update:modelValue', clamped)
  emit('changed', clamped)
}
</script>

<template>
  <label class="score-field">
    <span>{{ label }} ({{ min }}–{{ max }}): <output>{{ modelValue }}</output></span>
    <input
      type="range"
      :min="min"
      :max="max"
      :value="modelValue"
      @input="onInput"
    />
  </label>
</template>

<style scoped>
.score-field {
  display: block;
}

.score-field span {
  display: block;
  font-size: 0.85rem;
  color: var(--vt-c-text-2);
  margin-bottom: 0.35rem;
}

.score-field input[type='range'] {
  width: 100%;
  accent-color: var(--vt-c-brand);
}
</style>
