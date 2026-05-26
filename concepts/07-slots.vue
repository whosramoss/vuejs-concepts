<!--
  CONCEPT: Slots (template content composition)

  Peculiarities:
  - Default slot: child content the parent injects into the component.
  - Named slot: multiple regions (header, footer, aside).
  - Scoped slot: child exposes data to the parent via slot props (v-slot="props").
  - Fallback: content inside <slot> in the child when the parent sends nothing.
  - Shorthand syntax: #header instead of v-slot:header.
-->
<script setup>
import { ref, defineComponent, h } from 'vue'

const items = ref([
  { id: 'a', title: 'Vue 3', tag: 'framework' },
  { id: 'b', title: 'Vite', tag: 'build' },
  { id: 'c', title: 'Pinia', tag: 'state' },
])

/** Card with default, named, and scoped slots */
const CardLayout = defineComponent({
  name: 'CardLayout',
  props: { title: String },
  setup(props, { slots }) {
    return () =>
      h('article', { class: 'card-layout' }, [
        slots.header
          ? h('header', { class: 'card-layout__head' }, slots.header())
          : h('header', { class: 'card-layout__head' }, props.title),
        h('div', { class: 'card-layout__body' }, slots.default?.() ?? [
          h('p', { class: 'fallback' }, 'Default slot content'),
        ]),
        slots.footer?.() && h('footer', { class: 'card-layout__foot' }, slots.footer()),
      ])
  },
})

/** List that delegates each item's rendering to the parent (scoped slot) */
const CustomList = defineComponent({
  name: 'CustomList',
  props: { items: { type: Array, required: true } },
  setup(props, { slots }) {
    return () =>
      h(
        'ul',
        { class: 'slot-list' },
        props.items.map((item, index) =>
          h(
            'li',
            { key: item.id },
            // Scoped slot: passes item and index so the parent controls markup
            slots.item
              ? slots.item({ item, index, even: index % 2 === 0 })
              : h('span', item.title)
          )
        )
      )
  },
})
</script>

<template>
  <article class="demo">
    <h2>07 — Slots</h2>

    <CardLayout title="Title fallback">
      <template #header>
        <h3>Named slot: header</h3>
      </template>

      <p>Default slot: this paragraph replaces the child's fallback.</p>

      <template #footer>
        <small>Footer via <code>#footer</code></small>
      </template>
    </CardLayout>

    <CardLayout title="Prop only (body fallback)" />

    <h3>Scoped slot</h3>
    <CustomList :items="items">
      <template #item="{ item, index, even }">
        <span :class="{ even, odd: !even }">{{ index + 1 }}. {{ item.title }}</span>
        <span class="tag">{{ item.tag }}</span>
      </template>
    </CustomList>
  </article>
</template>

<style scoped>
.demo {
  font-family: system-ui, sans-serif;
  max-width: 32rem;
  padding: 1rem;
}
:deep(.card-layout) {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
}
:deep(.card-layout__head) {
  padding: 0.5rem 0.75rem;
  background: #42b883;
  color: #fff;
  margin: 0;
  font-size: 1rem;
}
:deep(.card-layout__body) {
  padding: 0.75rem;
}
:deep(.card-layout__foot) {
  padding: 0.5rem 0.75rem;
  background: #f1f5f9;
  border-top: 1px solid #e2e8f0;
}
:deep(.fallback) {
  color: #94a3b8;
  font-style: italic;
}
:deep(.slot-list) {
  list-style: none;
  padding: 0;
  margin: 0;
}
:deep(.slot-list li) {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}
:deep(.even) {
  background: #f0fdf4;
}
:deep(.odd) {
  background: #faf5ff;
}
:deep(.tag) {
  font-size: 0.75rem;
  color: #64748b;
}
</style>
