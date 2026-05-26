<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  modelModifiers: { type: Object, default: () => ({}) },
  placeholder: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

function onInput(event) {
  let value = event.target.value
  if (props.modelModifiers.trim) value = value.trim()
  emit('update:modelValue', value)
}
</script>

<template>
  <input
    class="text-field"
    type="text"
    :value="modelValue"
    :placeholder="placeholder"
    @input="onInput"
  />
</template>

<style scoped>
.text-field {
  display: block;
}
</style>
